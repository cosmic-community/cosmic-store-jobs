export default function Loading() {
  return (
    <div className="container-wide py-20">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    </div>
  )
}