type Props = {
  message?: string
}

export const LoadingState = ({ message = 'Loading cinematic realms...' }: Props) => (
  <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-12 text-white/70">
    <div className="animate-spin rounded-full border-2 border-white/40 border-t-red-500 p-4" />
    <p className="ml-4 text-sm uppercase tracking-[0.4em]">{message}</p>
  </div>
)

