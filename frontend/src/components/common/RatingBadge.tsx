type Props = {
  label?: string
  value: number | string
}

export const RatingBadge = ({ label = 'IMDb', value }: Props) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white/80">
    {label}: <span className="text-white">{value}</span>
  </span>
)

