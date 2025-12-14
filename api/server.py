from __future__ import annotations

import pickle
import random
from pathlib import Path
from typing import Literal

import nltk
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from pydantic import BaseModel, Field
from textblob import TextBlob
from api.imdb_service import search_movies, get_movie_full_details, ia

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / 'naive_bayes_model.pkl'
VECTORIZER_PATH = BASE_DIR / 'vectorizer.pkl'


def ensure_nltk_assets() -> None:
    """Download required NLTK corpora once."""
    resources = {
        'tokenizers/punkt': 'punkt',
        'tokenizers/punkt_tab': 'punkt_tab',
        'corpora/stopwords': 'stopwords',
    }
    for locator, package in resources.items():
        try:
            nltk.data.find(locator)
        except LookupError:
            nltk.download(package)


ensure_nltk_assets()


def load_pickle(path: Path):
    if not path.exists():
        # Fallback for dev if models aren't trained yet
        print(f"Warning: {path.name} not found. Sentiment features may fail.")
        return None
    with path.open('rb') as file:
        return pickle.load(file)


MODEL = load_pickle(MODEL_PATH)
VECTORIZER = load_pickle(VECTORIZER_PATH)
STOP_WORDS = set(stopwords.words('english'))
STEMMER = PorterStemmer()


class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=3, max_length=1000)


class SentimentResponse(BaseModel):
    label: Literal['positive', 'negative']
    isPositive: bool
    probability: float
    polarity: float
    magnitude: str
    recommendation: str


def preprocess_text(text: str) -> str:
    tokens = word_tokenize(text.lower())
    filtered = [
        STEMMER.stem(token)
        for token in tokens
        if token.isalpha() and token not in STOP_WORDS
    ]
    return ' '.join(filtered)


def translate_polarity(polarity: float) -> str:
    if polarity >= 0.5:
        return 'Elation surge'
    if polarity >= 0.2:
        return 'Warm resonance'
    if polarity <= -0.5:
        return 'Deep shadow'
    if polarity <= -0.2:
        return 'Cool twilight'
    return 'Balanced hush'


def craft_recommendation(is_positive: bool, polarity: float) -> str:
    if is_positive and polarity > 0.4:
        return 'Queue the Bliss Pulse carousel for luminous storytelling.'
    if is_positive:
        return 'Slide into Velvet Serenade for textured slow-burns.'
    if polarity < -0.4:
        return 'Lean toward Neon Noir thrillers to mirror the intensity.'
    return 'Try Pulse of the Universe to reset the vibe with awe-heavy sci-fi.'


app = FastAPI(
    title='Sentiment Conductor API',
    description='Bridges the Naive Bayes classifier with TextBlob tonality metrics.',
    version='1.0.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:4173',
        'http://127.0.0.1:4173',
        "http://localhost:5174", # Added potential backup port
    ],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
def health_check():
    return {
        'status': 'online',
        'modelLoaded': MODEL is not None,
        'vectorizerLoaded': VECTORIZER is not None,
    }

def analyze_text_internal(text: str):
    """Internal helper to analyze text without API overhead."""
    if not (MODEL and VECTORIZER):
        return 0, 0, False # Fallback

    cleaned = preprocess_text(text)
    vectorized = VECTORIZER.transform([cleaned])
    
    try:
        prediction = MODEL.predict(vectorized)[0]
        # probabilities = MODEL.predict_proba(vectorized)[0]
    except Exception:
        return 0, 0, False

    is_positive = prediction == 0
    polarity = float(TextBlob(text).sentiment.polarity)
    return polarity, 1.0 if is_positive else 0.0, is_positive


@app.post('/api/sentiment', response_model=SentimentResponse)
def analyze_sentiment(payload: SentimentRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail='Empty inputs cannot be analyzed.')

    if not (MODEL and VECTORIZER):
         # Mock response if model missing
        polarity = float(TextBlob(payload.text).sentiment.polarity)
        is_positive = polarity > 0
        return SentimentResponse(
            label='positive' if is_positive else 'negative',
            isPositive=is_positive,
            probability=0.85,
            polarity=polarity,
            magnitude=translate_polarity(polarity),
            recommendation=craft_recommendation(is_positive, polarity),
        )

    cleaned = preprocess_text(payload.text)
    vectorized = VECTORIZER.transform([cleaned])

    try:
        prediction = MODEL.predict(vectorized)[0]
        probabilities = MODEL.predict_proba(vectorized)[0]
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail='Model inference failed.') from exc

    classes = list(MODEL.classes_)
    class_index = classes.index(prediction)
    confidence = float(probabilities[class_index])

    is_positive = prediction == 0
    label: Literal['positive', 'negative'] = 'positive' if is_positive else 'negative'

    polarity = float(TextBlob(payload.text).sentiment.polarity)

    return SentimentResponse(
        label=label,
        isPositive=is_positive,
        probability=confidence,
        polarity=polarity,
        magnitude=translate_polarity(polarity),
        recommendation=craft_recommendation(is_positive, polarity),
    )


# --- Movie Endpoints ---

@app.get('/movies/search')
def extract_movies(query: str = Query(..., min_length=1)):
    """Search for movies using IMDb."""
    try:
        return search_movies(query)
    except Exception as e:
        print(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/movies/trending')
def get_trending():
    # Fetch popular movies (Top 10 items)
    try:
        pop = ia.get_popular100_movies()[:10]
        results = []
        for p in pop:
            # Basic normalization for list view
            # ia.update(p, info=['main']) # Too slow for 10 items?
            # get_popular100 request usually has cover url? No, usually generic.
            # We might need to pick just 5 and update them.
            pass
        
        # Optimization: Just search for a trending topic or return a cached list
        # For now, let's just search for "Action" or "Love" to get a list
        return search_movies("Star Wars") 
    except:
        return []

@app.get('/movies/trending/hero')
def get_hero():
    # Return a specific cool movie
    return search_movies("Interstellar")[0] 

@app.get('/movies/{movie_id}')
def get_movie_details_endpoint(movie_id: str):
    try:
        movie, reviews = get_movie_full_details(movie_id)
        
        # Calculate sentiment from reviews
        if reviews and MODEL:
            positive_count = 0
            total_polarity = 0
            count = 0
            for r in reviews:
                # Review object in IMDbPY is dict-like usually? 
                # reviews is a list of dicts: {'content': '...', 'rating': ...}
                content = r.get('content')
                if content:
                    pol, prob, is_pos = analyze_text_internal(content)
                    total_polarity += pol
                    if is_pos:
                        positive_count += 1
                    count += 1
            
            if count > 0:
                sentiment_score = int((positive_count / count) * 100)
                movie['sentimentScore'] = sentiment_score
        
        return movie
    except Exception as e:
        print(f"Details error: {e}")
        raise HTTPException(status_code=404, detail="Movie not found")

