// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import BuyButton from '@/components/BuyButton' // Changed: Added BuyButton import
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found — Cosmic Store' }
  }

  return {
    title: `${product.metadata.name} — Cosmic Store`,
    description: `${product.metadata.name} — $${product.metadata.price.toFixed(2)}`,
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)
  const { name, description, price, image, in_stock, category } = product.metadata

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating?.key || '0', 10), 0) / reviews.length
      : 0

  return (
    <div className="container-wide py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gray-700 transition-colors">
          Products
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link href={`/categories/${category.slug}`} className="hover:text-gray-700 transition-colors">
              {category.title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-900 font-medium">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          {image ? (
            <img
              src={`${image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
              alt={name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center">
              <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-3 hover:bg-brand-100 transition-colors"
            >
              {category.title}
            </Link>
          )}

          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                in_stock
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {in_stock ? '✓ In Stock' : '✕ Out of Stock'}
            </span>
          </div>

          {/* Changed: Added BuyButton component */}
          <BuyButton productName={name} price={price} inStock={in_stock} />

          {description && (
            <div className="mt-8 prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}