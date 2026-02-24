import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, description, image } = category.metadata

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl h-64 bg-gray-900">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-600 to-brand-800" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          {description && (
            <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}