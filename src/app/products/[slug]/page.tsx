"use client";

import * as React from"react";
import Image from"next/image";
import Link from"next/link";
import { useParams } from"next/navigation";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { AspectRatio } from"@/components/ui/aspect-ratio";
import { PriceBlock } from"@/components/commerce/PriceBlock";
import { CTAButton } from"@/components/commerce/CTAButton";
import { QuantitySelector } from"@/components/commerce/QuantitySelector";
import { ProductCarousel } from"@/components/commerce/ProductCarousel";
import { PrescriptionDialog } from"@/components/commerce/PrescriptionDialog";
import { NotifyMeDialog } from"@/components/commerce/NotifyMeDialog";
import { mockProducts } from"@/lib/mock-data";
import { useCart } from"@/hooks/useCart";
import { ProductCard } from"@/components/commerce/ProductCard";
import {
 ChevronLeft,
 Share2,
 Heart,
 MapPin,
 ChevronDown,
 ChevronUp,
 Star,
 ArrowUpRight,
} from"lucide-react";
import { cn } from"@/lib/utils";

const mockReviews = [
 {
 id:"1",
 author:"Sarah M.",
 rating: 5,
 comment:"Great product, fast delivery!",
 date:"2 days ago",
 },
 {
 id:"2",
 author:"Ahmed K.",
 rating: 4,
 comment:"Good quality but packaging could be better",
 date:"1 week ago",
 },
 {
 id:"3",
 author:"Mona R.",
 rating: 5,
 comment:"Been using this for months, highly recommend",
 date:"2 weeks ago",
 },
];

const ratingBreakdown = [
 { stars: 5, percent: 65 },
 { stars: 4, percent: 20 },
 { stars: 3, percent: 8 },
 { stars: 2, percent: 4 },
 { stars: 1, percent: 3 },
];

