"use client";

import { Truck } from"lucide-react";
import { cn } from"@/lib/utils";

interface ExpressDeliveryBadgeProps {
 size?:"sm" |"md";
 className?: string;
}

export function ExpressDeliveryBadge({
 size ="sm",
 className,
}: ExpressDeliveryBadgeProps) {
 return (
 <span
 className={cn(
"inline-flex items-center gap-1 rounded-md bg-express-bg font-bold text-cyan-700",
 size ==="sm" &&"px-1.5 py-0.5 text-[0.5625rem]",
 size ==="md" &&"px-2 py-1 text-xs",
 className
 )}
 >
 <Truck className={cn(size ==="sm" ?"h-3 w-3" :"h-3.5 w-3.5")} />
 Express 24hr
 </span>
 );
}
