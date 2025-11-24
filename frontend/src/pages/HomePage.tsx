import { HeroBanner } from '../components/movies/HeroBanner'
import { MovieRow } from '../components/movies/MovieRow'
import { useHeroMovie, useMovieRows } from '../api/hooks'
import { LoadingState } from '../components/common/LoadingState'

export const HomePage = () => {
  const { data: hero, isLoading: heroLoading } = useHeroMovie()
  const rows = useMovieRows()

  return (
    <div className="space-y-10">
      {heroLoading && <LoadingState message="Summoning hero feature" />}
      {hero && <HeroBanner movie={hero} />}

      <MovieRow
        title="Trending Movies"
        data={rows.trending.data}
        isLoading={rows.trending.isLoading}
        isError={!!rows.trending.error}
        refetch={rows.trending.refetch}
      />
      <MovieRow
        title="Top Rated"
        data={rows.top.data}
        isLoading={rows.top.isLoading}
        isError={!!rows.top.error}
        refetch={rows.top.refetch}
      />
      <MovieRow
        title="Most Reviewed"
        data={rows.reviewed.data}
        isLoading={rows.reviewed.isLoading}
        isError={!!rows.reviewed.error}
        refetch={rows.reviewed.refetch}
      />
      <MovieRow
        title="Based on Sentiment Score"
        data={rows.sentiment.data}
        isLoading={rows.sentiment.isLoading}
        isError={!!rows.sentiment.error}
        refetch={rows.sentiment.refetch}
      />
    </div>
  )
}

