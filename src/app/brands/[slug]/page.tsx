"use client";

import * as React from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Tag,
  Zap,
  Gift,
  ShoppingBag,
  Sparkles,
  Flame,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCarousel } from "@/components/commerce/ProductCarousel";
import { ProductCard } from "@/components/commerce/ProductCard";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { mockBrands } from "@/lib/data/brands";
import { allProducts } from "@/lib/data/products";

// Category → gradient & light bg mapping
const CATEGORY_THEMES: Record<
  string,
  { gradient: string; light: string; accent: string }
> = {
  skin: {
    gradient: "from-cyan-600 via-cyan-500 to-brand-400",
    light: "bg-cyan-50",
    accent: "text-cyan-700",
  },
  baby: {
    gradient: "from-sky-400 via-sky-300 to-cyan-200",
    light: "bg-sky-50",
    accent: "text-sky-700",
  },
  vit: {
    gradient: "from-amber-500 via-orange-400 to-yellow-400",
    light: "bg-amber-50",
    accent: "text-amber-700",
  },
  med: {
    gradient: "from-brand-700 via-brand-500 to-cyan-500",
    light: "bg-brand-50",
    accent: "text-brand-700",
  },
  hair: {
    gradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    light: "bg-fuchsia-50",
    accent: "text-fuchsia-700",
  },
  pc: {
    gradient: "from-violet-600 via-purple-500 to-indigo-400",
    light: "bg-violet-50",
    accent: "text-violet-700",
  },
  fa: {
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    light: "bg-emerald-50",
    accent: "text-emerald-700",
  },
  dent: {
    gradient: "from-sky-600 via-blue-500 to-indigo-400",
    light: "bg-sky-50",
    accent: "text-sky-700",
  },
};

// Sub-category labels for brand category tabs
const CATEGORY_LABELS: Record<string, string[]> = {
  skin: ["Moisturizers", "Cleansers", "Sun Care", "Serums", "Eye Care"],
  baby: ["Diapers", "Feeding", "Skincare", "Bath", "Health"],
  vit: ["Multivitamins", "Immunity", "Bone Health", "Energy", "Omega"],
  med: ["Pain Relief", "Cold & Flu", "Digestive", "Allergy", "First Aid"],
  hair: ["Shampoo", "Conditioner", "Treatment", "Styling", "Color"],
  pc: ["Bath & Body", "Deodorant", "Hand Care", "Oral Care", "Shaving"],
  fa: ["Antiseptic", "Bandages", "Thermometers", "Masks", "Sanitizers"],
  dent: ["Toothpaste", "Toothbrush", "Mouthwash", "Whitening", "Floss"],
};

// Taglines per brand (mock — in production these would come from CMS)
const BRAND_TAGLINES: Record<string, string> = {
  bioderma: "Dermatological skincare backed by biology",
  cerave: "Developed with dermatologists for all skin types",
  centrum: "The world's #1 multivitamin brand",
  "la-roche-posay": "Expert care for sensitive skin",
  loreal: "Because you're worth it",
  nivea: "Trusted skin care for over 100 years",
  "oral-b": "The dentist-recommended brand worldwide",
  panadol: "Trusted pain relief for the whole family",
  pampers: "Love, sleep & play — for every baby",
  "the-ordinary": "Clinical formulations with integrity",
  "natures-bounty": "Your trusted source for vitamins & supplements",
  neutrogena: "Dermatologist recommended skincare",
  garnier: "Green beauty powered by nature",
  dove: "Real beauty, real care",
  cetaphil: "Gentle skincare for sensitive skin",
  eucerin: "Medical skincare backed by science",
  vichy: "Health is beautiful",
  himalaya: "Herbal healthcare you can trust",
};

