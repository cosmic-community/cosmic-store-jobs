import StarRating from '@/components/StarRating'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const { reviewer_name, rating, comment, product } = review.metadata
  const ratingNum = parseInt(rating?.key || '0', 10)

  return (
    <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
              {reviewer_name?.charAt(0) || '?'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{reviewer_name}</p>
              {showProduct && product && (
                <p className="text-xs text-gray-500">
                  Reviewed{' '}
                  <span className="font-medium text-gray-700">{product.title}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <StarRating rating={ratingNum} size="sm" />
      </div>

      {comment && (
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{comment}</p>
      )}
    </div>
  )
}