import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import nltk

# # Download NLTK resources
# nltk.download('punkt_tab')
# nltk.download('stopwords')

# Preprocess the text data
def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    stemmer = PorterStemmer()
    
    # Tokenization
    tokens = word_tokenize(text.lower())
    
    # Remove stopwords and apply stemming
    filtered_tokens = [stemmer.stem(word) for word in tokens if word.isalpha() and word not in stop_words]
    
    return ' '.join(filtered_tokens)

# Load the dataset
file_path = 'input\sentiment_tweets3.csv'
df = pd.read_csv(file_path)

# Apply preprocessing
df['cleaned_text'] = df['message to examine'].apply(preprocess_text)

# Split the dataset
X = df['cleaned_text']
y = df['label (depression result)']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert text data to numerical vectors using CountVectorizer
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Train a Naïve Bayes model
model = MultinomialNB()
model.fit(X_train_vectorized, y_train)

# # Evaluate the model
# y_pred = model.predict(X_test_vectorized)
# print(classification_report(y_test, y_pred, target_names=['Negative', 'Positive']))

# Function to classify a new sentence
def classify_sentence(sentence):
    preprocessed = preprocess_text(sentence)
    vectorized = vectorizer.transform([preprocessed])
    prediction = model.predict(vectorized)
    return 'Positive' if prediction[0] == 0 else 'Negative'

# Example usage
example_sentence = "I am feeling sad"
print("Example sentence sentiment:", classify_sentence(example_sentence))

import pickle

# Save the trained model and vectorizer to disk
def export_model(model, vectorizer, model_path='naive_bayes_model.pkl', vectorizer_path='vectorizer.pkl'):
    with open(model_path, 'wb') as model_file:
        pickle.dump(model, model_file)
    with open(vectorizer_path, 'wb') as vectorizer_file:
        pickle.dump(vectorizer, vectorizer_file)
    print(f"Model and vectorizer exported to {model_path} and {vectorizer_path}.")

# Call the function to export the model
export_model(model, vectorizer)
