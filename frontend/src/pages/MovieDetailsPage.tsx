import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  useMovieDetails,
  useMovieRecommendations,
  useMovieReviews,
  useMovieSentiment,
} from '../api/hooks'
import { LoadingState } from '../components/common/LoadingState'
import { ErrorState } from '../components/common/ErrorState'
import { RatingBadge } from '../components/common/RatingBadge'
import { SentimentBadge } from '../components/common/SentimentBadge'
import { ReviewCard } from '../components/movies/ReviewCard'
import { RecommendationRow } from '../components/movies/RecommendationRow'
import { PieChartCard } from '../components/charts/PieChartCard'
import { BarChartCard } from '../components/charts/BarChartCard'
import { WordCloudCard } from '../components/charts/WordCloudCard'

const tabs = ['overview', 'reviews', 'sentiment', 'recommendations'] as const

export const MovieDetailsPage = () => {
  const { id = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const activeTab = (params.get('tab') ?? 'overview') as (typeof tabs)[number]

  const { data: movie, isLoading, error, refetch } = useMovieDetails(id)
  const sentiment = useMovieSentiment(id)
  const reviews = useMovieReviews(id)
  const recommendations = useMovieRecommendations(id)

  const reviewList = useMemo(
    () => reviews.data?.pages.flatMap((page) => page.reviews) ?? [],
    [reviews.data],
  )

  if (isLoading) return <LoadingState message="Loading movie profile" />
  if (error || !movie) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#101013] to-[#050505]">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="h-full w-full object-cover blur"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative grid gap-8 px-10 py-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-white/40">
              {movie.genres.join(' / ')}
            </p>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-white/70">
              {movie.releaseDate} • {movie.duration}
            </p>
            <p className="text-lg text-white/80">{movie.synopsis}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <RatingBadge value={movie.imdbRating.toFixed(1)} />
              <SentimentBadge score={movie.sentimentScore} />
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                {movie.reviewCount?.toLocaleString?.() ?? '—'} Reviews Scraped
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-red-500 to-sky-500 px-6 py-3 font-semibold uppercase tracking-[0.2em]"
              >
                Watch Trailer
              </button>
              <button
                type="button"
                onClick={() => setParams({ tab: 'sentiment' })}
                className="rounded-full border border-white/40 px-6 py-3 font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                Analyze Sentiment
              </button>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/40">
              Cast & Crew
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {(movie.cast ?? []).map((member) => (
                <div key={member.name} className="flex gap-3 rounded-2xl bg-white/5 p-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs text-white/60">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setParams({ tab })}
            className={`rounded-full px-5 py-2 text-sm uppercase tracking-[0.3em] ${
              activeTab === tab
                ? 'bg-gradient-to-r from-red-500 to-sky-500 text-black'
                : 'border border-white/20 text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <section className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">Crew</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {(movie.crew ?? []).map((member) => (
                  <div key={member.name} className="rounded-2xl border border-white/10 p-4">
                    <p className="text-white/80">{member.name}</p>
                    <p className="text-sm text-white/50">{member.job}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-white/50">Trailer</p>
              <div className="mt-4 aspect-video overflow-hidden rounded-2xl border border-white/10">
                {movie.trailerUrl ? (
                  <iframe
                    src={movie.trailerUrl}
                    title={`${movie.title} trailer`}
                    className="h-full w-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-white/40">
                    Trailer unavailable
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'reviews' && (
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reviewList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          {reviews.hasNextPage && (
            <button
              type="button"
              onClick={() => reviews.fetchNextPage()}
              className="w-full rounded-full border border-white/20 py-3 text-sm uppercase tracking-[0.3em]"
            >
              Load More Reviews
            </button>
          )}
        </section>
      )}

      {activeTab === 'sentiment' && sentiment.data && (
        <section className="grid gap-6 lg:grid-cols-2">
          <PieChartCard
            title="Sentiment Distribution"
            data={[
              { name: 'Positive', value: sentiment.data.positive },
              { name: 'Neutral', value: sentiment.data.neutral },
              { name: 'Negative', value: sentiment.data.negative },
            ]}
          />
          <BarChartCard
            title="Rating Distribution"
            data={sentiment.data.ratingDistribution}
          />
          <WordCloudCard
            image={sentiment.data.wordCloudImage}
            keywords={sentiment.data.keywords}
          />
        </section>
      )}

      {activeTab === 'recommendations' && recommendations.data && (
        <RecommendationRow items={recommendations.data} />
      )}
    </div>
  )
}

