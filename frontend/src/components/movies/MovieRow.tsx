import { motion } from 'framer-motion'
import type { MovieRowPayload } from '../../types/movie'
import { MovieCard } from './MovieCard'
import { LoadingState } from '../common/LoadingState'
import { ErrorState } from '../common/ErrorState'
import { usePrefetchMovie } from '../../api/hooks'

type Props = {
  title: string
  data?: MovieRowPayload
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

export const MovieRow = ({
  title,
  data,
  isLoading,
  isError,
  refetch,
}: Props) => {
  const prefetch = usePrefetchMovie()

  if (isLoading) {
    return <LoadingState message={`Tuning ${title}`} />
  }

  if (isError || !data) {
    return <ErrorState message={`Unable to load ${title}`} onRetry={refetch} />
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.6em] text-white/40">
            {data.type}
          </p>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <button
          type="button"
          onClick={refetch}
          className="text-xs uppercase tracking-[0.4em] text-sky-400"
        >
          Refresh
        </button>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent" />
        <motion.div
          className="no-scrollbar flex gap-6 overflow-x-auto pb-4"
          whileTap={{ cursor: 'grabbing' }}
        >
          {data.items.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onHover={prefetch}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

