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
import { mockProducts, mockFlashDeals, mockBabyProducts } from"@/lib/data/products";
import { useCart } from"@/hooks/useCart";
import { ProductCard } from"@/components/commerce/ProductCard";
import { VariantSelector } from"@/components/commerce/VariantSelector";
import PromoSection from"@/components/commerce/PromoSection";
import { StoreAvailability } from"@/components/commerce/StoreAvailability";
import {
 ChevronLeft,
 Share2,
 Heart,
 MapPin,
 ChevronDown,
 ChevronUp,
} from"lucide-react";
import { cn } from"@/lib/utils";

export default function ProductDetailPage() {
 const params = useParams();
 const slug = params.slug as string;
 const { addItem } = useCart();
 const [quantity, setQuantity] = React.useState(1);
 const [isWishlisted, setIsWishlisted] = React.useState(false);
 const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
  new Set(["description", "specs", "ingredients"])
 );
 const [prescriptionOpen, setPrescriptionOpen] = React.useState(false);
 const [notifyOpen, setNotifyOpen] = React.useState(false);
 const [selectedVariant, setSelectedVariant] = React.useState("");

 const product = [...mockProducts, ...mockFlashDeals, ...mockBabyProducts].find((p) => p.id === slug);

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
 setExpandedSections((prev) => {
   const next = new Set(prev);
   if (next.has(section)) next.delete(section);
   else next.add(section);
   return next;
 });
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
 <h1 className="mt-0.5 font-display text-xl font-bold text-sand-800 lg:text-2xl">
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

 {/* Variant Selector */}
 {product.variants && product.variants.length > 0 && (
 <div>
 <p className="mb-2 text-xs font-semibold text-sand-500">
 {product.variants[0].variantType === "color" ? "Select Color:" : product.variants[0].variantType === "size" ? "Select Size:" : "Select Count:"}
 </p>
 <VariantSelector
 variants={product.variants}
 selectedId={selectedVariant || product.variants.find(v => v.priceDelta === 0)?.id || product.variants[0].id}
 onSelect={setSelectedVariant}
 />
 </div>
 )}

 {/* Promotion Section */}
 {product.promotion ? (
 <PromoSection
 promotion={product.promotion}
 currentQty={quantity}
 />
 ) : product.quantityOffer ? (
 <div className="rounded-lg bg-brand-50 p-3">
 <span className="text-sm font-medium text-brand-700">
 {product.quantityOffer}
 </span>
 </div>
 ) : null}

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
 <StoreAvailability inStock={product.inStock} />

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
 {expandedSections.has(section.id) ? (
 <ChevronUp className="h-4 w-4 text-sand-400" />
 ) : (
 <ChevronDown className="h-4 w-4 text-sand-400" />
 )}
 </button>
 {expandedSections.has(section.id) && (
 <p className="pb-3 text-sm leading-relaxed text-sand-500">
 {section.content}
 </p>
 )}
 </div>
 ))}
 </div>
 </div>

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
 <ProductCard
 key={p.id}
 product={p}
 layout="grid"
 onAddToCart={(id) => {
 const item = mockProducts.find((m) => m.id === id);
 if (item) addItem({ ...item });
 }}
 />
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
 title="You May Also Like"
 products={mockProducts.slice(5, 10)}
 viewAllHref="/products"
 onAddToCart={(id) => {
 const p = mockProducts.find((p) => p.id === id);
 if (p) addItem({ ...p });
 }}
 />
 <ProductCarousel
 title="Complete Your Purchase"
 products={mockProducts.slice(3, 8)}
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
