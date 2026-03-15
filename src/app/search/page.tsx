"use client";

import * as React from"react";
import { ProductCard } from"@/components/commerce/ProductCard";
import { Badge } from"@/components/ui/badge";
import { mockProducts } from"@/lib/data/products";
import { mockTrendingSearches, mockRecentSearches } from"@/lib/data/search";
import { useCart } from"@/hooks/useCart";
import { Search, Clock, TrendingUp, X, ScanBarcode } from"lucide-react";
import { cn } from"@/lib/utils";

export default function SearchPage() {
 const { addItem } = useCart();
 const [query, setQuery] = React.useState("");
 const [recentSearches, setRecentSearches] = React.useState(mockRecentSearches);
 const inputRef = React.useRef<HTMLInputElement>(null);

 React.useEffect(() => {
 inputRef.current?.focus();
 }, []);

 const filteredProducts = query.length > 0
 ? mockProducts.filter(
 (p) =>
 p.name.toLowerCase().includes(query.toLowerCase()) ||
 p.brand.toLowerCase().includes(query.toLowerCase())
 )
 : [];

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

 const handleSearch = (term: string) => {
 setQuery(term);
 if (!recentSearches.includes(term)) {
 setRecentSearches((prev) => [term, ...prev.slice(0, 4)]);
 }
 };

 return (
 <div className="flex flex-col">
 {/* Search Input */}
 <div className="sticky top-0 z-[49] bg-white border-b border-sand-200 pt-safe">
 <div className="flex items-center gap-2 px-[var(--page-padding-x)] py-3">
 <div className="relative flex-1">
 <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
 <input
 ref={inputRef}
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search medicines, health products..."
 className="w-full rounded-xl border border-sand-200 bg-sand-50 py-2.5 pe-9 ps-9 text-sm placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
 />
 {query && (
 <button
 onClick={() => setQuery("")}
 className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-sand-200"
 >
 <X className="h-3.5 w-3.5 text-sand-400" />
 </button>
 )}
 </div>
 <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sand-200 hover:bg-sand-50">
 <ScanBarcode className="h-5 w-5 text-sand-600" />
 </button>
 </div>
 </div>

 {/* No Query: Show Recent + Trending */}
 {!query && (
 <div className="px-[var(--page-padding-x)] py-4">
 {/* Recent Searches */}
 {recentSearches.length > 0 && (
 <div className="mb-6">
 <div className="flex items-center justify-between">
 <h3 className="text-sm font-semibold text-sand-700">
 Recent Searches
 </h3>
 <button
 onClick={() => setRecentSearches([])}
 className="text-xs font-medium text-brand-500 hover:underline"
 >
 Clear
 </button>
 </div>
 <div className="mt-2 space-y-1">
 {recentSearches.map((term) => (
 <button
 key={term}
 onClick={() => handleSearch(term)}
 className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-start transition-colors hover:bg-sand-50"
 >
 <Clock className="h-4 w-4 text-sand-400" />
 <span className="text-sm text-sand-600">{term}</span>
 </button>
 ))}
 </div>
 </div>
 )}

 {/* Trending Searches */}
 <div>
 <h3 className="text-sm font-semibold text-sand-700">Trending</h3>
 <div className="mt-2 flex flex-wrap gap-2">
 {mockTrendingSearches.map((term) => (
 <Badge
 key={term}
 variant="secondary"
 className="cursor-pointer px-3 py-1.5 text-xs hover:bg-sand-200"
 onClick={() => handleSearch(term)}
 >
 <TrendingUp className="me-1 h-3 w-3 text-brand-500" />
 {term}
 </Badge>
 ))}
 </div>
 </div>
 </div>
 )}

 {/* Search Results */}
 {query && filteredProducts.length > 0 && (
 <div className="px-[var(--page-padding-x)] py-4">
 <p className="mb-3 text-xs text-sand-400">
 {filteredProducts.length} results for &ldquo;{query}&rdquo;
 </p>
 <div className="grid grid-cols-2 gap-3">
 {filteredProducts.map((product) => (
 <ProductCard
 key={product.id}
 product={product}
 layout="grid"
 onAddToCart={handleAddToCart}
 />
 ))}
 </div>
 </div>
 )}

 {/* No Results */}
 {query && filteredProducts.length === 0 && (
 <div className="flex flex-col items-center gap-3 px-[var(--page-padding-x)] py-16">
 <Search className="h-12 w-12 text-sand-300" />
 <h3 className="text-lg font-semibold text-sand-700">
 No results found
 </h3>
 <p className="text-center text-sm text-sand-400">
 No products match &ldquo;{query}&rdquo;. Try a different search term.
 </p>

 <div className="mt-4 w-full">
 <h4 className="text-sm font-semibold text-sand-600">
 Popular Categories
 </h4>
 <div className="mt-2 flex flex-wrap gap-2">
 {["Medicines","Skincare","Vitamins","Baby Care"].map(
 (cat) => (
 <Badge
 key={cat}
 variant="secondary"
 className="cursor-pointer px-3 py-1.5 text-xs hover:bg-sand-200"
 onClick={() => handleSearch(cat)}
 >
 {cat}
 </Badge>
 )
 )}
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
