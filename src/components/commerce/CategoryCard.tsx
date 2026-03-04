"use client";

import Image from"next/image";
import Link from"next/link";
import { motion } from"framer-motion";
import { cn } from"@/lib/utils";

interface CategoryCardProps {
 name: string;
 imageUrl: string;
 productCount?: number;
 href?: string;
 onClick?: () => void;
}

export function CategoryCard({
 name,
 imageUrl,
 productCount,
 href,
 onClick,
}: CategoryCardProps) {
 const content = (
 <motion.div
 whileTap={{ scale: 0.96 }}
 transition={{ type:"spring", stiffness: 400, damping: 25 }}
 className="flex flex-col items-center gap-2.5"
 >
 <div className="h-24 w-24 overflow-hidden rounded-2xl bg-sand-100 p-4 transition-shadow duration-200 hover:shadow-md">
 <Image
 src={imageUrl}
 alt={name}
 width={64}
 height={64}
 className="h-full w-full object-contain"
 />
 </div>
 <div className="text-center">
 <h3 className="text-sm font-semibold text-sand-700">{name}</h3>
 {productCount && (
 <span className="text-[11px] text-sand-400">
 {productCount} products
 </span>
 )}
 </div>
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
