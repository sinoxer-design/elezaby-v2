"use client";

import Link from"next/link";
import { ChevronRight } from"lucide-react";
import { Button } from"@/components/ui/button";
import { CategoryPill } from"@/components/commerce/CategoryPill";
import { ProductCarousel } from"@/components/commerce/ProductCarousel";
import { PromoBannerCarousel } from"@/components/commerce/PromoBannerCarousel";
import { FlashDealsSection } from"@/components/commerce/FlashDealsSection";
import { ProductGrid } from"@/components/commerce/ProductGrid";
import { BentoPromoGrid } from"@/components/commerce/BentoPromoGrid";
import { FreeShippingBar } from"@/components/commerce/FreeShippingBar";
import { WelcomeOfferBanner } from"@/components/commerce/WelcomeOfferBanner";
import { ProfileCompletionAlert } from"@/components/commerce/ProfileCompletionAlert";
import { MaxSavingsSection } from"@/components/commerce/MaxSavingsSection";
import { BundleSection } from"@/components/commerce/BundleSection";
import { OrderAgainSection } from"@/components/commerce/OrderAgainSection";
import { BabyBrandSection } from"@/components/commerce/BabyBrandSection";
import { RamadanHeroBanner } from"@/components/commerce/RamadanHeroBanner";
import { SymptomSearchSection } from"@/components/commerce/SymptomSearchSection";
import {
 mockProducts,
 mockFlashDeals,
 mockBestSellers,
 mockPromoBanners,
 mockMaxSavings,
 mockBundles,
 mockBrands,
 allProducts,
 getPersonalizedProducts,
} from"@/lib/mock-data";
import { getPrimaryCategories } from"@/lib/categories";
import { useCart } from"@/hooks/useCart";
import { useUserProfile } from"@/hooks/useUserProfile";

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

 // Flash deal end time (shared across all flash deals)
 const flashDealEndTime =
 mockFlashDeals[0]?.flashDeal?.endsAt || new Date().toISOString();

 return (
 <div className="relative flex flex-col gap-5 pt-3 pb-6">
 {/* Ramadan atmospheric background — floating blue lanterns */}
 <RamadanHeroBanner />

 {/* All content sits above the lantern layer — isolate creates a stacking context */}
 <div className="relative z-[1] isolate flex flex-col gap-5">
 {/* 1. Category Rail */}
 <section className="relative z-10">
 <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 ps-[var(--page-padding-x)] pe-4 lg:flex-wrap lg:overflow-visible lg:px-8 lg:py-4 lg:gap-5">
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

 {/* 2. Hero Banner Carousel */}
 <PromoBannerCarousel banners={mockPromoBanners} />

 {/* 3. Search by Symptoms */}
 <SymptomSearchSection />

 {/* 4. Shop by Brand */}
 <section className="px-[var(--page-padding-x)] lg:px-8">
 <div className="flex items-end justify-between mb-3">
 <h2 className="font-display text-lg font-bold text-sand-800 lg:text-xl">
 Shop by Brand
 </h2>
 <Button variant="ghost" size="sm" className="text-xs font-semibold text-brand-600" asChild>
 <Link href="/brands">
 See All
 <ChevronRight className="ms-0.5 h-3.5 w-3.5" />
 </Link>
 </Button>
 </div>
 <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 pe-4 lg:flex-wrap lg:overflow-visible lg:gap-5">
 {mockBrands.filter((b) => b.featured).concat(mockBrands.filter((b) => !b.featured)).slice(0, 10).map((brand) => (
 <Link key={brand.slug} href={`/products?brand=${brand.slug}`} className="flex shrink-0 flex-col items-center gap-1.5 w-20">
 <div className="overflow-hidden rounded-full border-2 border-brand-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] h-[4.5rem] w-[4.5rem]">
 <img
 src={`https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EBF0FF&color=1B3A6B&bold=true&size=128&font-size=0.4`}
 alt={brand.name}
 className="h-full w-full object-cover"
 />
 </div>
 <span className="w-full text-center text-[0.6875rem] font-medium leading-tight text-sand-600 line-clamp-2">
 {brand.name}
 </span>
 </Link>
 ))}
 </div>
 </section>

 {/* 5. Profile Completion Alert (moved lower) */}
 <ProfileCompletionAlert />

 {/* 5. Free Shipping Progress Bar */}
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
 <h2 className="font-display text-lg font-bold text-sand-800 lg:text-xl">
 Health Tips
 </h2>
 <p className="mt-0.5 text-xs text-sand-500">
 Expert advice from our pharmacists
 </p>
 </div>
 <Button
 variant="ghost"
 size="sm"
 className="text-xs font-semibold text-brand-600"
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
 title:"Summer Skincare Guide",
 category:"Skincare",
 readTime:"3 min",
 },
 {
 title:"Essential Vitamins for Energy",
 category:"Wellness",
 readTime:"5 min",
 },
 {
 title:"Baby Care Tips for New Parents",
 category:"Baby Care",
 readTime:"4 min",
 },
 ].map((article) => (
 <div
 key={article.title}
 className="w-[70%] shrink-0 rounded-lg border border-sand-200 bg-white p-3 md:w-auto"
 >
 <div className="h-28 rounded-md bg-sand-100" />
 <span className="mt-2 inline-block text-[0.625rem] font-semibold uppercase text-brand-600">
 {article.category}
 </span>
 <h3 className="mt-0.5 text-sm font-semibold text-sand-700">
 {article.title}
 </h3>
 <span className="text-xs text-sand-400">
 {article.readTime} read
 </span>
 </div>
 ))}
 </div>
 </section>
 </div>{/* end content z-[1] wrapper */}
 </div>
 );
}
