"use client";

import { Zap } from"lucide-react";

const dealMessages = [
"Daily Deals — Up to 50% Off",
"Free Delivery over 300 EGP",
"Express 24hr Delivery Available",
"Your Health Partner — شريكك لحياة أفضل",
];

export function DealsBanner() {
 return (
 <div className="relative flex h-7 shrink-0 items-center overflow-hidden bg-[linear-gradient(180deg,rgba(8,28,72,0.98),rgba(16,52,112,0.97))] text-white">
 <div className="deals-marquee whitespace-nowrap">
 {/* Double the messages for seamless loop */}
 {[...dealMessages, ...dealMessages].map((msg, i) => (
 <span
 key={i}
 className="inline-flex items-center gap-2 px-6 text-[0.6875rem] font-medium"
 >
 <Zap className="h-3 w-3 fill-cyan-400 text-cyan-400" />
 {msg}
 </span>
 ))}
 </div>
 </div>
 );
}
