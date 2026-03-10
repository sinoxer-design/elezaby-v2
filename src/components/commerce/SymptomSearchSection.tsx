"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mockSymptoms } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  brand: "bg-brand-50 text-brand-700",
  cyan: "bg-cyan-50 text-cyan-700",
  deal: "bg-deal-bg text-deal",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-800",
  purple: "bg-purple-50 text-purple-700",
  pink: "bg-pink-50 text-pink-700",
  blue: "bg-blue-50 text-blue-700",
};

interface SymptomSearchSectionProps {
  className?: string;
}

export function SymptomSearchSection({ className }: SymptomSearchSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      {/* Section Header */}
      <div className="px-[var(--page-padding-x)] lg:px-8">
          <h2 className="text-lg font-bold text-sand-800">Search by Symptom</h2>
      </div>

      {/* Symptom Pills */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-[var(--page-padding-x)] pr-4 lg:pl-8 lg:pr-8">
        {mockSymptoms.map((symptom) => (
          <motion.div key={symptom.id} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/products?symptom=${symptom.slug}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 transition-shadow hover:shadow-md",
                colorMap[symptom.color] ?? "bg-gray-50 text-gray-700",
              )}
            >
              <span className="text-2xl">{symptom.emoji}</span>
              <span className="whitespace-nowrap text-xs font-semibold">
                {symptom.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
