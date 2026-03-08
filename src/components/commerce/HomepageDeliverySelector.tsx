"use client";

import { motion, AnimatePresence } from"framer-motion";
import { Truck, Store, Clock, MapPin } from"lucide-react";
import { useDeliveryContext } from"@/hooks/useDeliveryContext";
import { cn } from"@/lib/utils";

export function HomepageDeliverySelector() {
 const { deliveryMethod, setDeliveryMethod } = useDeliveryContext();

 return (
 <section className="relative z-10 px-[var(--page-padding-x)] lg:px-8">
 <div className="rounded-xl border border-sand-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] px-3 py-2.5">
 <p className="mb-2 text-xs font-semibold text-sand-700">
 How would you like to get your order?
 </p>

 {/* Toggle — compact */}
 <div className="relative flex h-9 rounded-lg bg-sand-100 p-0.5">
 {/* Sliding indicator */}
 <motion.div
 className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-[7px] bg-white shadow-sm"
 animate={{
 left: deliveryMethod ==="delivery" ?"2px" :"calc(50%)",
 }}
 transition={{ type:"spring", stiffness: 400, damping: 30 }}
 />

 <button
 className={cn(
"relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-[7px] text-xs font-semibold transition-colors duration-200",
 deliveryMethod ==="delivery"
 ?"text-brand-700"
 :"text-sand-400"
 )}
 onClick={() => setDeliveryMethod("delivery")}
 aria-pressed={deliveryMethod ==="delivery"}
 >
 <Truck className="h-3.5 w-3.5" />
 Delivery
 </button>

 <button
 className={cn(
"relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-[7px] text-xs font-semibold transition-colors duration-200",
 deliveryMethod ==="pickup"
 ?"text-brand-700"
 :"text-sand-400"
 )}
 onClick={() => setDeliveryMethod("pickup")}
 aria-pressed={deliveryMethod ==="pickup"}
 >
 <Store className="h-3.5 w-3.5" />
 Pickup
 </button>
 </div>

 {/* Info text below */}
 <AnimatePresence mode="wait">
 <motion.div
 key={deliveryMethod}
 initial={{ opacity: 0, y: 3 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -3 }}
 transition={{ duration: 0.2 }}
 className="mt-2 flex items-center gap-1.5"
 >
 {deliveryMethod ==="delivery" ? (
 <>
 <Clock className="h-3 w-3 text-cyan-600" />
 <span className="text-[0.65rem] text-sand-500">
 Delivered in <span className="font-semibold text-cyan-600">2-3 days</span> — Free over 300 EGP
 </span>
 </>
 ) : (
 <>
 <MapPin className="h-3 w-3 text-brand-600" />
 <span className="text-[0.65rem] text-sand-500">
 Ready in <span className="font-semibold text-brand-600">1 hour</span> — 120+ branches
 </span>
 </>
 )}
 </motion.div>
 </AnimatePresence>
 </div>
 </section>
 );
}
