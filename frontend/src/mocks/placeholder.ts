import type {
  Movie,
  MovieRowPayload,
  Recommendation,
  Review,
  SentimentBreakdown,
} from '../types/movie'

const poster = (seed: string) =>
  `https://image.tmdb.org/t/p/w500/${seed}?${Math.floor(Math.random() * 1000)}`

export const heroMovie: Movie = {
  id: 'vortex-luminance',
  title: 'Vortex Luminance',
  year: 2025,
  genres: ['Sci-Fi', 'Drama'],
  duration: '2h 14m',
  synopsis:
    'Two quantum cartographers fall in love while stitching lost memories back into a collapsing multiverse.',
  poster: poster('vortex-luminance'),
  backdrop:
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
  imdbRating: 8.8,
  sentimentScore: 92,
  reviewCount: 1843,
  releaseDate: '2025-01-18',
  cast: [
    { name: 'Mira Solis', role: 'Kira', avatar: 'https://i.pravatar.cc/120?img=12' },
    { name: 'Eli Rowan', role: 'Atlas', avatar: 'https://i.pravatar.cc/120?img=31' },
    { name: 'Noelle Kade', role: 'Anima', avatar: 'https://i.pravatar.cc/120?img=44' },
  ],
  crew: [
    { name: 'Jai Nakamura', job: 'Director' },
    { name: 'Lena Voss', job: 'Writer' },
    { name: 'Harper Xeon', job: 'Cinematography' },
  ],
  trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
}

const buildMovie = (id: number, genre: string): Movie => ({
  id: `movie-${genre}-${id}`,
  title: `${genre} Pulse ${id}`,
  year: 2020 + ((id * 7) % 5),
  genres: [genre, 'Drama'],
  duration: '2h 02m',
  synopsis:
    'A luminous chronicle of rebellion, identity, and belonging set in a neon-drenched mega city.',
  poster: `https://images.unsplash.com/photo-150${id}734086-${id}bff?auto=format&fit=crop&w=500&q=80`,
  backdrop:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  imdbRating: 7.5 + (id % 3),
  sentimentScore: 70 + (id % 20),
  reviewCount: 800 + id * 13,
  releaseDate: `202${id % 4}-0${(id % 8) + 1}-15`,
  cast: heroMovie.cast,
  crew: heroMovie.crew,
  trailerUrl: heroMovie.trailerUrl,
})

export const placeholderRows: MovieRowPayload[] = [
  {
    title: 'Trending Now',
    type: 'trending',
    items: Array.from({ length: 10 }, (_, idx) => buildMovie(idx + 1, 'Action')),
  },
  {
    title: 'Top Rated',
    type: 'top-rated',
    items: Array.from({ length: 10 }, (_, idx) => buildMovie(idx + 11, 'Drama')),
  },
  {
    title: 'Most Reviewed',
    type: 'most-reviewed',
    items: Array.from({ length: 10 }, (_, idx) => buildMovie(idx + 21, 'Thriller')),
  },
  {
    title: 'Based on Sentiment Score',
    type: 'sentiment',
    items: Array.from({ length: 10 }, (_, idx) => buildMovie(idx + 31, 'Sci-Fi')),
  },
]

export const placeholderReviews: Review[] = Array.from({ length: 8 }, (_, idx) => ({
  id: `rev-${idx}`,
  author: ['Aria', 'Micah', 'Sloan', 'Kade'][idx % 4],
  source: ['Reddit', 'Twitter', 'Letterboxd', 'Prime Reviews'][idx % 4],
  text: 'A sublime kaleidoscope of color and emotion. The soundtrack alone could power a city.',
  sentiment: (['positive', 'neutral', 'negative'] as const)[idx % 3],
  confidence: 70 + (idx % 30),
  createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
}))

export const placeholderSentiment: SentimentBreakdown = {
  positive: 68,
  neutral: 22,
  negative: 10,
  avgScore: 8.7,
  keywords: ['kaleidoscope', 'magnetic', 'immersive', 'anthemic'],
  wordCloudImage:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  ratingDistribution: [
    { rating: 5, count: 128 },
    { rating: 4, count: 212 },
    { rating: 3, count: 86 },
    { rating: 2, count: 24 },
    { rating: 1, count: 8 },
  ],
}

export const placeholderRecommendations: Recommendation[] = Array.from(
  { length: 8 },
  (_, idx) => ({
    id: `rec-${idx}`,
    title: `Nebula Heart ${idx + 1}`,
    poster: `https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=500&q=80`,
    year: 2020 + idx,
    imdbRating: 7.4 + (idx % 2),
    sentimentScore: 80 - idx,
  }),
)

