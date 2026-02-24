// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found — Cosmic Store' }
  }

  return {
    title: `${category.metadata.name} — Cosmic Store`,
    description: category.metadata.description || `Browse ${category.metadata.name} products.`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const { name, description, image } = category.metadata

  return (
    <div>
      {/* Category Hero */}
      <section className="relative overflow-hidden bg-gray-900 h-64">
        {image ? (
          <img
            src={`${image.imgix_url}?w=1600&h=500&fit=crop&auto=format,compress`}
            alt={name}
            width={1600}
            height={500}
            className="h-full w-full object-cover opacity-40"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-600 to-brand-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-wide pb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{name}</h1>
          {description && (
            <p className="mt-2 text-gray-200 max-w-xl">{description}</p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <div className="container-wide py-12">
        <p className="text-gray-500 mb-8">
          {products.length} product{products.length !== 1 ? 's' : ''} in {name}
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              ← View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}