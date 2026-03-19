"use client";

import Link from "next/link";
import { ChevronRight, ShoppingBag, Play } from "lucide-react";
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
import { TabbedPromoZone } from "@/components/commerce/TabbedPromoZone";
import {
  mockProducts,
  mockFlashDeals,
  mockBestSellers,
  mockBabyProducts,
  allProducts,
  getPersonalizedProducts,
} from "@/lib/data/products";
import { mockPromoBanners, mockPromoSections } from "@/lib/data/promotions";
import { mockBundles } from "@/lib/data/bundles";
import { mockBrands } from "@/lib/data/brands";
import { getPrimaryCategories } from "@/lib/categories";
import { useCart } from "@/hooks/useCart";
import { useUserProfile } from "@/hooks/useUserProfile";
import { BogoSheet } from "@/components/commerce/BogoSheet";
import * as React from "react";

// Category order for 2-row grid (4 per row)
const CATEGORY_ORDER = ["skin", "baby", "pc", "hair", "med", "vit", "fa", "dent"];

export default function HomePage() {
  const { addItem } = useCart();
  const { profile } = useUserProfile();
  const primaryCategories = getPrimaryCategories();

  // BOGO sheet state
  const [bogoOpen, setBogoOpen] = React.useState(false);
  const [bogoProduct, setBogoProduct] = React.useState<typeof allProducts[0] | null>(null);
  const [bogoEligible, setBogoEligible] = React.useState<typeof allProducts>([]);

  const recommendedProducts = getPersonalizedProducts(
    mockProducts.filter(p => p.inStock).slice(0, 12),
    profile
  ).slice(0, 8);

  // Check if a product qualifies for BOGO and show the sheet
  const checkBogo = React.useCallback((product: typeof allProducts[0]) => {
    if (
      product.promotion?.type === "mix-match" &&
      product.promotion.eligibleProductIds?.length
    ) {
      const eligible = product.promotion.eligibleProductIds
        .map((id) => allProducts.find((p) => p.id === id))
        .filter(Boolean) as typeof allProducts;
      if (eligible.length > 1) {
        setBogoProduct(product);
        setBogoEligible(eligible);
        // Small delay so variant sheet closes first
        setTimeout(() => setBogoOpen(true), 350);
      }
    }
  }, []);

  const handleAddToCart = (productId: string, skipAdd?: boolean) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      if (!skipAdd) {
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
      checkBogo(product);
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

  // Products grouped by category for zone sections (only in-stock on homepage)
  const skincareProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("skin") && p.inStock
  );
  const babyProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("baby") && p.inStock
  );
  const vitaminProducts = mockProducts.filter(
    (p) => p.categoryId?.startsWith("vit") && p.inStock
  );

  return (
    <div className="relative flex flex-col pb-6">
      <RamadanHeroBanner />

      <div className="relative z-[1] isolate flex flex-col gap-6">
        {/* 1. Banner + Categories combined section */}
        <section>
          <PromoBannerCarousel banners={mockPromoBanners} />
          {/* Categories: horizontal scrollable, below banner */}
          <div className="-mt-3 relative z-10 rounded-t-2xl bg-sand-50 pt-3 pb-1 px-[var(--page-padding-x)] lg:px-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-sand-600" />
                <span className="text-sm font-bold text-sand-800">Popular Categories</span>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-0.5 text-[0.65rem] font-semibold text-brand-500 transition-colors hover:text-brand-700"
              >
                See All
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-x-3 gap-y-2 pb-1 sm:grid-cols-6">
              {sortedCategories.slice(0, 12).map((cat) => (
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
          </div>
        </section>

        {/* 2. Daily Deals */}
        <FlashDealsSection
          products={mockFlashDeals.filter(p => p.inStock)}
          endsAt={flashDealEndTime}
          onAddToCart={handleAddToCart}
        />

        <ProfileCompletionAlert />

        {/* 3. Top Picks (Best Sellers) */}
        <ProductCarousel
          title="Best Sellers"
          kicker="Top picks"
          products={mockBestSellers.filter(p => p.inStock).slice(0, 8)}
          viewAllHref="/products?sort=best-selling&title=Best+Sellers"
          onAddToCart={handleAddToCart}
        />

        {/* 4. Order Again */}
        <OrderAgainSection onAddToCart={handleAddToCart} />

        {/* 5. Curated For You */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">Curated for you</h2>
            <p className="text-xs text-sand-500">Handpicked deals based on what&apos;s trending</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8">
            {[
              { title: "Up to 40% off", subtitle: "Hidden Gems", brands: "The Ordinary · ClayCo · Etude", gradient: "from-amber-600 to-amber-800", href: "/products?sale=true" },
              { title: "Buy 1 Get 1", subtitle: "BOGO Deals", brands: "Nivea · Garnier · L'Oreal", gradient: "from-brand-600 to-cyan-600", href: "/products?sale=true" },
              { title: "Under 100 EGP", subtitle: "Budget Finds", brands: "Panadol · Oral-B · Dove", gradient: "from-emerald-600 to-teal-700", href: "/products?sale=true" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative w-[75%] shrink-0 overflow-hidden rounded-2xl lg:w-[280px]"
              >
                <div className={`bg-gradient-to-br ${card.gradient} p-5 h-[180px] flex flex-col justify-between`}>
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
                      {card.title}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white">{card.subtitle}</h3>
                    <p className="mt-1 text-[0.65rem] text-white/70">{card.brands}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-sand-800 transition-transform group-active:scale-95">
                    Shop Now <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Deals & Offers */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">Deals & Offers</h2>
            <p className="text-xs text-sand-500">Exclusive savings across top categories</p>
          </div>
          <PromoDealBanners sections={[mockPromoSections[0]]} />
        </section>

        {/* BOGO — Buy One Get One Free */}
        <ProductCarousel
          title="Buy 1 Get 1 Free"
          kicker="Limited offers"
          products={mockProducts.filter((p) => p.quantityOffer && p.inStock).slice(0, 8)}
          viewAllHref="/products?sale=true&title=Buy+1+Get+1+Free"
          onAddToCart={handleAddToCart}
        />

        {/* 7. Shop by Brand */}
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
                  href={`/brands/${brand.slug}`}
                  className="flex w-20 shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center overflow-hidden rounded-[1.25rem] border border-brand-100 bg-white p-2.5 shadow-[0_10px_18px_rgba(16,34,76,0.08)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EBF0FF&color=1B3A6B&bold=true&size=128&font-size=0.4`;
                      }}
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

        {/* More Deals */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">More Savings</h2>
            <p className="text-xs text-sand-500">Don&apos;t miss these deals</p>
          </div>
          <PromoDealBanners sections={[mockPromoSections[1]]} />
        </section>

        {/* 8. Baby Care — tabbed promo zone */}
        <TabbedPromoZone
          title="Baby Time"
          categoryId="baby"
          products={[...mockProducts, ...mockBabyProducts].filter(p => p.categoryId?.startsWith("baby"))}
          heroImageUrl="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop"
          gradient="from-emerald-600 via-teal-500 to-cyan-500"
          onAddToCart={handleAddToCart}
        />

        {/* 9. Shop by Symptoms */}
        <SymptomSearchSection />

        {/* 10. Sales in Bundles */}
        <BundleSection bundles={mockBundles} onAddBundle={handleAddBundle} />

        {/* Wellness Mega Grid */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">Wellness Corner</h2>
            <p className="text-xs text-sand-500">Vitamins, supplements & more</p>
          </div>
          <PromoDealBanners sections={[mockPromoSections[2]]} layout="bento-6" />
        </section>

        {/* Video Content */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">Watch & Learn</h2>
            <p className="text-xs text-sand-500">Expert tips & product spotlights</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8">
            {[
              { title: "Morning Skincare Routine", duration: "2:30", category: "Skincare", thumb: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=500&fit=crop" },
              { title: "Baby Bath Time Tips", duration: "3:15", category: "Baby Care", thumb: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=500&fit=crop" },
              { title: "Vitamins Explained", duration: "4:00", category: "Wellness", thumb: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=500&fit=crop" },
              { title: "Hair Care Essentials", duration: "2:45", category: "Hair Care", thumb: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=500&fit=crop" },
            ].map((video) => (
              <div
                key={video.title}
                className="w-[60%] shrink-0 lg:w-[240px]"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-sand-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={video.thumb} alt={video.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play className="h-5 w-5 text-brand-700 ms-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[0.55rem] font-bold text-white backdrop-blur-sm">{video.category}</span>
                    <p className="mt-1 text-sm font-bold text-white line-clamp-2">{video.title}</p>
                    <span className="text-[0.65rem] text-white/70">{video.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Health Tips */}
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
                thumb: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=200&fit=crop",
              },
              {
                title: "Essential Vitamins for Energy",
                category: "Wellness",
                readTime: "5 min",
                thumb: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop",
              },
              {
                title: "Baby Care Tips for New Parents",
                category: "Baby Care",
                readTime: "4 min",
                thumb: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=200&fit=crop",
              },
            ].map((article) => (
              <div
                key={article.title}
                className="w-[74%] shrink-0 rounded-[1.25rem] border border-sand-200 bg-[linear-gradient(180deg,#fff,#fbfdff)] p-3 shadow-[0_12px_24px_rgba(16,34,76,0.08)] md:w-auto"
              >
                <div className="relative h-28 overflow-hidden rounded-xl bg-sand-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={article.thumb} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
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

      {/* BOGO mix-match sheet */}
      {bogoProduct && (
        <BogoSheet
          open={bogoOpen}
          onOpenChange={setBogoOpen}
          triggerProduct={bogoProduct}
          eligibleProducts={bogoEligible}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
