import { FiSearch } from 'react-icons/fi'
import type { Movie } from '../../types/movie'

type Props = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  suggestions: Movie[]
  onSelectSuggestion: (movie: Movie) => void
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  placeholder = 'Search movies, moods, or directors',
}: Props) => (
  <div className="relative mx-auto max-w-3xl">
    <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500/20 to-sky-500/20" />
    <div className="relative rounded-full border border-white/10 bg-black/80 px-6 py-4 shadow-aurora">
      <div className="flex items-center gap-4">
        <FiSearch className="text-2xl text-white/50" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onSubmit()
          }}
          className="flex-1 bg-transparent text-lg text-white placeholder:text-white/40 focus:outline-none"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-full bg-gradient-to-r from-red-500 to-sky-500 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em]"
        >
          Search
        </button>
      </div>
      {value.length > 1 && suggestions.length > 0 && (
        <div className="mt-4 max-h-72 overflow-y-auto rounded-3xl border border-white/5 bg-black/70">
          {suggestions.map((movie) => (
            <button
              type="button"
              key={movie.id}
              onClick={() => onSelectSuggestion(movie)}
              className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left hover:bg-white/5 last:border-none"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="h-12 w-8 rounded object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold">{movie.title}</p>
                <p className="text-xs text-white/50">
                  {movie.year} • Sentiment {movie.sentimentScore}%
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
)

