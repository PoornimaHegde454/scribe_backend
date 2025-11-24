type Props = {
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({
  message = 'Signal lost while fetching data.',
  onRetry,
}: Props) => (
  <div className="flex flex-col items-center justify-center rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center text-sm text-red-200">
    <p>{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full border border-red-300/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
      >
        Retry
      </button>
    )}
  </div>
)

