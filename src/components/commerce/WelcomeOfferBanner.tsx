"use client";

import * as React from"react";
import { X, Gift } from"lucide-react";
import { motion, AnimatePresence } from"framer-motion";

export function WelcomeOfferBanner() {
 const [dismissed, setDismissed] = React.useState(false);
 const [visible, setVisible] = React.useState(false);

 React.useEffect(() => {
 // Check if user has dismissed this before
 const wasDismissed = sessionStorage.getItem("welcome-offer-dismissed");
 if (!wasDismissed) {
 // Show after a short delay
 const timer = setTimeout(() => setVisible(true), 2000);
 return () => clearTimeout(timer);
 }
 }, []);

 const handleDismiss = () => {
 setDismissed(true);
 setVisible(false);
 sessionStorage.setItem("welcome-offer-dismissed","true");
 };

 return (
 <AnimatePresence>
 {visible && !dismissed && (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -20 }}
 transition={{ type:"spring", stiffness: 300, damping: 25 }}
 className="mx-[var(--page-padding-x)] lg:mx-8 overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm"
 >
 <div className="flex items-center gap-3 px-4 py-3">
 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
 <Gift className="h-5 w-5 text-brand-700" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-bold text-brand-800">
 Welcome! Get 10% off your first order
 </p>
 <p className="text-xs text-brand-600">
 Use code <span className="font-mono font-bold text-cyan-700">WELCOME10</span> at checkout
 </p>
 </div>
 <button
 onClick={handleDismiss}
 className="shrink-0 rounded-full p-1.5 text-brand-400 hover:bg-brand-100 hover:text-brand-600"
 aria-label="Dismiss"
 >
 <X className="h-4 w-4" />
 </button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
}
