import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchResults } from '../api/hooks'
import { useDebounce } from '../hooks/useDebounce'
import { SearchBar } from '../components/search/SearchBar'
import { SortBar } from '../components/search/SortBar'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { SearchResultsGrid } from '../components/search/SearchResultsGrid'
import type { Movie } from '../types/movie'

export const SearchPage = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = params.get('q') ?? ''
  const [term, setTerm] = useState(initialQuery)
  const [sort, setSort] = useState('relevance')
  const debounced = useDebounce(term, 300)

  const { data, isLoading, error, refetch } = useSearchResults(debounced)

  const sortedResults = useMemo(() => {
    if (!data) return []
    const items = [...(data as Movie[])]
    switch (sort) {
      case 'imdb':
        return items.sort((a, b) => b.imdbRating - a.imdbRating)
      case 'sentiment':
        return items.sort((a, b) => b.sentimentScore - a.sentimentScore)
      case 'reviews':
        return items.sort((a, b) => b.reviewCount - a.reviewCount)
      default:
        return items
    }
  }, [data, sort])

  const handleSubmit = () => {
    if (!term.trim()) return
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
    refetch()
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <p className="text-xs uppercase tracking-[0.6em] text-white/40">
          Prime Search
        </p>
        <h1 className="text-3xl font-semibold">Find the vibe you crave</h1>
      </div>

      <SearchBar
        value={term}
        onChange={setTerm}
        onSubmit={handleSubmit}
        suggestions={(data as Movie[])?.slice(0, 5) ?? []}
        onSelectSuggestion={(movie) => navigate(`/movie/${movie.id}`)}
      />

      <SortBar value={sort} onChange={setSort} />

      {isLoading && <LoadingState message="Searching the vault" />}
      {error && <ErrorState onRetry={refetch} />}

      {!isLoading && !error && (
        <SearchResultsGrid results={sortedResults as Movie[]} />
      )}
    </div>
  )
}

