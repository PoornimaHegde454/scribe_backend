import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import {
  getHeroMovie,
  getMostReviewedMovies,
  getMovieById,
  getMovieRecommendations,
  getMovieReviews,
  getMovieSentiment,
  getSentimentMovies,
  getTopRatedMovies,
  getTrendingMovies,
  searchMovies,
} from './client'
import type { MovieRowPayload, Review } from '../types/movie'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

export const useHeroMovie = () =>
  useQuery({
    queryKey: ['hero-movie'],
    queryFn: getHeroMovie,
  })

export const useMovieRows = () => {
  const trending = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  })

  const top = useQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: getTopRatedMovies,
  })

  const reviewed = useQuery({
    queryKey: ['movies', 'most-reviewed'],
    queryFn: getMostReviewedMovies,
  })

  const sentiment = useQuery({
    queryKey: ['movies', 'sentiment'],
    queryFn: getSentimentMovies,
  })

  return { trending, top, reviewed, sentiment }
}

export const useMovieDetails = (id: string) => {
  const client = useQueryClient()
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
    placeholderData: () => {
      const trending = client.getQueryData<MovieRowPayload>(['movies', 'trending'])
      return trending?.items.find((movie) => movie.id === id)
    },
  })
}

type ReviewsPage = {
  reviews: Review[]
  nextPage: number
  hasMore: boolean
}

export const useMovieReviews = (id: string) =>
  useInfiniteQuery<ReviewsPage>({
    queryKey: ['movie', id, 'reviews'],
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1
      const reviews = await getMovieReviews(id)
      return {
        reviews,
        nextPage: page + 1,
        hasMore: page < 3,
      }
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  })

export const useMovieSentiment = (id: string) =>
  useQuery({
    queryKey: ['movie', id, 'sentiment'],
    queryFn: () => getMovieSentiment(id),
  })

export const useMovieRecommendations = (id: string) =>
  useQuery({
    queryKey: ['movie', id, 'recommendations'],
    queryFn: () => getMovieRecommendations(id),
  })

export const useSearchResults = (query: string) =>
  useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 1,
  })

export const usePrefetchMovie = () => {
  const client = useQueryClient()
  return debounce((id: string) => {
    void client.prefetchQuery({
      queryKey: ['movie', id],
      queryFn: () => getMovieById(id),
    })
  }, 300)
}

