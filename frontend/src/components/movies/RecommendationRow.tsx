import type { Recommendation } from '../../types/movie'
import { SentimentBadge } from '../common/SentimentBadge'
import { RatingBadge } from '../common/RatingBadge'
import { Link } from 'react-router-dom'

type Props = {
  items: Recommendation[]
}

export const RecommendationRow = ({ items }: Props) => (
  <section className="mt-10 space-y-4">
    <div>
      <p className="text-xs uppercase tracking-[0.6em] text-white/40">
        Recommendations
      </p>
      <h3 className="text-2xl font-semibold">Because you watched this</h3>
    </div>
    <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
      {items.map((item) => (
        <Link
          to={`/movie/${item.id}`}
          key={item.id}
          className="min-w-[200px] rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-white/40"
        >
          <img
            src={item.poster}
            alt={item.title}
            className="h-52 w-full rounded-2xl object-cover"
          />
          <div className="mt-3 space-y-2">
            <p className="text-sm text-white/80">
              {item.title} ({item.year})
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <RatingBadge value={item.imdbRating.toFixed(1)} />
              <SentimentBadge score={item.sentimentScore} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
)

