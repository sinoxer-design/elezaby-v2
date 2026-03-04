"use client";

import Image from"next/image";
import Link from"next/link";
import { motion } from"framer-motion";
import { cn } from"@/lib/utils";

interface CategoryPillProps {
 name: string;
 emoji?: string;
 imageUrl?: string;
 isHero?: boolean;
 isActive?: boolean;
 href?: string;
 onClick?: () => void;
}

export function CategoryPill({
 name,
 emoji,
 imageUrl,
 isHero = false,
 isActive = false,
 href,
 onClick,
}: CategoryPillProps) {
 const hasImage = imageUrl && !imageUrl.includes("placeholder");

 const content = (
 <motion.div
 whileTap={{ scale: 0.92 }}
 transition={{ type:"spring", stiffness: 400, damping: 20 }}
 className={cn(
"flex shrink-0 flex-col items-center gap-1.5",
"w-16"
 )}
 >
 <div
 className={cn(
"overflow-hidden rounded-full border-2 transition-all duration-200",
"h-14 w-14",
 isActive
 ?"border-cyan-500 shadow-[0_2px_10px_rgba(0,174,239,0.25)] ring-2 ring-cyan-200/50"
 :"border-white bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
 )}
 >
 {hasImage ? (
 <div className="relative h-full w-full rounded-full overflow-hidden bg-white">
 <Image
 src={imageUrl}
 alt={name}
 fill
 className="object-cover"
 sizes="56px"
 unoptimized
 />
 </div>
 ) : (
 <div
 className={cn(
"flex h-full w-full items-center justify-center rounded-full bg-white",
 isActive &&"ring-1 ring-cyan-200"
 )}
 >
 <span className="text-2xl">{emoji}</span>
 </div>
 )}
 </div>
 <span
 className={cn(
"w-full text-center text-[0.625rem] font-medium leading-tight",
 isActive ?"text-brand-700" :"text-sand-600"
 )}
 >
 {name}
 </span>
 </motion.div>
 );

 if (href) {
 return <Link href={href}>{content}</Link>;
 }

 return (
 <button onClick={onClick} className="appearance-none">
 {content}
 </button>
 );
}
