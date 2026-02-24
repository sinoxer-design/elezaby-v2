"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryPill } from "@/components/commerce/CategoryPill";
import { ProductCarousel } from "@/components/commerce/ProductCarousel";
import { mockProducts } from "@/lib/mock-data";
import { getPrimaryCategories } from "@/lib/categories";
import { useCart } from "@/hooks/useCart";

export default function HomePage() {
  const { addItem } = useCart();
  const primaryCategories = getPrimaryCategories();

  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        originalPrice: product.originalPrice,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Category Rail */}
      <section>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 ps-[var(--page-padding-x)] pe-4 lg:flex-wrap lg:overflow-visible lg:px-8 lg:py-4 lg:gap-6">
          {primaryCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              name={cat.name}
              emoji={cat.emoji}
              href={`/products?category=${cat.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Hero Banner */}
      <section className="px-[var(--page-padding-x)] lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-600 to-brand-400 p-6 lg:p-10 lg:h-64">
          <div className="relative z-10">
            <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-white/80">
              Special Offer
            </span>
            <h2 className="mt-1 font-display text-2xl text-white lg:text-4xl">
              Up to 30% Off
            </h2>
            <p className="mt-1 text-sm text-white/90 lg:text-base lg:mt-2">
              On vitamins & supplements this week
            </p>
            <button className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-600 transition-transform active:scale-95 lg:mt-6 lg:px-6 lg:py-3 lg:text-base">
              Shop Now
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-white/10 lg:h-64 lg:w-64 lg:-end-16 lg:-top-16" />
          <div className="absolute -bottom-4 -end-4 h-24 w-24 rounded-full bg-white/5 lg:h-40 lg:w-40" />
        </div>
      </section>

      {/* Trending Now */}
      <ProductCarousel
        title="Trending Now"
        subtitle="Most popular this week"
        products={mockProducts.slice(0, 6)}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* New Arrivals */}
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just added to our catalog"
        products={mockProducts.slice(4, 10)}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* Skincare Essentials */}
      <ProductCarousel
        title="Skincare Essentials"
        subtitle="Dermatologist recommended"
        products={[mockProducts[2], mockProducts[6], mockProducts[9], mockProducts[0], mockProducts[1], mockProducts[3]]}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* Health Tips / Blog Preview */}
      <section className="px-[var(--page-padding-x)] lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl text-sand-800 dark:text-foreground lg:text-2xl">Health Tips</h2>
            <p className="mt-0.5 text-xs text-sand-500 dark:text-muted-foreground">
              Expert advice from our pharmacists
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-brand-500 dark:text-primary"
            asChild
          >
            <Link href="/blog">
              See All
              <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {[
            {
              title: "Summer Skincare Guide",
              category: "Skincare",
              readTime: "3 min",
            },
            {
              title: "Essential Vitamins for Energy",
              category: "Wellness",
              readTime: "5 min",
            },
            {
              title: "Baby Care Tips for New Parents",
              category: "Baby Care",
              readTime: "4 min",
            },
          ].map((article) => (
            <div
              key={article.title}
              className="w-[70%] shrink-0 rounded-lg border border-sand-200 dark:border-border bg-white dark:bg-card p-3 md:w-auto"
            >
              <div className="h-28 rounded-md bg-sand-100 dark:bg-secondary" />
              <span className="mt-2 inline-block text-[0.625rem] font-semibold uppercase text-brand-600 dark:text-primary">
                {article.category}
              </span>
              <h3 className="mt-0.5 text-sm font-semibold text-sand-700 dark:text-foreground">
                {article.title}
              </h3>
              <span className="text-xs text-sand-400 dark:text-muted-foreground">
                {article.readTime} read
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
