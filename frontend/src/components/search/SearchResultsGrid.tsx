import type { Movie } from '../../types/movie'
import { Link } from 'react-router-dom'
import { RatingBadge } from '../common/RatingBadge'
import { SentimentBadge } from '../common/SentimentBadge'

type Props = {
  results: Movie[]
}

export const SearchResultsGrid = ({ results }: Props) => (
  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {results.map((movie) => (
      <Link
        to={`/movie/${movie.id}`}
        key={movie.id}
        className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-white/40"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-80 w-full rounded-2xl object-cover"
        />
        <div className="mt-3 space-y-2">
          <p className="text-lg font-semibold">{movie.title}</p>
          <p className="text-sm text-white/60">
            {movie.year} • {movie.genres?.join(' / ') ?? 'Mixed genres'}
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <RatingBadge value={movie.imdbRating.toFixed(1)} />
            <SentimentBadge score={movie.sentimentScore} />
          </div>
        </div>
      </Link>
    ))}
  </div>
)

