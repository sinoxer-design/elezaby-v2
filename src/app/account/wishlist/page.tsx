"use client";

import Link from"next/link";
import { ChevronLeft, Heart } from"lucide-react";
import { ProductCard } from"@/components/commerce/ProductCard";
import { mockProducts } from"@/lib/data/products";

const wishlistProducts = [mockProducts[0], mockProducts[2], mockProducts[4]];

export default function WishlistPage() {
 return (
 <div className="flex flex-col gap-4 px-[var(--page-padding-x)] py-4">
 {/* Header */}
 <div className="flex items-center gap-3">
 <Link
 href="/account"
 className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-sand-100"
 >
 <ChevronLeft className="h-5 w-5 text-sand-600" />
 </Link>
 <h1 className="text-lg font-semibold text-sand-800">My Wishlist</h1>
 <span className="ml-auto text-sm text-sand-400">
 {wishlistProducts.length} items
 </span>
 </div>

 {/* Wishlist Grid */}
 {wishlistProducts.length > 0 ? (
 <div className="grid grid-cols-2 gap-3">
 {wishlistProducts.map((product) => (
 <ProductCard key={product.id} product={product} />
 ))}
 </div>
 ) : (
 /* Empty State */
 <div className="flex flex-col items-center justify-center gap-3 py-16">
 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-100">
 <Heart className="h-8 w-8 text-sand-300" />
 </div>
 <h2 className="text-base font-semibold text-sand-700">
 Your wishlist is empty
 </h2>
 <p className="text-center text-sm text-sand-400">
 Save items you love to find them easily later.
 </p>
 <Link
 href="/"
 className="mt-2 text-sm font-semibold text-brand-500 transition-colors hover:text-brand-600"
 >
 Browse Products
 </Link>
 </div>
 )}
 </div>
 );
}
