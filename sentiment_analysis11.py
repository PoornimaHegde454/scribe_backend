from textblob import TextBlob

def analyze_sentiment(text):
    analysis = TextBlob(text)
    return analysis.sentiment.polarity  # Returns a value between -1 and 1

print(analyze_sentiment("I watched pushpa 2 movie today and it was too good"))