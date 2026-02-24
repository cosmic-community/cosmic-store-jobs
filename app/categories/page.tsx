import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories — Cosmic Store',
  description: 'Browse products by category.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="mt-2 text-gray-500">
          Browse our {categories.length} product categor{categories.length !== 1 ? 'ies' : 'y'}
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}