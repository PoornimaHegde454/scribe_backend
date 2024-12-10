import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import nltk
import pickle
from textblob import TextBlob
# Load the saved model and vectorizer
def load_model(model_path='naive_bayes_model.pkl', vectorizer_path='vectorizer.pkl'):
    with open(model_path, 'rb') as model_file:
        loaded_model = pickle.load(model_file)
    with open(vectorizer_path, 'rb') as vectorizer_file:
        loaded_vectorizer = pickle.load(vectorizer_file)
    return loaded_model, loaded_vectorizer

# Function to classify a new sentence using the loaded model
def classify_with_bayes_model(sentence, model_path='naive_bayes_model.pkl', vectorizer_path='vectorizer.pkl'):
    # Load the model and vectorizer
    loaded_model, loaded_vectorizer = load_model(model_path, vectorizer_path)
    
    # Preprocess the sentence
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()
    tokens = word_tokenize(sentence.lower())
    filtered_tokens = [stemmer.stem(word) for word in tokens if word.isalpha() and word not in stop_words]
    preprocessed = ' '.join(filtered_tokens)
    
    # Vectorize and predict
    vectorized = loaded_vectorizer.transform([preprocessed])
    prediction = loaded_model.predict(vectorized)
    return True if prediction[0] == 0 else False


def analyze_sentiment(text):
    analysis = TextBlob(text)
    return analysis.sentiment.polarity

# Example usage
example_sentence = "Just watched Amaran, and I'm still reeling from the emotions it stirred. This isn't just a movie—it’s a profound experience that left the entire theater in tears, including those who tried to hide it. I couldn’t keep this to myself; I had to share how deeply it moved me."

print(f"Sentiment:{classify_with_bayes_model(example_sentence)},Sentimental Value: {analyze_sentiment(example_sentence)}")