export default function ProductDetailPage() {
 const params = useParams();
 const slug = params.slug as string;
 const { addItem } = useCart();
 const [quantity, setQuantity] = React.useState(1);
 const [isWishlisted, setIsWishlisted] = React.useState(false);
 const [expandedSection, setExpandedSection] = React.useState<string | null>(
"description"
 );
 const [prescriptionOpen, setPrescriptionOpen] = React.useState(false);
 const [notifyOpen, setNotifyOpen] = React.useState(false);

 const product = mockProducts.find((p) => p.id === slug);

 if (!product) {
 return (
 <div className="flex flex-col items-center justify-center gap-4 px-[var(--page-padding-x)] py-20 max-w-lg mx-auto">
 <h1 className="font-display text-2xl text-sand-800">
 Product not found
 </h1>
 <p className="text-sm text-sand-500">
 The product you are looking for does not exist or has been removed.
 </p>
 <Button variant="outline" asChild>
 <Link href="/products">Browse All Products</Link>
 </Button>
 </div>
 );
 }

 const handleAddToCart = () => {
 addItem(
 {
 id: product.id,
 name: product.name,
 brand: product.brand,
 imageUrl: product.imageUrl,
 price: product.price,
 originalPrice: product.originalPrice,
 },
 quantity
 );
 };

 const toggleSection = (section: string) => {
 setExpandedSection((prev) => (prev === section ? null : section));
 };

 return (
 <div className="flex flex-col pb-6 lg:px-8">
 {/* PDP Header */}
 <div className="sticky top-[var(--header-collapsed-height)] z-[49] flex items-center justify-between bg-white/95 px-[var(--page-padding-x)] py-2 backdrop-blur-sm lg:px-0">
 <Button variant="ghost" size="icon-sm" asChild>
 <Link href="/products">
 <ChevronLeft className="h-5 w-5 text-sand-600" />
 </Link>
 </Button>
 <div className="flex gap-1">
 <Button variant="ghost" size="icon-sm">
 <Share2 className="h-5 w-5 text-sand-600" />
 </Button>
 <Button
 variant="ghost"
 size="icon-sm"
 onClick={() => setIsWishlisted(!isWishlisted)}
 >
 <Heart
 className={cn(
"h-5 w-5",
 isWishlisted
 ?"fill-discount text-discount"
 :"text-sand-600"
 )}
 />
 </Button>
 </div>
 </div>

 {/* Side-by-side at md+ */}
 <div className="md:flex md:gap-8 md:items-start px-[var(--page-padding-x)] lg:px-0">
 {/* Left: Image Gallery */}
 <div className="md:w-1/2 md:shrink-0 md:sticky md:top-[calc(var(--header-collapsed-height)+3rem)]">
 <AspectRatio ratio={1} className="rounded-xl bg-sand-50">
 <Image
 src={product.imageUrl}
 alt={product.name}
 fill
 className="object-contain p-8"
 />
 {product.badges && product.badges.length > 0 && (
 <div className="absolute start-3 top-3 flex flex-col gap-1">
 {product.badges.map((badge, i) => (
 <Badge key={i} variant={badge.variant}>
 {badge.label}
 </Badge>
 ))}
 </div>
 )}
 </AspectRatio>
 {/* Gallery dots */}
 <div className="mt-3 flex justify-center gap-1.5">
 {[0, 1, 2, 3].map((i) => (
 <div
 key={i}
 className={cn(
"h-1.5 rounded-full transition-all",
 i === 0 ?"w-4 bg-brand-500" :"w-1.5 bg-sand-300"
 )}
 />
 ))}
 </div>
 </div>

 {/* Right: Product Info */}
 <div className="mt-4 space-y-4 md:flex-1 md:mt-0">
 {/* Brand & Name */}
 <div>
 <span className="text-xs font-medium uppercase tracking-wide text-brand-500">
 {product.brand}
 </span>
 <h1 className="mt-0.5 font-display text-xl text-sand-800 lg:text-2xl">
 {product.name}
 </h1>
 <span className="text-xs text-sand-400">SKU: EZ-{product.id}0042</span>
 </div>

 {/* Price Block */}
 <PriceBlock
 price={product.price}
 originalPrice={product.originalPrice}
 discountPercent={product.discountPercent}
 size="lg"
 />

 {/* Quantity Offer */}
 {product.quantityOffer && (
 <div className="rounded-lg bg-brand-50 p-3">
 <span className="text-sm font-medium text-brand-700">
 {product.quantityOffer}
 </span>
 </div>
 )}

 {/* Quantity Selector */}
 <div className="flex items-center gap-4">
 <span className="text-sm font-medium text-sand-600">Quantity:</span>
 <QuantitySelector
 value={quantity}
 min={1}
 max={5}
 onChange={setQuantity}
 />
 </div>

 {/* Primary CTA */}
 <CTAButton
 inStock={product.inStock}
 hasVariants={product.hasVariants}
 requiresPrescription={product.requiresPrescription}
 onAddToCart={() => {
 if (product.requiresPrescription) {
 setPrescriptionOpen(true);
 } else {
 handleAddToCart();
 }
 }}
 onNotifyMe={() => setNotifyOpen(true)}
 onOptions={() => {}}
 size="pdp-cta"
 />

 {/* Store Availability */}
 <div className="rounded-lg border border-sand-200 p-3">
 <div className="flex items-center gap-2">
 <MapPin className="h-4 w-4 text-sand-400" />
 <span className="text-sm font-medium text-sand-700">
 Check Store Availability
 </span>
 </div>
 <div className="mt-2 flex gap-2">
 <input
 type="text"
 placeholder="Enter zip code"
 className="flex-1 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
 />
 <Button variant="outline" size="sm">
 Check
 </Button>
 </div>
 </div>

 {/* Accordion Sections */}
 {[
 {
 id:"description",
 title:"Description",
 content:
"Fast-acting pain relief tablets suitable for headaches, toothaches, cold and flu symptoms, and general aches and pains. Contains 500mg paracetamol and 65mg caffeine for enhanced pain relief.",
 },
 {
 id:"specs",
 title:"Specifications",
 content:
"Active Ingredient: Paracetamol 500mg, Caffeine 65mg. Pack Size: 24 tablets. Dosage: Adults and children over 12: 1-2 tablets every 4-6 hours. Max 8 tablets in 24 hours.",
 },
 {
 id:"ingredients",
 title:"Ingredients",
 content:
"Paracetamol, Caffeine, Maize Starch, Potassium Sorbate, Purified Talc, Stearic Acid, Povidone, Sodium Lauryl Sulfate, Microcrystalline Cellulose.",
 },
 ].map((section) => (
 <div
 key={section.id}
 className="border-b border-sand-100 last:border-0"
 >
 <button
 onClick={() => toggleSection(section.id)}
 className="flex w-full items-center justify-between py-3 text-sm font-semibold text-sand-700"
 >
 {section.title}
 {expandedSection === section.id ? (
 <ChevronUp className="h-4 w-4 text-sand-400" />
 ) : (
 <ChevronDown className="h-4 w-4 text-sand-400" />
 )}
 </button>
 {expandedSection === section.id && (
 <p className="pb-3 text-sm leading-relaxed text-sand-500">
 {section.content}
 </p>
 )}
 </div>
 ))}
 </div>
 </div>

 {/* Reviews & Ratings Section */}
 <section className="mt-6 px-[var(--page-padding-x)] lg:px-0">
 <h2 className="font-display text-lg text-sand-800 lg:text-xl">
 Reviews & Ratings
 </h2>

 {/* Overall Rating */}
 <div className="mt-3 flex items-start gap-4">
 <div className="flex flex-col items-center">
 <span className="text-4xl font-bold text-sand-800">4.2</span>
 <div className="mt-1 flex">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 className={cn(
"h-4 w-4",
 i < 4
 ?"fill-warning text-warning"
 :"fill-sand-200 text-sand-200"
 )}
 />
 ))}
 </div>
 <span className="mt-0.5 text-xs text-sand-400">(128 reviews)</span>
 </div>

 {/* Rating Breakdown */}
 <div className="flex-1 space-y-1.5">
 {ratingBreakdown.map((row) => (
 <div key={row.stars} className="flex items-center gap-2">
 <span className="w-3 text-xs font-medium text-sand-500">
 {row.stars}
 </span>
 <Star className="h-3 w-3 fill-warning text-warning" />
 <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand-100">
 <div
 className="h-full rounded-full bg-warning transition-all"
 style={{ width: `${row.percent}%` }}
 />
 </div>
 <span className="w-8 text-end text-xs text-sand-400">
 {row.percent}%
 </span>
 </div>
 ))}
 </div>
 </div>

 {/* Review Cards */}
 <div className="mt-4 space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
 {mockReviews.map((review) => (
 <div
 key={review.id}
 className="rounded-lg border border-sand-100 bg-white p-3"
 >
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
 {review.author.charAt(0)}
 </div>
 <span className="text-sm font-semibold text-sand-700">
 {review.author}
 </span>
 </div>
 <span className="text-xs text-sand-400">{review.date}</span>
 </div>
 <div className="mt-1.5 flex">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star
 key={i}
 className={cn(
"h-3 w-3",
 i < review.rating
 ?"fill-warning text-warning"
 :"fill-sand-200 text-sand-200"
 )}
 />
 ))}
 </div>
 <p className="mt-1.5 text-sm leading-relaxed text-sand-500">
 {review.comment}
 </p>
 </div>
 ))}
 </div>

 {/* Review Actions */}
 <div className="mt-4 flex items-center gap-3">
 <Button variant="outline" size="sm" className="flex-1">
 Write a Review
 </Button>
 <Button variant="link" size="sm" className="text-xs">
 See All Reviews
 <ArrowUpRight className="ms-0.5 h-3 w-3" />
 </Button>
 </div>
 </section>

 {/* Out of Stock Alternatives */}
 {!product.inStock && (
 <section className="mt-6">
 <div className="px-[var(--page-padding-x)] lg:px-0">
 <h2 className="font-display text-lg text-sand-800">
 Similar Products You Might Like
 </h2>
 <p className="mt-0.5 text-xs text-sand-500">
 Available alternatives for this product
 </p>
 </div>
 <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-hide ps-[var(--page-padding-x)] pe-4 lg:ps-0 lg:pe-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
 {mockProducts
 .filter((p) => p.id !== product.id && p.inStock)
 .slice(0, 4)
 .map((p) => (
 <div key={p.id} className="w-[42%] shrink-0 lg:w-auto">
 <ProductCard
 product={p}
 layout="grid"
 onAddToCart={(id) => {
 const item = mockProducts.find((m) => m.id === id);
 if (item) addItem({ ...item });
 }}
 />
 </div>
 ))}
 </div>
 </section>
 )}

 {/* Upsell Section - Upgrade Your Choice */}
 <section className="mt-6 px-[var(--page-padding-x)] lg:px-0">
 <h2 className="font-display text-lg text-sand-800">
 Upgrade Your Choice
 </h2>
 <p className="mt-0.5 text-xs text-sand-500">
 Premium alternatives in this category
 </p>
 <div className="mt-3 grid grid-cols-2 gap-3">
 {mockProducts
 .filter(
 (p) =>
 p.id !== product.id &&
 p.inStock &&
 p.price > product.price
 )
 .slice(0, 2)
 .map((p) => (
 <div
 key={p.id}
 className="relative overflow-hidden rounded-xl border border-sand-200 bg-white"
 >
 <div className="absolute end-2 top-2 z-10">
 <Badge className="border-transparent bg-brand-500 text-white">
 Upgrade
 </Badge>
 </div>
 <div className="aspect-square bg-sand-50 p-4">
 <Image
 src={p.imageUrl}
 alt={p.name}
 width={200}
 height={200}
 className="h-full w-full object-contain"
 />
 </div>
 <div className="p-3">
 <h3 className="line-clamp-2 text-sm font-semibold text-sand-700">
 {p.name}
 </h3>
 <PriceBlock
 price={p.price}
 originalPrice={p.originalPrice}
 discountPercent={p.discountPercent}
 className="mt-1.5"
 />
 <Button
 variant="add-to-cart"
 size="card-cta"
 className="mt-2"
 onClick={() => addItem({ ...p })}
 >
 Choose This
 </Button>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Bundle Section */}
 <section className="mt-6 px-[var(--page-padding-x)] lg:px-0">
 <h2 className="font-display text-lg text-sand-800">
 Frequently Bought Together
 </h2>
 <div className="mt-3 rounded-lg border border-sand-200 p-3 bg-white">
 <div className="flex items-center gap-3">
 <div className="flex -space-x-2">
 {mockProducts.slice(0, 3).map((p) => (
 <div
 key={p.id}
 className="h-14 w-14 rounded-lg border-2 border-white bg-sand-50"
 >
 <Image
 src={p.imageUrl}
 alt={p.name}
 width={56}
 height={56}
 className="h-full w-full object-contain p-1"
 />
 </div>
 ))}
 </div>
 <div className="flex-1">
 <span className="text-sm font-semibold text-sand-700">
 Bundle: 3 items
 </span>
 <div className="flex items-baseline gap-1">
 <span className="font-mono text-base font-bold text-brand-600">
 450.00
 </span>
 <span className="text-[0.625rem] text-sand-400">EGP</span>
 <span className="text-xs text-brand-600">Save 20%</span>
 </div>
 </div>
 </div>
 <Button
 variant="add-to-cart"
 size="card-cta"
 className="mt-3"
 >
 Add Bundle to Cart
 </Button>
 </div>
 </section>

 {/* Cross-sell Carousels */}
 <div className="mt-6 space-y-6">
 <ProductCarousel
 title="Complete Your Purchase"
 products={mockProducts.slice(3, 8)}
 viewAllHref="/products"
 onAddToCart={(id) => {
 const p = mockProducts.find((p) => p.id === id);
 if (p) addItem({ ...p });
 }}
 />
 <ProductCarousel
 title="You May Also Like"
 products={mockProducts.slice(5, 10)}
 viewAllHref="/products"
 onAddToCart={(id) => {
 const p = mockProducts.find((p) => p.id === id);
 if (p) addItem({ ...p });
 }}
 />
 </div>

 {/* Prescription & Notify Dialogs */}
 <PrescriptionDialog
 open={prescriptionOpen}
 onOpenChange={setPrescriptionOpen}
 productName={product.name}
 onSubmit={() => {
 setPrescriptionOpen(false);
 handleAddToCart();
 }}
 />

 <NotifyMeDialog
 open={notifyOpen}
 onOpenChange={setNotifyOpen}
 productName={product.name}
 onSubmit={() => {}}
 />
 </div>
 );
}