export default function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = React.useState(0);

  const brand = mockBrands.find((b) => b.slug === slug);

  if (!brand) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-[var(--page-padding-x)]">
        <p className="text-lg font-bold text-sand-700">Brand not found</p>
        <Link
          href="/brands"
          className="mt-2 text-sm text-brand-500 underline"
        >
          Browse all brands
        </Link>
      </div>
    );
  }

  // Theme
  const primaryCat = brand.categories[0] ?? "skin";
  const theme = CATEGORY_THEMES[primaryCat] ?? CATEGORY_THEMES.skin;
  const tagline = BRAND_TAGLINES[brand.slug] ?? `Shop ${brand.name} products`;
  const subCategories = CATEGORY_LABELS[primaryCat] ?? [];

  // Products
  const brandProducts = allProducts.filter((p) => p.brand === brand.name);
  const inStock = brandProducts.filter((p) => p.inStock);

  const bestSellers = [...inStock]
    .sort((a, b) => (b.soldCount ?? 0) - (a.soldCount ?? 0))
    .slice(0, 8);

  const onSale = inStock.filter(
    (p) => p.discountPercent && p.discountPercent > 0
  );

  const promoProducts = inStock.filter((p) => p.promotion);

  const newArrivals = [...inStock].slice(-6).reverse();

  const maxDiscount = onSale.reduce(
    (max, p) => Math.max(max, p.discountPercent ?? 0),
    0
  );

  // Products by price range
  const under100 = inStock.filter((p) => p.price < 100).slice(0, 6);
  const premium = inStock.filter((p) => p.price >= 300).slice(0, 6);

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

  return (
    <div className="flex flex-col gap-0 pb-32">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-[var(--page-padding-x)] py-3 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <ChevronLeft className="h-5 w-5 text-sand-600" />
        </button>
        <h1 className="flex-1 text-base font-semibold text-sand-800 truncate">
          {brand.name}
        </h1>
        <Link
          href="/search"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
        >
          <Search className="h-5 w-5 text-sand-600" />
        </Link>
      </div>

      {/* ── Hero Banner ── */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br px-[var(--page-padding-x)] pb-12 pt-6 lg:px-8",
          theme.gradient
        )}
      >
        <div className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute bottom-0 end-0 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute end-20 top-10 h-20 w-20 rounded-full bg-white/[0.07]" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-xl">
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
          <div className="flex-1 pt-1">
            <h2 className="text-2xl font-extrabold text-white drop-shadow">
              {brand.name}
            </h2>
            <p className="mt-1 text-[0.75rem] leading-snug text-white/80">
              {tagline}
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
                {brandProducts.length} products
              </span>
              {maxDiscount > 0 && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
                  Up to {maxDiscount}% Off
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      {subCategories.length > 0 && (
        <div className="bg-white pt-3 pb-2 shadow-sm">
          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide px-[var(--page-padding-x)] lg:px-8"
            style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <button
              onClick={() => setActiveTab(0)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.75rem] font-bold transition-all border",
                activeTab === 0
                  ? "bg-brand-700 text-white border-brand-700"
                  : "bg-white text-sand-600 border-sand-200"
              )}
            >
              All
            </button>
            {subCategories.slice(0, 5).map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveTab(i + 1)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.75rem] font-bold transition-all border",
                  activeTab === i + 1
                    ? "bg-brand-700 text-white border-brand-700"
                    : "bg-white text-sand-600 border-sand-200"
                )}
              >
                {cat}
              </button>
            ))}
            <div className="shrink-0 w-4" />
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-6">
        {/* ── Exclusive Offer Banner ── */}
        {maxDiscount > 0 && (
          <Link
            href={`/products?brand=${brand.slug}&sale=true&title=${encodeURIComponent(brand.name + " Sale")}`}
            className="group mx-[var(--page-padding-x)] block lg:mx-8"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl p-5 h-[180px] bg-gradient-to-br",
                theme.gradient
              )}
            >
              {/* Background product image */}
              {bestSellers[0] && (
                <div className="absolute end-0 bottom-0 top-0 w-[45%]">
                  <Image
                    src={bestSellers[0].imageUrl}
                    alt=""
                    fill
                    className="object-cover object-center opacity-30 mix-blend-luminosity"
                    sizes="200px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>
              )}
              {/* Foreground product */}
              {bestSellers[0] && (
                <div className="absolute end-4 bottom-2 top-4 w-[30%] z-[2]">
                  <Image
                    src={bestSellers[0].imageUrl}
                    alt={bestSellers[0].name}
                    fill
                    className="object-contain object-right-bottom drop-shadow-2xl"
                    sizes="140px"
                    unoptimized
                  />
                </div>
              )}
              <div className="absolute -end-12 -top-12 h-36 w-36 rounded-full bg-white/10" />
              <div className="relative z-10 flex h-full max-w-[55%] flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
                    Exclusive Offer
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white drop-shadow-lg">
                      {maxDiscount}%
                    </span>
                    <span className="text-lg font-bold text-white/90">OFF</span>
                  </div>
                  <p className="mt-1 text-xs text-white/80">
                    On select {brand.name} products
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-bold text-sand-800 shadow-lg transition-transform group-active:scale-95">
                  Shop Now
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* ── Best Sellers ── */}
        {bestSellers.length > 0 && (
          <ProductCarousel
            title="Best Sellers"
            kicker="Most popular"
            products={bestSellers}
            viewAllHref={`/products?brand=${brand.slug}&sort=best-selling&title=${encodeURIComponent(brand.name + " Best Sellers")}`}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* ── Most Loved Products — large feature cards with image + description ── */}
        {bestSellers.length >= 2 && (
          <section className="space-y-3">
            <div className="px-[var(--page-padding-x)] lg:px-8">
              <h2 className="text-lg font-bold text-sand-800">Most Loved Products</h2>
            </div>
            <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:px-8">
              {bestSellers.slice(0, 2).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-sand-50">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-300 group-active:scale-105"
                        sizes="(max-width: 768px) 45vw, 22vw"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 pt-10">
                      <p className="line-clamp-2 text-[0.65rem] font-medium leading-tight text-white/90">
                        {p.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">
                        {p.price} <span className="text-[0.55rem] font-normal text-white/70">EGP</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Targeted Solutions — collection cards with gradient overlay ── */}
        {subCategories.length >= 2 && (
          <section className="space-y-3">
            <div className="px-[var(--page-padding-x)] lg:px-8">
              <h2 className="text-lg font-bold text-sand-800">Targeted Solutions</h2>
              <p className="text-xs text-sand-500">Find the right {brand.name} line for your needs</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:px-8">
              {(() => {
                const solutions = [
                  { name: `${subCategories[0]} Line`, color: "from-slate-700 to-slate-900", img: bestSellers[0]?.imageUrl },
                  { name: `${subCategories[1]} Line`, color: "from-amber-700 to-amber-900", img: bestSellers[1]?.imageUrl },
                ];
                if (subCategories[2] && bestSellers[2]) {
                  solutions.push({ name: `${subCategories[2]} Line`, color: "from-cyan-700 to-cyan-900", img: bestSellers[2]?.imageUrl });
                }
                if (subCategories[3] && bestSellers[3]) {
                  solutions.push({ name: `${subCategories[3]} Line`, color: "from-rose-700 to-rose-900", img: bestSellers[3]?.imageUrl });
                }
                return solutions.map((sol) => (
                  <Link
                    key={sol.name}
                    href={`/products?brand=${brand.slug}&title=${encodeURIComponent(sol.name)}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl h-[160px]">
                      {sol.img && (
                        <Image
                          src={sol.img}
                          alt={sol.name}
                          fill
                          className="object-cover transition-transform duration-300 group-active:scale-105"
                          sizes="(max-width: 768px) 45vw, 22vw"
                          unoptimized
                        />
                      )}
                      <div className={cn("absolute inset-0 bg-gradient-to-t", sol.color, "opacity-60")} />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-sm font-extrabold uppercase tracking-wide text-white drop-shadow">
                          {sol.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </section>
        )}

        {/* ── Shop the Range — 2x2 visual category cards ── */}
        {subCategories.length >= 4 && (
          <section className="space-y-3">
            <div className="px-[var(--page-padding-x)] lg:px-8">
              <h2 className="text-lg font-bold text-sand-800">
                Shop the Range
              </h2>
              <p className="text-xs text-sand-500">
                Explore {brand.name} by category
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:px-8">
              {subCategories.slice(0, 4).map((cat, i) => {
                const overlays = [
                  "from-cyan-800 to-cyan-950",
                  "from-rose-800 to-rose-950",
                  "from-amber-800 to-amber-950",
                  "from-violet-800 to-violet-950",
                ];
                const catProduct = bestSellers[i];
                return (
                  <Link
                    key={cat}
                    href={`/products?brand=${brand.slug}&title=${encodeURIComponent(brand.name + " " + cat)}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-2xl h-[130px]">
                      {catProduct && (
                        <Image
                          src={catProduct.imageUrl}
                          alt={cat}
                          fill
                          className="object-cover transition-transform duration-300 group-active:scale-105"
                          sizes="(max-width: 768px) 45vw, 22vw"
                          unoptimized
                        />
                      )}
                      <div className={cn("absolute inset-0 bg-gradient-to-t opacity-65", overlays[i % overlays.length])} />
                      <div className="absolute inset-x-0 bottom-0 p-3.5">
                        <h3 className="text-sm font-extrabold text-white drop-shadow">
                          {cat}
                        </h3>
                        <span className="mt-1 inline-flex text-[0.6rem] font-semibold text-white/80">
                          Shop →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── On Sale ── */}
        {onSale.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-[var(--page-padding-x)] lg:px-8">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-bold text-sand-800">On Sale</h2>
              </div>
              <Link
                href={`/products?brand=${brand.slug}&sale=true&title=${encodeURIComponent(brand.name + " Deals")}`}
                className="text-sm font-semibold text-brand-500"
              >
                See All <ChevronRight className="inline h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:grid-cols-4 lg:px-8">
              {onSale.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout="grid"
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Expert Tips / Routine Banner ── */}
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 h-[160px]",
              theme.light
            )}
          >
            {/* Background product collage */}
            {bestSellers[1] && (
              <div className="absolute end-0 bottom-0 top-0 w-[40%]">
                <Image
                  src={bestSellers[1].imageUrl}
                  alt=""
                  fill
                  className="object-contain object-right-bottom opacity-20"
                  sizes="160px"
                  unoptimized
                />
              </div>
            )}
            <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-white/40" />
            <div className="relative z-10 flex h-full max-w-[65%] flex-col justify-between">
              <div>
                <span className={cn("text-[0.6rem] font-bold uppercase tracking-wider", theme.accent)}>
                  Expert Advice
                </span>
                <h3 className="mt-1 text-lg font-bold text-sand-800">
                  {brand.name} Care Routine
                </h3>
                <p className="mt-1 text-[0.65rem] text-sand-500 leading-relaxed">
                  Discover the perfect routine curated by {brand.name} experts
                </p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-sand-700 shadow-sm">
                  Morning
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-sand-700 shadow-sm">
                  Night
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-sand-700 shadow-sm">
                  Weekly
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand Stories / Blog ── */}
        <section className="space-y-3">
          <div className="px-[var(--page-padding-x)] lg:px-8">
            <h2 className="text-lg font-bold text-sand-800">
              From the {brand.name} Blog
            </h2>
            <p className="text-xs text-sand-500">Tips, guides & expert advice</p>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8">
            {[
              { title: `Best ${brand.name} Products for Beginners`, tag: "Guide", color: "from-rose-600 to-pink-500", img: bestSellers[0]?.imageUrl },
              { title: `How to Build a ${brand.name} Routine`, tag: "Tutorial", color: "from-cyan-600 to-blue-500", img: bestSellers[1]?.imageUrl },
              { title: `${brand.name}: Expert Review`, tag: "Review", color: "from-amber-600 to-orange-500", img: bestSellers[2]?.imageUrl },
            ].map((article) => (
              <Link
                key={article.title}
                href={`/blog?brand=${brand.slug}`}
                className="w-[70%] shrink-0 lg:w-[260px]"
              >
                <div className={cn("relative overflow-hidden rounded-2xl h-[140px]", `bg-gradient-to-br ${article.color}`)}>
                  {/* Background product image */}
                  {article.img && (
                    <div className="absolute end-0 bottom-0 top-0 w-[45%]">
                      <Image
                        src={article.img}
                        alt=""
                        fill
                        className="object-cover opacity-25 mix-blend-luminosity"
                        sizes="120px"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="absolute -end-6 -bottom-6 h-20 w-20 rounded-full bg-white/10" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-4">
                    <span className="inline-flex w-fit rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-bold text-white backdrop-blur-sm">
                      {article.tag}
                    </span>
                    <div>
                      <p className="line-clamp-2 text-sm font-bold text-white leading-tight drop-shadow">
                        {article.title}
                      </p>
                      <span className="mt-1.5 inline-flex text-[0.6rem] font-semibold text-white/80">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why Choose Brand ── */}
        <section className="px-[var(--page-padding-x)] lg:px-8">
          <div className="rounded-2xl border border-sand-100 bg-white p-5">
            <h3 className="text-base font-bold text-sand-800">
              Why {brand.name}?
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { icon: "🔬", label: "Clinically Tested" },
                { icon: "🌿", label: "Gentle Formula" },
                { icon: "💧", label: "Dermatologist Approved" },
              ].map((usp) => (
                <div
                  key={usp.label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="text-xl">{usp.icon}</span>
                  <span className="text-[0.6rem] font-semibold text-sand-600 leading-tight">
                    {usp.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOGO & Promotions ── */}
        {promoProducts.length > 0 && (
          <section className="space-y-3">
            <div className="px-[var(--page-padding-x)] lg:px-8">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-rose-500" />
                <h2 className="text-lg font-bold text-sand-800">
                  Deals & Offers
                </h2>
              </div>
            </div>
            {/* Horizontal promo cards */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:px-8">
              {promoProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="group w-[70%] shrink-0 lg:w-[260px]"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 h-[140px]",
                      theme.gradient
                    )}
                  >
                    <div className="absolute end-2 bottom-0 top-0 w-[35%]">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-contain object-right-bottom drop-shadow-lg"
                        sizes="100px"
                        unoptimized
                      />
                    </div>
                    <div className="relative z-10 max-w-[60%]">
                      {p.promotion && (
                        <span className="inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-bold text-white backdrop-blur-sm">
                          {p.promotion.badgeText}
                        </span>
                      )}
                      <p className="mt-1.5 line-clamp-2 text-xs font-bold text-white leading-tight">
                        {p.name}
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-white">
                        {p.price}{" "}
                        <span className="text-[0.6rem] font-normal text-white/70">
                          EGP
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Budget Picks ── */}
        {under100.length > 0 && (
          <ProductCarousel
            title="Under 100 EGP"
            kicker="Budget picks"
            products={under100}
            viewAllHref={`/products?brand=${brand.slug}&title=${encodeURIComponent(brand.name + " Under 100 EGP")}`}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* ── New Arrivals ── */}
        {newArrivals.length > 0 && (
          <ProductCarousel
            title="New Arrivals"
            kicker="Just in"
            products={newArrivals}
            viewAllHref={`/products?brand=${brand.slug}&sort=newest&title=${encodeURIComponent("New " + brand.name)}`}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* ── Premium Collection ── */}
        {premium.length > 0 && (
          <section className="space-y-3">
            <div className="px-[var(--page-padding-x)] lg:px-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-bold text-sand-800">
                  Premium Collection
                </h2>
              </div>
              <p className="text-xs text-sand-500">
                Invest in quality
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:grid-cols-4 lg:px-8">
              {premium.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  layout="grid"
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── All Products ── */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-[var(--page-padding-x)] lg:px-8">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-500" />
              <h2 className="text-lg font-bold text-sand-800">
                All Products
              </h2>
            </div>
            {brandProducts.length > 6 && (
              <Link
                href={`/products?brand=${brand.slug}&title=${encodeURIComponent("All " + brand.name)}`}
                className="text-sm font-semibold text-brand-500"
              >
                See All <ChevronRight className="inline h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5 px-[var(--page-padding-x)] lg:grid-cols-4 lg:px-8">
            {brandProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout="grid"
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
