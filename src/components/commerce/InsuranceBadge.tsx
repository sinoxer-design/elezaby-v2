"use client";

import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function InsuranceBadge({ className }: { className?: string }) {
  return (
    <Badge variant="insurance" className={className}>
      <ShieldCheck className="mr-0.5 h-3 w-3" />
      Insured
    </Badge>
  );
}
