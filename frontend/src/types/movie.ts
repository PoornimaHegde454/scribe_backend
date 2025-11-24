export type SentimentBreakdown = {
  positive: number
  neutral: number
  negative: number
  avgScore: number
  keywords: string[]
  wordCloudImage?: string
  ratingDistribution: Array<{ rating: number; count: number }>
}

export type Movie = {
  id: string
  title: string
  year: number
  genres: string[]
  duration: string
  synopsis: string
  poster: string
  backdrop: string
  imdbRating: number
  sentimentScore: number
  reviewCount: number
  releaseDate: string
  cast: Array<{ name: string; role: string; avatar?: string }>
  crew: Array<{ name: string; job: string }>
  trailerUrl?: string
}

export type Review = {
  id: string
  author: string
  source: string
  text: string
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  createdAt: string
}

export type Recommendation = {
  id: string
  title: string
  poster: string
  year: number
  imdbRating: number
  sentimentScore: number
}

export type MovieRowPayload = {
  title: string
  type:
    | 'trending'
    | 'top-rated'
    | 'most-reviewed'
    | 'sentiment'
    | 'genre'
  genre?: string
  items: Movie[]
}

export type SearchResult = {
  id: string
  title: string
  year: number
  poster: string
  sentimentScore: number
  imdbRating: number
}

