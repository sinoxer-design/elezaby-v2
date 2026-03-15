"use client";

import * as React from"react";
import Link from"next/link";
import { motion, AnimatePresence } from"framer-motion";
import { springGentle } from"@/lib/motion";
import { Gift, X, Copy, Check, Clock } from"lucide-react";
import { mockPersonalizedOffers, type PersonalizedOffer } from"@/lib/data/orders";
import { cn } from"@/lib/utils";

const SESSION_KEY ="elezaby-offer-count";
const MAX_OFFERS_PER_SESSION = 5;

export function PersonalizedOfferFAB() {
 const [visible, setVisible] = React.useState(false);
 const [offerOpen, setOfferOpen] = React.useState(false);
 const [currentOfferIndex, setCurrentOfferIndex] = React.useState(0);
 const [copied, setCopied] = React.useState(false);
 const [sessionCount, setSessionCount] = React.useState(0);

 const currentOffer =
 mockPersonalizedOffers[currentOfferIndex % mockPersonalizedOffers.length];

 // Show after 10s on mount
 React.useEffect(() => {
 const stored = sessionStorage.getItem(SESSION_KEY);
 const count = stored ? parseInt(stored, 10) : 0;
 setSessionCount(count);

 if (count >= MAX_OFFERS_PER_SESSION) return;

 const timer = setTimeout(() => setVisible(true), 10000);
 return () => clearTimeout(timer);
 }, []);

 const handleDismiss = () => {
 setOfferOpen(false);
 setVisible(false);

 const newCount = sessionCount + 1;
 setSessionCount(newCount);
 sessionStorage.setItem(SESSION_KEY, String(newCount));

 if (newCount >= MAX_OFFERS_PER_SESSION) return;

 // Reappear with next offer after 60s
 setTimeout(() => {
 setCurrentOfferIndex((prev) => prev + 1);
 setVisible(true);
 }, 60000);
 };

 const handleCopy = async () => {
 try {
 await navigator.clipboard.writeText(currentOffer.discountCode);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 } catch {
 // fallback
 }
 };

 if (!visible && !offerOpen) return null;

 return (
 <>
 {/* FAB Button */}
 <AnimatePresence>
 {visible && !offerOpen && (
 <motion.button
 initial={{ x: -80, opacity: 0 }}
 animate={{ x: 0, opacity: 1 }}
 exit={{ x: -80, opacity: 0 }}
 transition={springGentle}
 onClick={() => setOfferOpen(true)}
 className="fixed bottom-20 start-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-deal to-amber-500 text-white shadow-elevated"
 aria-label="View personalized offer"
 >
 {/* Pulsing ring */}
 <motion.div
 className="absolute inset-0 rounded-full bg-deal/30"
 animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
 transition={{ duration: 3, repeat: Infinity, ease:"easeInOut" }}
 />
 <Gift className="relative h-5 w-5" />
 </motion.button>
 )}
 </AnimatePresence>

 {/* Offer Card */}
 <AnimatePresence>
 {offerOpen && (
 <>
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
 onClick={handleDismiss}
 />

 {/* Card */}
 <motion.div
 initial={{ y: 100, opacity: 0, scale: 0.9 }}
 animate={{ y: 0, opacity: 1, scale: 1 }}
 exit={{ y: 100, opacity: 0, scale: 0.9 }}
 transition={springGentle}
 className="fixed bottom-24 start-4 z-50 w-72 overflow-hidden rounded-2xl bg-white shadow-elevated"
 >
 {/* Gradient Header */}
 <div
 className={cn(
"relative bg-gradient-to-r p-4 text-white",
 currentOffer.gradient
 )}
 >
 <button
 onClick={handleDismiss}
 className="absolute end-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
 aria-label="Close offer"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 <Gift className="h-6 w-6 mb-1" />
 <h3 className="text-base font-bold">{currentOffer.title}</h3>
 </div>

 {/* Body */}
 <div className="p-4">
 <p className="text-sm text-sand-600">
 {currentOffer.description}
 </p>

 {/* Promo Code */}
 <div className="mt-3 flex items-center gap-2">
 <div className="flex-1 rounded-lg border-2 border-dashed border-sand-300 bg-sand-50 px-3 py-2">
 <span className="font-mono text-sm font-bold tracking-wider text-brand-700">
 {currentOffer.discountCode}
 </span>
 </div>
 <button
 onClick={handleCopy}
 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white transition-colors hover:bg-brand-800"
 aria-label="Copy code"
 >
 {copied ? (
 <Check className="h-4 w-4" />
 ) : (
 <Copy className="h-4 w-4" />
 )}
 </button>
 </div>

 {/* Expiry */}
 <div className="mt-3 flex items-center gap-1.5 text-xs text-sand-400">
 <Clock className="h-3 w-3" />
 Expires in {currentOffer.expiresIn}
 </div>

 {/* Shop Now */}
 <Link
 href="/products?sale=true"
 onClick={handleDismiss}
 className="mt-3 flex h-10 w-full items-center justify-center rounded-lg bg-brand-700 text-sm font-bold text-white transition-colors hover:bg-brand-800"
 >
 Shop Now
 </Link>
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 </>
 );
}
