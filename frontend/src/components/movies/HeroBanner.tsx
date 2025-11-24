import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiTrendingUp, FiInfo } from 'react-icons/fi'
import type { Movie } from '../../types/movie'
import { RatingBadge } from '../common/RatingBadge'
import { SentimentBadge } from '../common/SentimentBadge'

type Props = {
  movie: Movie
}

export const HeroBanner = ({ movie }: Props) => (
  <motion.section
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f0f10] to-[#050505]"
  >
    <div className="absolute inset-0">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-transparent to-black/60" />
    </div>
    <div className="relative grid gap-10 px-10 py-16 lg:grid-cols-2">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.8em] text-red-300">
          Trending Highlight
        </p>
        <h1 className="text-4xl font-black sm:text-5xl">{movie.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <span>{movie.year}</span>
          <span>{movie.genres.join(' • ')}</span>
          <span>{movie.duration}</span>
        </div>
        <p className="max-w-xl text-lg text-white/80">{movie.synopsis}</p>
        <div className="flex flex-wrap gap-3">
          <RatingBadge value={movie.imdbRating.toFixed(1)} />
          <SentimentBadge score={movie.sentimentScore} />
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
            {movie.reviewCount.toLocaleString()} reviews
          </span>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to={`/movie/${movie.id}?tab=sentiment`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-sky-500 px-6 py-3 font-semibold uppercase tracking-[0.2em]"
          >
            <FiTrendingUp /> View Sentiment Analysis
          </Link>
          <Link
            to={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
          >
            <FiInfo /> View Details
          </Link>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden justify-end lg:flex"
      >
        <div className="relative h-[420px] w-[260px] overflow-hidden rounded-[30px] border border-white/10 shadow-aurora">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  </motion.section>
)

