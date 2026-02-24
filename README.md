# Cosmic Store

![Cosmic Store](https://imgix.cosmicjs.com/10c18260-114c-11f1-9d0e-b53b97dc6163-photo-1505740420928-5e560c06d30e-1771915381817.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern e-commerce storefront powered by [Cosmic](https://www.cosmicjs.com) and built with Next.js 16. Browse products, filter by category, and read customer reviews — all managed through your Cosmic dashboard.

## Features

- 🛍️ **Product Catalog** — Beautiful grid layout with product images, prices, and stock indicators
- 🏷️ **Category Browsing** — Filter products by Electronics, Clothing, and Home & Kitchen
- ⭐ **Customer Reviews** — Star ratings and detailed review comments for each product
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js App Router
- 🎨 **Modern UI** — Clean design with Tailwind CSS and smooth animations

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699d48255197e9261663aab3&clone_repository=699d49815197e9261663aaee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "An e-commerce store with products, categories, and reviews"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [React Markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the e-commerce content model

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd cosmic-store
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables — create a `.env.local` file:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your store.

## Cosmic SDK Examples

### Fetching products with category data
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching reviews for a product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types from your Cosmic bucket:

| Type | Fields | Description |
|------|--------|-------------|
| **Products** | name, description, price, image, in_stock, category | Product catalog items |
| **Categories** | name, description, image | Product categories |
| **Reviews** | reviewer_name, rating, comment, product | Customer reviews |

Content is fetched server-side using the Cosmic SDK with `depth(1)` for connected object relationships.

## Deployment Options

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Add environment variables
5. Deploy

<!-- README_END -->