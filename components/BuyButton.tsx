'use client'

import { useState } from 'react'

interface BuyButtonProps {
  productName: string
  price: number
  inStock: boolean
}

export default function BuyButton({ productName, price, inStock }: BuyButtonProps) {
  const [isAdded, setIsAdded] = useState(false)

  const handleBuy = () => {
    if (!inStock) return
    setIsAdded(true)
    // Simulate a brief confirmation state
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <button
      onClick={handleBuy}
      disabled={!inStock}
      className={`w-full mt-8 flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold transition-all duration-200 ${
        !inStock
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : isAdded
            ? 'bg-emerald-600 text-white scale-[0.98]'
            : 'bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98] shadow-md hover:shadow-lg'
      }`}
    >
      {!inStock ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Out of Stock
        </>
      ) : isAdded ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart!
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Buy Now — ${price.toFixed(2)}
        </>
      )}
    </button>
  )
}