"use client";

import * as React from"react";
import { motion, AnimatePresence } from"framer-motion";
import { springGentle } from"@/lib/motion";
import { ShoppingBag, X } from"lucide-react";

const socialProofMessages = [
 { name:"Someone in Cairo", product:"Panadol Extra", time:"2 min ago" },
 { name:"A customer in Giza", product:"CeraVe Cream", time:"5 min ago" },
 { name:"Someone in Alexandria", product:"Centrum Vitamins", time:"8 min ago" },
 { name:"A customer in Nasr City", product:"Pampers Diapers", time:"12 min ago" },
 { name:"Someone in Maadi", product:"Bioderma Micellar", time:"15 min ago" },
];

export function SocialProofToast() {
 const [visible, setVisible] = React.useState(false);
 const [messageIndex, setMessageIndex] = React.useState(0);
 const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

 React.useEffect(() => {
 // Show first toast after 8 seconds
 const initialDelay = setTimeout(() => {
 setVisible(true);
 startHideTimer();
 }, 8000);

 return () => {
 clearTimeout(initialDelay);
 if (timerRef.current) clearTimeout(timerRef.current);
 };
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const startHideTimer = () => {
 timerRef.current = setTimeout(() => {
 setVisible(false);
 // Show next message after a delay
 setTimeout(() => {
 setMessageIndex((prev) => (prev + 1) % socialProofMessages.length);
 setVisible(true);
 startHideTimer();
 }, 15000); // 15 seconds between toasts
 }, 5000); // Show for 5 seconds
 };

 const message = socialProofMessages[messageIndex];

 return (
 <AnimatePresence>
 {visible && (
 <motion.div
 initial={{ opacity: 0, y: 80, x: 0 }}
 animate={{ opacity: 1, y: 0, x: 0 }}
 exit={{ opacity: 0, y: 80 }}
 transition={springGentle}
 className="fixed bottom-20 start-4 z-toast lg:bottom-6 lg:start-6"
 >
 <div className="flex items-center gap-3 rounded-lg border border-sand-200 bg-white/95 px-4 py-2.5 shadow-elevated backdrop-blur-sm">
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
 <ShoppingBag className="h-4 w-4 text-brand-600" />
 </div>
 <div className="min-w-0">
 <p className="text-xs font-semibold text-sand-700">
 {message.name}
 </p>
 <p className="text-[0.625rem] text-sand-500">
 just ordered{""}
 <span className="font-medium text-brand-600">
 {message.product}
 </span>{""}
 — {message.time}
 </p>
 </div>
 <button
 onClick={() => setVisible(false)}
 className="shrink-0 rounded-full p-1 text-sand-400 hover:bg-sand-100 hover:text-sand-600"
 aria-label="Dismiss"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
