"use client";

import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryPill } from "@/components/commerce/CategoryPill";
import { ProductCarousel } from "@/components/commerce/ProductCarousel";
import { PromoBannerCarousel } from "@/components/commerce/PromoBannerCarousel";
import { FlashDealsSection } from "@/components/commerce/FlashDealsSection";
import { ProfileCompletionAlert } from "@/components/commerce/ProfileCompletionAlert";
import { BundleSection } from "@/components/commerce/BundleSection";
import { OrderAgainSection } from "@/components/commerce/OrderAgainSection";
import { RamadanHeroBanner } from "@/components/commerce/RamadanHeroBanner";
import { SymptomSearchSection } from "@/components/commerce/SymptomSearchSection";
import { CategoryZone } from "@/components/commerce/CategoryZone";
import { PromoDealBanners } from "@/components/commerce/PromoDealBanners";
import {
  mockProducts,
  mockFlashDeals,
  mockBestSellers,
  mockPromoBanners,
  mockBundles,
  mockBrands,
  mockPromoSections,
  allProducts,
  getPersonalizedProducts,
} from "@/lib/mock-data";
import { getPrimaryCategories } from "@/lib/categories";
import { useCart } from "@/hooks/useCart";
import { useUserProfile } from "@/hooks/useUserProfile";

// Category order for 2-row grid (4 per row)
const CATEGORY_ORDER = ["skin", "baby", "pc", "hair", "med", "vit", "fa", "dent"];

export default function HomePage() {
  const { addItem } = useCart();
  const { profile } = useUserProfile();
  const primaryCategories = getPrimaryCategories();

  const recommendedProducts = getPersonalizedProducts(
    mockProducts.slice(0, 12),
    profile
  ).slice(0, 8);

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        originalPrice: product.originalPrice,
        requiresPrescription: product.requiresPrescription,
      });
    }
  };

  const handleAddBundle = (bundleId: string) => {
    const bundle = mockBundles.find((b) => b.id === bundleId);
    if (!bundle) return;
    for (const item of bundle.products) {
      const product = allProducts.find((p) => p.id === item.productId);
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
    }
  };

  const flashDealEndTime =
    mockFlashDeals[0]?.flashDeal?.endsAt || new Date().toISOString();

  // Sort categories by defined order for 2-row grid
  const sortedCategories = [...primaryCategories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.id) - CATEGORY_ORDER.indexOf(b.id)
  );

  // Products grouped by category for zone sections
  const skincareProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("skin")
  );
  const babyProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("baby")
  );
  const vitaminProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("vit")
  );

  return (
    <div className="relative flex flex-col gap-4 pb-6 pt-2">
      <RamadanHeroBanner />

      <div className="relative z-[1] isolate flex flex-col gap-10">
        {/* 1. Banner Carousel */}
        <PromoBannerCarousel banners={mockPromoBanners} />

        {/* 2. Daily Deals */}
        <FlashDealsSection
          products={mockFlashDeals}
          endsAt={flashDealEndTime}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Categories: 2-row grid */}
        <section className="relative z-10 px-[var(--page-padding-x)] lg:px-8">
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-cyan-500 px-4 py-2.5 shadow-[0_4px_16px_rgba(16,34,76,0.15)]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-white/90" />
              <span className="text-sm font-bold text-white">Popular Categories</span>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-0.5 text-[0.65rem] font-semibold text-white/80 transition-colors hover:text-white"
            >
              See All
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-3 lg:flex lg:gap-4 lg:overflow-x-auto lg:scrollbar-hide">
            {sortedCategories.map((cat) => (
              <CategoryPill
                key={cat.id}
                name={cat.name}
                emoji={cat.emoji}
                imageUrl={cat.imageUrl}
                href={`/products?category=${cat.slug}`}
                size="sm"
              />
            ))}
          </div>
        </section>

        <ProfileCompletionAlert />

        {/* 3. Top Picks (Best Sellers) */}
        <ProductCarousel
          title="Best Sellers"
          kicker="Top picks"
          products={mockBestSellers.slice(0, 8)}
          viewAllHref="/products"
          onAddToCart={handleAddToCart}
        />

        {/* 4. Order Again */}
        <OrderAgainSection onAddToCart={handleAddToCart} />

        {/* 5. Colorful Promo Carousel */}
        <PromoDealBanners sections={mockPromoSections} />

        {/* 6. Shop by Brand */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-sand-800">Shop by Brand</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
                  asChild
                >
                  <Link href="/brands">
                    See All
                    <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 pl-[var(--page-padding-x)] pr-4 lg:px-8 lg:flex-wrap lg:overflow-visible lg:gap-5">
            {mockBrands
              .filter((b) => b.featured)
              .concat(mockBrands.filter((b) => !b.featured))
              .slice(0, 10)
              .map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/products?brand=${brand.slug}`}
                  className="flex w-20 shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="h-[4.75rem] w-[4.75rem] overflow-hidden rounded-[1.25rem] border border-brand-100 bg-white shadow-[0_10px_18px_rgba(16,34,76,0.08)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EBF0FF&color=1B3A6B&bold=true&size=128&font-size=0.4`}
                      alt={brand.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="line-clamp-2 w-full text-center text-[0.6875rem] font-bold leading-tight text-sand-700">
                    {brand.name}
                  </span>
                </Link>
              ))}
          </div>
        </section>

        {/* 6. Skincare */}
        <CategoryZone
          title="Skincare Picks"
          subtitle="Dermatologist-recommended, trending now"
          kicker="Glow essentials"
          layout="mixed"
          products={skincareProducts.length > 0 ? skincareProducts : mockProducts.slice(0, 6)}
          viewAllHref="/products?category=skincare"
          onAddToCart={handleAddToCart}
        />

        {/* 7. Supplements */}
        <CategoryZone
          title="Vitamins & Supplements"
          subtitle="Boost immunity, energy & wellness"
          kicker="Daily wellness"
          layout="carousel"
          products={vitaminProducts.length > 0 ? vitaminProducts : mockProducts.slice(2, 8)}
          viewAllHref="/products?category=vitamins"
          onAddToCart={handleAddToCart}
        />

        {/* 8. Baby Care */}
        <CategoryZone
          title="Baby Care Favorites"
          subtitle="Top picks for new & expecting parents"
          kicker="Mother & baby"
          layout="vertical"
          products={babyProducts.length > 0 ? babyProducts : mockProducts.slice(6, 10)}
          viewAllHref="/products?category=baby-care"
          onAddToCart={handleAddToCart}
        />

        {/* 9. Shop by Symptoms */}
        <SymptomSearchSection />

        {/* 10. Sales in Bundles */}
        <BundleSection bundles={mockBundles} onAddBundle={handleAddBundle} />

        {/* 11. Health Tips */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-sand-800">Health Tips</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 text-sm font-semibold text-brand-500 hover:text-brand-700"
                  asChild
                >
                  <Link href="/blog">
                    See All
                    <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
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
                className="w-[74%] shrink-0 rounded-[1.25rem] border border-sand-200 bg-[linear-gradient(180deg,#fff,#fbfdff)] p-3 shadow-[0_12px_24px_rgba(16,34,76,0.08)] md:w-auto"
              >
                <div className="h-28 rounded-xl bg-sand-100" />
                <span className="mt-2.5 inline-block rounded-md bg-brand-50 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase text-brand-600">{article.category}</span>
                <h3 className="mt-1 text-sm font-bold text-sand-800">
                  {article.title}
                </h3>
                <span className="text-xs font-medium text-sand-500">
                  {article.readTime} read
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
