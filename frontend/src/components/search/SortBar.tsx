type Props = {
  value: string
  onChange: (value: string) => void
}

const options = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'imdb', label: 'IMDb Rating' },
  { value: 'sentiment', label: 'Sentiment Score' },
  { value: 'reviews', label: 'Review Count' },
]

export const SortBar = ({ value, onChange }: Props) => (
  <div className="mt-8 flex items-center justify-end gap-4 text-sm text-white/60">
    <span>Sort by</span>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-white focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

