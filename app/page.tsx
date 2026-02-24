import Link from 'next/link'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ])

  const featuredProducts = products.slice(0, 4)
  const latestReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          {products[0]?.metadata?.image && (
            <img
              src={`${products[0].metadata.image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress&blur=40`}
              alt=""
              className="h-full w-full object-cover opacity-30"
              width={1600}
              height={800}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40" />
        </div>

        <div className="container-wide relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Discover Quality
              <span className="block text-brand-400 mt-1">Products</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-lg">
              Explore our curated collection of premium products — from electronics to clothing and home essentials.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-700 transition-colors"
              >
                Shop All Products
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container-wide py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-1 text-gray-500">Browse our collection by category</p>
            </div>
            <Link
              href="/categories"
              className="hidden sm:inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-white border-y border-gray-100">
          <div className="container-wide py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                <p className="mt-1 text-gray-500">Our handpicked selection for you</p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {latestReviews.length > 0 && (
        <section className="container-wide py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">What Customers Say</h2>
            <p className="mt-1 text-gray-500">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}