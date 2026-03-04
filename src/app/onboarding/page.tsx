"use client";

import { useRouter } from"next/navigation";
import { motion } from"framer-motion";

export default function OnboardingLanguagePage() {
 const router = useRouter();

 const handleSelect = (lang: string) => {
 // TODO: persist language preference
 router.push("/onboarding/welcome");
 };

 return (
 <div className="flex min-h-dvh flex-col items-center justify-center bg-brand-50 px-[var(--page-padding-x)] max-w-lg mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className="flex w-full max-w-sm flex-col items-center gap-10"
 >
 {/* Logo */}
 <div className="flex flex-col items-center gap-3">
 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-elevated">
 <span className="text-2xl font-bold text-white">E</span>
 </div>
 <span className="text-2xl font-bold text-sand-800">Elezaby</span>
 </div>

 {/* Heading */}
 <div className="flex flex-col items-center gap-2">
 <h1 className="text-xl font-bold text-sand-800">
 Choose your language
 </h1>
 <p className="text-sm text-sand-500">
 Select your preferred language
 </p>
 </div>

 {/* Language Options */}
 <div className="flex w-full flex-col gap-3">
 <motion.button
 whileTap={{ scale: 0.98 }}
 onClick={() => handleSelect("en")}
 className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-sand-200 bg-white text-base font-semibold text-sand-800 shadow-card transition-colors hover:border-brand-500 hover:bg-brand-50"
 >
 English
 </motion.button>

 <motion.button
 whileTap={{ scale: 0.98 }}
 onClick={() => handleSelect("ar")}
 className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-sand-200 bg-white text-base font-semibold text-sand-800 shadow-card transition-colors hover:border-brand-500 hover:bg-brand-50"
 style={{ fontFamily:"'IBM Plex Sans Arabic', 'Plus Jakarta Sans', system-ui, sans-serif" }}
 >
 العربية
 </motion.button>
 </div>
 </motion.div>
 </div>
 );
}
