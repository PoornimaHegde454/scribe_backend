import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiExternalLink } from 'react-icons/fi'
import type { Movie } from '../../types/movie'
import { SentimentBadge } from '../common/SentimentBadge'
import { RatingBadge } from '../common/RatingBadge'

type Props = {
  movie: Movie
  onHover?: (id: string) => void
}

export const MovieCard = ({ movie, onHover }: Props) => (
  <motion.article
    whileHover={{ y: -6, scale: 1.02 }}
    onHoverStart={() => onHover?.(movie.id)}
    className="group relative h-[320px] w-[210px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-black/30"
  >
    <img
      src={movie.poster}
      alt={movie.title}
      className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 opacity-0 transition group-hover:opacity-100" />
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-2 p-4 opacity-0 transition group-hover:opacity-100">
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">
        {movie.year} • {movie.genres?.[0] ?? 'Drama'}
      </p>
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <div className="flex flex-wrap gap-2 text-xs">
        <RatingBadge value={movie.imdbRating.toFixed(1)} />
        <SentimentBadge score={movie.sentimentScore} />
      </div>
      <Link
        to={`/movie/${movie.id}`}
        className="pointer-events-auto mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-sky-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
      >
        View Details <FiExternalLink />
      </Link>
    </div>
  </motion.article>
)

