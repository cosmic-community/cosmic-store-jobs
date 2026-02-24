import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">
              CS
            </div>
            <span className="text-lg font-bold text-gray-900">Cosmic Store</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
          </nav>

          <div className="flex sm:hidden items-center gap-6">
            <Link href="/products" className="text-sm font-medium text-gray-600">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-600">
              Categories
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}