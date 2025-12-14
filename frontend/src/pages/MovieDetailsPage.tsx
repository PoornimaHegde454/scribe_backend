import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  useMovieDetails,
  useMovieRecommendations,
  useMovieReviews,
  useMovieSentiment,
} from '../api/hooks'
import { analyzeSentiment, type SentimentResponse } from '../api/client'
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

  const [customReview, setCustomReview] = useState('')
  const [analysisResult, setAnalysisResult] = useState<SentimentResponse | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyzeClick = async () => {
    if (!customReview.trim()) return
    setIsAnalyzing(true)
    try {
      const result = await analyzeSentiment(customReview)
      setAnalysisResult(result)
    } catch (err) {
      console.error('Analysis failed', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const reviewList = useMemo(
    () => reviews.data?.pages.flatMap((page) => page.reviews) ?? [],
    [reviews.data],
  )

  if (isLoading) return <LoadingState message="Loading movie profile" />
  if (error || !movie) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="h-full w-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        </div>

        <div className="relative grid gap-8 px-6 py-12 lg:grid-cols-[300px_1fr] lg:px-12">
          {/* Poster */}
          <div className="hidden lg:block">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-[450px] w-full rounded-lg object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-[#e5e5e5]/60">
                {movie.genres.map(g => (
                  <span key={g} className="rounded-full border border-white/10 px-3 py-1 bg-white/5">{g}</span>
                ))}
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white lg:text-6xl">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 text-[#a3a3a3]">
                <span>{movie.year}</span>
                <span className="h-1 w-1 rounded-full bg-current" />
                <span>{movie.duration}</span>
                <span className="h-1 w-1 rounded-full bg-current" />
                <span className="rounded border border-white/20 px-1 text-xs">HD</span>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-[#e5e5e5] max-w-2xl">
              {movie.synopsis}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#46d369]">{movie.sentimentScore}%</span>
                <span className="text-sm font-medium text-[#a3a3a3]">Match</span>
              </div>
              <RatingBadge value={movie.imdbRating.toFixed(1)} />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                className="flex items-center gap-2 rounded bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-white/90"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Play
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded bg-[rgba(109,109,110,0.7)] px-8 py-3 text-lg font-bold text-white transition hover:bg-[rgba(109,109,110,0.4)]"
                onClick={() => setParams({ tab: 'sentiment' })}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Analyze
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-[#141414]/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-[#141414]/60 boundary">
        <div className="flex gap-8 border-b border-white/10 pb-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setParams({ tab })}
              className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === tab
                ? 'border-b-2 border-[#E50914] text-white'
                : 'text-[#a3a3a3] hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <section className="space-y-12 animate-fade-in">
          {/* Cast */}
          <div>
            <h3 className="mb-6 text-xl font-bold text-white">Top Cast</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {(movie.cast ?? []).map((member) => (
                <div key={member.name} className="group cursor-pointer">
                  <div className="mb-3 overflow-hidden rounded-md bg-[#2f2f2f]">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
                    />
                  </div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-[#a3a3a3]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Crew Grid */}
          <div className="rounded-xl border border-white/10 bg-[#181818] p-8">
            <h3 className="mb-4 text-lg font-bold text-white">Crew Code</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {(movie.crew ?? []).map((c) => (
                <div key={c.name}>
                  <p className="font-bold text-white">{c.name}</p>
                  <p className="text-sm text-[#a3a3a3]">{c.job}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'reviews' && (
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {reviewList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {activeTab === 'sentiment' && (
        <div className="space-y-12">
          {/* Live Analysis */}
          <section className="rounded-xl border border-white/10 bg-[#181818] p-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Live AI Sentiment Analysis</h2>
                <p className="text-[#a3a3a3]">Enter your own review below and let our Naive Bayes model analyze its emotional resonance.</p>
              </div>

              <div className="relative">
                <textarea
                  value={customReview}
                  onChange={(e) => setCustomReview(e.target.value)}
                  placeholder="Type your review here... (e.g. 'The visual effects were stunning but the plot felt hollow.')"
                  className="w-full h-32 rounded-lg bg-[#2f2f2f] p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] resize-none"
                />
                <button
                  onClick={handleAnalyzeClick}
                  disabled={isAnalyzing || !customReview.trim()}
                  className="absolute bottom-4 right-4 rounded bg-[#E50914] px-6 py-2 font-bold text-white hover:bg-[#ff0a16] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>

              {analysisResult && (
                <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
                  <div className={`rounded-lg p-6 border ${analysisResult.isPositive ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'}`}>
                    <h3 className="text-lg font-bold mb-2 text-white">Verdict: {analysisResult.label.toUpperCase()}</h3>
                    <p className="text-[#e5e5e5] mb-4">{analysisResult.recommendation}</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#a3a3a3]">Confidence</span>
                          <span className="text-white font-mono">{(analysisResult.probability * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                          <div className="h-full bg-current text-white opacity-80" style={{ width: `${analysisResult.probability * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#a3a3a3]">Polarity</span>
                          <span className="text-white font-mono">{analysisResult.polarity.toFixed(2)}</span>
                        </div>
                        <div className="h-2 bg-black/50 rounded-full overflow-hidden relative">
                          <div className="absolute top-0 bottom-0 w-1 bg-white left-1/2 -ml-0.5" />
                          <div
                            className={`h-full absolute top-0 ${analysisResult.polarity > 0 ? 'bg-green-500 left-1/2' : 'bg-red-500 right-1/2'}`}
                            style={{ width: `${Math.abs(analysisResult.polarity) * 50}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-[#2f2f2f] p-6 text-center flex flex-col justify-center items-center">
                    <span className="text-sm text-[#a3a3a3] uppercase tracking-wider">Vibe Magnitude</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-2">
                      {analysisResult.magnitude}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {sentiment.data && (
            <section className="grid gap-6 lg:grid-cols-2">
              <PieChartCard
                title="Overall Sentiment"
                data={[
                  { name: 'Positive', value: sentiment.data.positive },
                  { name: 'Neutral', value: sentiment.data.neutral },
                  { name: 'Negative', value: sentiment.data.negative },
                ]}
              />
              <BarChartCard
                title="Rating Breakdown"
                data={sentiment.data.ratingDistribution}
              />
              <WordCloudCard
                image={sentiment.data.wordCloudImage}
                keywords={sentiment.data.keywords}
              />
            </section>
          )}
        </div>
      )}

      {activeTab === 'recommendations' && recommendations.data && (
        <RecommendationRow items={recommendations.data} />
      )}
    </div>
  )
}

