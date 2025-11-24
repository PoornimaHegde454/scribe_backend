import type { Review } from '../../types/movie'
import { SentimentBadge } from '../common/SentimentBadge'

type Props = {
  review: Review
}

export const ReviewCard = ({ review }: Props) => (
  <article className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
    <div className="flex items-center justify-between text-sm text-white/60">
      <div>
        <p className="font-semibold text-white">{review.author}</p>
        <p>{review.source}</p>
      </div>
      <SentimentBadge score={review.confidence} />
    </div>
    <p className="mt-3 text-white/80">{review.text}</p>
    <div className="mt-3 flex items-center justify-between text-xs text-white/50">
      <span className="uppercase tracking-[0.3em]">{review.sentiment}</span>
      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
    </div>
  </article>
)

