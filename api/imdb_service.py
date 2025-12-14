from imdb import Cinemagoer
import random

ia = Cinemagoer()

def get_person_avatar(person):
    # Cinemagoer doesn't always give easy access to person images in the cast list without extra fetches.
    # We will return a placeholder or try to find one if available.
    return person.get('headshot') or "https://i.pravatar.cc/120?img=" + str(random.randint(1, 70))

def normalize_movie(movie_data, full_details=False):
    """
    Convert IMDbPY movie object to our frontend Movie interface.
    """
    # Basic fields
    movie_id = movie_data.movieID
    title = movie_data.get('title') or "Unknown Title"
    year = movie_data.get('year') or 2025
    
    # Poster
    # 'cover url' is usually a thumbnail, 'full-size cover url' is better.
    poster = movie_data.get('full-size cover url') or movie_data.get('cover url')
    if not poster:
        poster = "https://via.placeholder.com/500x750?text=No+Poster"
        
    # Backdrop (use poster or a random one if not available, IMDb doesn't give backdrops easily)
    backdrop = poster
    
    # Genres
    genres = movie_data.get('genres') or ['Drama']
    
    # Duration
    runtimes = movie_data.get('runtimes')
    duration = f"{runtimes[0]}m" if runtimes else "Unknown"
    
    # Synopsis
    plot = movie_data.get('plot')
    synopsis = plot[0] if plot else "No synopsis available."
    # Remove author signature if present "::..."
    synopsis = synopsis.split('::')[0]

    # Rating
    rating = movie_data.get('rating') or 0.0
    
    # Cast (Top 5)
    cast_list = []
    if full_details:
        raw_cast = movie_data.get('cast', [])[:6]
        for person in raw_cast:
            cast_list.append({
                "name": person['name'],
                "role": str(person.currentRole) if person.currentRole else "Actor",
                "avatar": get_person_avatar(person)
            })
            
    # Crew (Director)
    crew_list = []
    if full_details:
        directors = movie_data.get('director', [])[:3]
        for d in directors:
            crew_list.append({
                "name": d['name'],
                "job": "Director"
            })

    return {
        "id": str(movie_id),
        "title": title,
        "year": int(year),
        "genres": genres,
        "duration": duration,
        "synopsis": synopsis,
        "poster": poster,
        "backdrop": backdrop,
        "imdbRating": float(rating),
        "sentimentScore": int(rating * 10), # Approximation until we analyze reviews
        "reviewCount": movie_data.get('votes') or 0,
        "releaseDate": str(year), # IMDb doesn't always have full date in search
        "cast": cast_list,
        "crew": crew_list,
        "trailerUrl": "", # Hard to get without external API
    }

def search_movies(query):
    results = ia.search_movie(query)
    # We need to fetch at least some details to get the poster if it's not in the search result
    # search_movie usually returns minimal info.
    movies = []
    for m in results[:10]: # Limit to 10
        # For search results, we might not have all info, but let's try to use what we have
        # Often we need update to get covers if they aren't there.
        # But `search_movie` usually populates `cover url`.
        ia.update(m, info=['main']) # This slows it down but ensures we have data.
        if m.get('kind') not in ['movie', 'tv movie', 'tv series']:
             continue
        movies.append(normalize_movie(m, full_details=False))
    return movies

def get_movie_full_details(movie_id):
    movie = ia.get_movie(movie_id)
    ia.update(movie, info=['main', 'plot', 'vote details', 'reviews']) 
    
    data = normalize_movie(movie, full_details=True)
    
    # Process reviews for sentiment if available
    reviews_data = movie.get('reviews', [])
    # We will return the raw reviews text too so the backend can analyze them
    # But for now, let's just return the movie object.
    # The caller (server) can handle sentiment analysis if we return reviews.
    
    return data, reviews_data
