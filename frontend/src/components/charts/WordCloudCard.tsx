type Props = {
  image?: string
  keywords: string[]
}

export const WordCloudCard = ({ image, keywords }: Props) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <p className="text-sm uppercase tracking-[0.4em] text-white/50">Word Cloud</p>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className="h-48 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        {image ? (
          <img src={image} alt="Word cloud" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            Awaiting render
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-gradient-to-r from-red-500/40 to-sky-500/40 px-3 py-1 text-xs font-semibold text-white/80"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  </div>
)

