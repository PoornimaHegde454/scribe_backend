import twint

# Configure Twint
c = twint.Config()
c.Search = "Python"  # Search term
c.Limit = 100  # Number of tweets to scrape
c.Since = "2023-01-01"  # Start date
c.Until = "2023-12-31"  # End date
c.Store_csv = True  # Save data to a CSV file
c.Output = "tweets.csv"  # CSV file name

# Run the search
twint.run.Search(c)
