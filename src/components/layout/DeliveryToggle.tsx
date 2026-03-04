"use client";

import { cn } from"@/lib/utils";
import { motion } from"framer-motion";
import { Truck, Store } from"lucide-react";

interface DeliveryToggleProps {
 value:"delivery" |"pickup";
 onChange: (value:"delivery" |"pickup") => void;
}

export function DeliveryToggle({ value, onChange }: DeliveryToggleProps) {
 return (
 <div className="relative flex h-10 rounded-xl bg-sand-100 p-1">
 {/* Sliding indicator */}
 <motion.div
 className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-[8px] bg-white shadow-sm"
 animate={{
 left: value ==="delivery" ?"4px" :"calc(50%)",
 }}
 transition={{ type:"spring", stiffness: 400, damping: 30 }}
 />

 <button
 className={cn(
"relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-[8px] text-xs font-semibold transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1",
 value ==="delivery" ?"text-brand-600" :"text-sand-400"
 )}
 onClick={() => onChange("delivery")}
 aria-pressed={value ==="delivery"}
 >
 <Truck className="h-3.5 w-3.5" />
 Home Delivery
 </button>

 <button
 className={cn(
"relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-[8px] text-xs font-semibold transition-colors duration-200 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-1",
 value ==="pickup" ?"text-brand-600" :"text-sand-400"
 )}
 onClick={() => onChange("pickup")}
 aria-pressed={value ==="pickup"}
 >
 <Store className="h-3.5 w-3.5" />
 Store Pickup
 </button>
 </div>
 );
}
