"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryPill } from "@/components/commerce/CategoryPill";
import { ProductCarousel } from "@/components/commerce/ProductCarousel";
import { PromoBannerCarousel } from "@/components/commerce/PromoBannerCarousel";
import { FlashDealsSection } from "@/components/commerce/FlashDealsSection";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { BentoPromoGrid } from "@/components/commerce/BentoPromoGrid";
import { FreeShippingBar } from "@/components/commerce/FreeShippingBar";
import { WelcomeOfferBanner } from "@/components/commerce/WelcomeOfferBanner";
import { HomepageDeliverySelector } from "@/components/commerce/HomepageDeliverySelector";
import { ProfileCompletionAlert } from "@/components/commerce/ProfileCompletionAlert";
import { MaxSavingsSection } from "@/components/commerce/MaxSavingsSection";
import { BundleSection } from "@/components/commerce/BundleSection";
import { OrderAgainSection } from "@/components/commerce/OrderAgainSection";
import { BabyBrandSection } from "@/components/commerce/BabyBrandSection";
import { RamadanHeroBanner } from "@/components/commerce/RamadanHeroBanner";
import {
  mockProducts,
  mockFlashDeals,
  mockBestSellers,
  mockPromoBanners,
  mockMaxSavings,
  mockBundles,
  allProducts,
  getPersonalizedProducts,
} from "@/lib/mock-data";
import { getPrimaryCategories } from "@/lib/categories";
import { useCart } from "@/hooks/useCart";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function HomePage() {
  const { addItem } = useCart();
  const { profile } = useUserProfile();
  const primaryCategories = getPrimaryCategories();

  // Personalized recommendations
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

  // Flash deal end time (shared across all flash deals)
  const flashDealEndTime =
    mockFlashDeals[0]?.flashDeal?.endsAt || new Date().toISOString();

  return (
    <div className="relative flex flex-col gap-5 pt-3 pb-6">
      {/* Ramadan atmospheric background — floating blue lanterns */}
      <RamadanHeroBanner />

      {/* 1. Delivery/Pickup Selector (F8) */}
      <HomepageDeliverySelector />

      {/* 2. Profile Completion Alert (F2, conditional) */}
      <ProfileCompletionAlert />

      {/* 3. Category Rail */}
      <section className="relative z-10">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 ps-[var(--page-padding-x)] pe-4 lg:flex-wrap lg:overflow-visible lg:px-8 lg:py-4 lg:gap-4">
          {primaryCategories.map((cat) => (
            <CategoryPill
              key={cat.id}
              name={cat.name}
              emoji={cat.emoji}
              imageUrl={cat.imageUrl}
              href={`/products?category=${cat.slug}`}
            />
          ))}
        </div>
      </section>

      {/* 4. Hero Banner Carousel */}
      <PromoBannerCarousel banners={mockPromoBanners} />

      {/* 6. Welcome Offer Banner */}
      <WelcomeOfferBanner />

      {/* 6. Free Shipping Progress Bar */}
      <FreeShippingBar />

      {/* 7. Flash Deals */}
      <FlashDealsSection
        products={mockFlashDeals}
        endsAt={flashDealEndTime}
        onAddToCart={handleAddToCart}
      />

      {/* 8. Maximize Your Savings (F3) */}
      <MaxSavingsSection
        products={mockMaxSavings}
        onAddToCart={handleAddToCart}
      />

      {/* 9. Bento Category Promo Grid */}
      <BentoPromoGrid />

      {/* 10. Best Sellers Carousel */}
      <ProductCarousel
        title="Best Sellers"
        subtitle="Most loved by our customers"
        products={mockBestSellers.slice(0, 8)}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* 11. Sales in Bundles (F4) */}
      <BundleSection bundles={mockBundles} onAddBundle={handleAddBundle} />

      {/* 12. Order Again (F6) */}
      <OrderAgainSection onAddToCart={handleAddToCart} />

      {/* 13. Recommended For You (personalized) */}
      <ProductGrid
        title="Recommended For You"
        subtitle="Based on your profile & trending"
        products={recommendedProducts}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* 14. New Arrivals Carousel */}
      <ProductCarousel
        title="New Arrivals"
        subtitle="Just added to our catalog"
        products={mockProducts.slice(14, 20)}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* 15. Baby Brands (F7) */}
      <BabyBrandSection />

      {/* 16. You May Also Like */}
      <ProductGrid
        title="You May Also Like"
        products={mockProducts.slice(8, 16)}
        viewAllHref="/products"
        onAddToCart={handleAddToCart}
      />

      {/* 17. Health Tips / Blog Preview */}
      <section className="px-[var(--page-padding-x)] lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-sand-800 dark:text-foreground lg:text-xl">
              Health Tips
            </h2>
            <p className="mt-0.5 text-xs text-sand-500 dark:text-muted-foreground">
              Expert advice from our pharmacists
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold text-brand-600 dark:text-primary"
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
