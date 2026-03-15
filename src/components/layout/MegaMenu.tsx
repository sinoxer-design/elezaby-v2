"use client";

import * as React from"react";
import Link from"next/link";
import { motion, AnimatePresence } from"framer-motion";
import { easeDecelerate } from"@/lib/motion";
import { cn } from"@/lib/utils";
import { getPrimaryCategories, getChildren } from"@/lib/categories";

interface MegaMenuProps {
 open: boolean;
 onClose: () => void;
 onMouseEnter: () => void;
 onMouseLeave: () => void;
}

export function MegaMenu({ open, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
 const primaryCategories = getPrimaryCategories();
 const [hoveredPrimary, setHoveredPrimary] = React.useState(primaryCategories[0]?.id ??"");

 const subCategories = React.useMemo(
 () => getChildren(hoveredPrimary),
 [hoveredPrimary]
 );

 // Close on Escape
 React.useEffect(() => {
 if (!open) return;
 const handler = (e: KeyboardEvent) => {
 if (e.key ==="Escape") onClose();
 };
 document.addEventListener("keydown", handler);
 return () => document.removeEventListener("keydown", handler);
 }, [open, onClose]);

 return (
 <AnimatePresence>
 {open && (
 <>
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.15 }}
 className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-[1px]"
 style={{ top:"var(--header-height-desktop)" }}
 onClick={onClose}
 />

 {/* Dropdown panel */}
 <motion.div
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -8 }}
 transition={{ duration: 0.2, ease: easeDecelerate }}
 className="fixed start-1/2 z-[100] w-[calc(100vw-4rem)] max-w-4xl -translate-x-1/2 overflow-hidden rounded-xl border border-sand-200 bg-white shadow-elevated"
 style={{ top:"var(--header-height-desktop)" }}
 onMouseEnter={onMouseEnter}
 onMouseLeave={onMouseLeave}
 >
 <div className="flex">
 {/* Left: Primary categories list */}
 <div className="w-52 shrink-0 border-e border-sand-100 bg-sand-50 p-2">
 {primaryCategories.map((cat) => (
 <button
 key={cat.id}
 onMouseEnter={() => setHoveredPrimary(cat.id)}
 className={cn(
"flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-start text-sm transition-colors",
 hoveredPrimary === cat.id
 ?"bg-white font-semibold text-brand-600 shadow-sm"
 :"text-sand-600 hover:bg-white/60"
 )}
 >
 <span className="text-base">{cat.emoji}</span>
 <span>{cat.name}</span>
 </button>
 ))}
 </div>

 {/* Right: Sub-categories grid */}
 <div className="flex-1 p-4">
 <AnimatePresence mode="wait">
 <motion.div
 key={hoveredPrimary}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 transition={{ duration: 0.15 }}
 className="grid grid-cols-3 gap-2"
 >
 {subCategories.map((sub) => (
 <Link
 key={sub.id}
 href={`/products?category=${sub.slug}`}
 onClick={onClose}
 className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm transition-colors hover:bg-sand-50"
 >
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand-100">
 <span className="text-base">{sub.emoji}</span>
 </div>
 <div className="min-w-0">
 <p className="truncate text-sm font-medium text-sand-700">{sub.name}</p>
 <p className="text-[11px] text-sand-400">{sub.productCount} products</p>
 </div>
 </Link>
 ))}
 {subCategories.length === 0 && (
 <p className="col-span-3 py-8 text-center text-sm text-sand-400">
 Coming soon
 </p>
 )}
 </motion.div>
 </AnimatePresence>

 {/* View all link */}
 <div className="mt-3 border-t border-sand-100 pt-3">
 <Link
 href="/categories"
 onClick={onClose}
 className="text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
 >
 Browse all categories →
 </Link>
 </div>
 </div>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}
