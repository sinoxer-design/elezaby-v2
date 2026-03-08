"use client";

import * as React from"react";
import { useRouter } from"next/navigation";
import Link from"next/link";
import { motion } from"framer-motion";
import { Button } from"@/components/ui/button";
import {
 Droplets,
 Scissors,
 Baby,
 HeartPulse,
 Pill,
 Sparkles,
 Cross,
 SmilePlus,
 Apple,
} from"lucide-react";
import { cn } from"@/lib/utils";

const interests = [
 { id:"skincare", label:"Skincare", icon: Droplets },
 { id:"haircare", label:"Hair Care", icon: Scissors },
 { id:"baby-mom", label:"Baby & Mom", icon: Baby },
 { id:"health", label:"Health & Wellness", icon: HeartPulse },
 { id:"vitamins", label:"Vitamins & Supplements", icon: Pill },
 { id:"personal-care", label:"Personal Care", icon: Sparkles },
 { id:"first-aid", label:"First Aid", icon: Cross },
 { id:"dental", label:"Dental Care", icon: SmilePlus },
 { id:"nutrition", label:"Nutrition", icon: Apple },
];

const containerVariants = {
 hidden: { opacity: 0 },
 show: {
 opacity: 1,
 transition: {
 staggerChildren: 0.05,
 },
 },
};

const itemVariants = {
 hidden: { opacity: 0, y: 12 },
 show: { opacity: 1, y: 0 },
};

export default function OnboardingInterestsPage() {
 const router = useRouter();
 const [selected, setSelected] = React.useState<Set<string>>(new Set());

 const toggle = (id: string) => {
 setSelected((prev) => {
 const next = new Set(prev);
 if (next.has(id)) {
 next.delete(id);
 } else {
 next.add(id);
 }
 return next;
 });
 };

 const handleContinue = () => {
 // TODO: persist interest selections
 router.push("/auth/register");
 };

 return (
 <div className="flex min-h-dvh flex-col bg-brand-50 px-[var(--page-padding-x)]">
 {/* Skip Link */}
 <div className="flex h-14 items-center justify-end">
 <Link
 href="/auth/register"
 className="text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
 >
 Skip
 </Link>
 </div>

 {/* Header */}
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-sand-800">
 What are you interested in?
 </h1>
 <p className="mt-1 text-sm text-sand-500">
 Select topics to personalize your experience
 </p>
 </div>

 {/* Interest Grid */}
 <motion.div
 variants={containerVariants}
 initial="hidden"
 animate="show"
 className="grid grid-cols-3 gap-3"
 >
 {interests.map((interest) => {
 const isSelected = selected.has(interest.id);
 return (
 <motion.button
 key={interest.id}
 variants={itemVariants}
 whileTap={{ scale: 0.95 }}
 onClick={() => toggle(interest.id)}
 className={cn(
"flex flex-col items-center gap-2.5 rounded-xl border-2 bg-white p-4 shadow-card transition-all duration-200",
 isSelected
 ?"border-brand-500 bg-brand-50"
 :"border-transparent hover:border-sand-200"
 )}
 >
 <interest.icon
 className={cn(
"h-7 w-7 transition-colors duration-200",
 isSelected ?"text-brand-500" :"text-sand-400"
 )}
 strokeWidth={1.5}
 />
 <span
 className={cn(
"text-center text-xs font-medium leading-tight transition-colors duration-200",
 isSelected ?"text-brand-700" :"text-sand-600"
 )}
 >
 {interest.label}
 </span>
 </motion.button>
 );
 })}
 </motion.div>

 {/* Selected Count */}
 <div className="mt-4 text-center">
 <span className="text-sm text-sand-500">
 {selected.size > 0
 ? `${selected.size} selected`
 :"Select your interests"}
 </span>
 </div>

 {/* Bottom Actions */}
 <div className="mt-auto flex flex-col items-center gap-4 pb-12 pt-6">
 <Button
 variant="default"
 size="pdp-cta"
 onClick={handleContinue}
 className="max-w-sm"
 >
 Continue
 </Button>
 </div>
 </div>
 );
}
