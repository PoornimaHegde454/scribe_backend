from __future__ import annotations

import pickle
from pathlib import Path
from typing import Literal

import nltk
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from pydantic import BaseModel, Field
from textblob import TextBlob

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
        raise FileNotFoundError(f'Expected asset missing: {path.name}')
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
    ],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
def health_check():
    return {
        'status': 'online',
        'modelLoaded': MODEL_PATH.exists(),
        'vectorizerLoaded': VECTORIZER_PATH.exists(),
    }


@app.post('/api/sentiment', response_model=SentimentResponse)
def analyze_sentiment(payload: SentimentRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail='Empty inputs cannot be analyzed.')

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

