type Props = {
  score: number
}

export const SentimentBadge = ({ score }: Props) => {
  const sentiment =
    score >= 70 ? 'positive' : score >= 40 ? 'neutral' : 'negative'

  const colors = {
    positive: 'from-green-400 to-emerald-500 text-black',
    neutral: 'from-slate-400 to-slate-600 text-white',
    negative: 'from-red-500 to-pink-500 text-white',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold ${colors[sentiment]}`}
    >
      Sentiment {score}%
    </span>
  )
}

