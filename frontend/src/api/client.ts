import axios from 'axios'
import {
  heroMovie,
  placeholderRecommendations,
  placeholderReviews,
  placeholderRows,
  placeholderSentiment,
} from '../mocks/placeholder'
import type {
  Movie,
  MovieRowPayload,
  Recommendation,
  Review,
  SentimentBreakdown,
} from '../types/movie'

const API_BASE =
  import.meta.env.VITE_PUBLIC_API_BASE ??
  import.meta.env.VITE_API_BASE ??
  'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15_000,
})

const withFallback = async <T>(
  handler: () => Promise<T>,
  fallback: T,
): Promise<T> => {
  try {
    const data = await handler()
    return data
  } catch (error) {
    console.warn('Falling back to placeholder data', error)
    return fallback
  }
}

export const getTrendingMovies = async (): Promise<MovieRowPayload> =>
  withFallback(
      async () => {
        const { data } = await api.get<MovieRowPayload>('/movies/trending')
        return data
      },
      placeholderRows[0],
  )

export const getTopRatedMovies = async (): Promise<MovieRowPayload> =>
  withFallback(
      async () => {
        const { data } = await api.get<MovieRowPayload>('/movies/top-rated')
        return data
      },
      placeholderRows[1],
  )

export const getMostReviewedMovies = async (): Promise<MovieRowPayload> =>
  withFallback(
      async () => {
        const { data } = await api.get<MovieRowPayload>('/movies/most-reviewed')
        return data
      },
      placeholderRows[2],
  )

export const getSentimentMovies = async (): Promise<MovieRowPayload> =>
  withFallback(
      async () => {
        const { data } = await api.get<MovieRowPayload>('/movies/sentiment')
        return data
      },
      placeholderRows[3],
  )

export const getHeroMovie = async (): Promise<Movie> =>
  withFallback(
      async () => {
        const { data } = await api.get<Movie>('/movies/trending/hero')
        return data
      },
      heroMovie,
  )

export const getMovieById = async (id: string): Promise<Movie> =>
  withFallback(
      async () => {
        const { data } = await api.get<Movie>(`/movies/${id}`)
        return data
      },
      { ...heroMovie, id },
  )

export const getMovieReviews = async (id: string): Promise<Review[]> =>
  withFallback(
      async () => {
        const { data } = await api.get<Review[]>(`/movies/${id}/reviews`)
        return data
      },
      placeholderReviews,
  )

export const getMovieSentiment = async (
  id: string,
): Promise<SentimentBreakdown> =>
  withFallback(
      async () => {
        const { data } = await api.get<SentimentBreakdown>(
            `/movies/${id}/sentiment`,
        )
        return data
      },
      placeholderSentiment,
  )

export const getMovieRecommendations = async (
  id: string,
): Promise<Recommendation[]> =>
  withFallback(
      async () => {
        const { data } = await api.get<Recommendation[]>(
            `/movies/${id}/recommendations`,
        )
        return data
      },
      placeholderRecommendations,
  )

export const searchMovies = async (query: string): Promise<Movie[]> =>
  withFallback(
      async () => {
        const { data } = await api.get<Movie[]>(`/movies/search`, {
          params: { query },
        })
        return data
      },
      placeholderRows.flatMap((row) => row.items),
  )

