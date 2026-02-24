"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Skincare",
  "Wellness",
  "Baby Care",
  "Nutrition",
  "Pharmacy Tips",
];

const mockArticles = [
  {
    id: "1",
    slug: "the-complete-summer-skincare-guide",
    title: "The Complete Summer Skincare Guide",
    category: "Skincare",
    readTime: "5 min",
    date: "Feb 22, 2026",
    excerpt:
      "Protect your skin from the harsh summer sun with our expert dermatologist-approved routine.",
    color: "from-amber-50 to-orange-50",
    darkColor: "dark:from-amber-950 dark:to-orange-950",
    emoji: "☀️",
  },
  {
    id: "2",
    slug: "essential-vitamins-for-daily-energy",
    title: "Essential Vitamins for Daily Energy",
    category: "Wellness",
    readTime: "4 min",
    date: "Feb 20, 2026",
    excerpt:
      "Discover which vitamins can help you stay energized throughout the day without relying on caffeine.",
    color: "from-green-50 to-emerald-50",
    darkColor: "dark:from-green-950 dark:to-emerald-950",
    emoji: "💊",
  },
  {
    id: "3",
    slug: "baby-care-tips-for-new-parents",
    title: "Baby Care Tips for New Parents",
    category: "Baby Care",
    readTime: "6 min",
    date: "Feb 18, 2026",
    excerpt:
      "Everything first-time parents need to know about keeping their newborn healthy and comfortable.",
    color: "from-sky-50 to-blue-50",
    darkColor: "dark:from-sky-950 dark:to-blue-950",
    emoji: "👶",
  },
  {
    id: "4",
    slug: "understanding-your-prescription-labels",
    title: "Understanding Your Prescription Labels",
    category: "Pharmacy Tips",
    readTime: "3 min",
    date: "Feb 15, 2026",
    excerpt:
      "Learn how to read and understand medication labels to ensure safe and effective use.",
    color: "from-violet-50 to-purple-50",
    darkColor: "dark:from-violet-950 dark:to-purple-950",
    emoji: "💡",
  },
  {
    id: "5",
    slug: "top-10-superfoods-for-immune-health",
    title: "Top 10 Superfoods for Immune Health",
    category: "Nutrition",
    readTime: "5 min",
    date: "Feb 12, 2026",
    excerpt:
      "Boost your immune system naturally with these nutrient-rich foods recommended by our pharmacists.",
    color: "from-rose-50 to-pink-50",
    darkColor: "dark:from-rose-950 dark:to-pink-950",
    emoji: "🥗",
  },
  {
    id: "6",
    slug: "how-to-choose-the-right-moisturizer",
    title: "How to Choose the Right Moisturizer",
    category: "Skincare",
    readTime: "4 min",
    date: "Feb 10, 2026",
    excerpt:
      "A simple guide to finding the perfect moisturizer for your skin type and concerns.",
    color: "from-teal-50 to-cyan-50",
    darkColor: "dark:from-teal-950 dark:to-cyan-950",
    emoji: "🧴",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? mockArticles
      : mockArticles.filter((a) => a.category === activeCategory);

  const featured = filteredArticles[0];
  const rest = filteredArticles.slice(1);

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Page Header */}
      <div className="flex items-center gap-3 px-[var(--page-padding-x)] pt-3 lg:px-8">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/">
            <ChevronLeft className="h-5 w-5 text-sand-600 dark:text-muted-foreground" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-sand-800 dark:text-foreground lg:text-2xl">
            Health Tips
          </h1>
          <p className="text-xs text-sand-500 dark:text-muted-foreground">
            Expert advice from our pharmacists
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-[var(--page-padding-x)] lg:px-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
              activeCategory === cat
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-sand-100 dark:bg-secondary text-sand-600 dark:text-muted-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="mx-[var(--page-padding-x)] overflow-hidden rounded-2xl lg:mx-8"
        >
          <div className={cn("bg-gradient-to-br p-5", featured.color, featured.darkColor)}>
            <span className="inline-block rounded-full bg-white/70 dark:bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700 dark:text-primary backdrop-blur-sm">
              {featured.category}
            </span>
            <div className="mt-8 text-4xl">{featured.emoji}</div>
            <h2 className="mt-3 text-lg font-bold leading-snug text-sand-800 dark:text-foreground lg:text-xl">
              {featured.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-sand-600 dark:text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sand-500 dark:text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{featured.readTime} read</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-primary">
                Read Article <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Article List — responsive grid */}
      {rest.length > 0 && (
        <div className="flex flex-col gap-3 px-[var(--page-padding-x)] md:grid md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="flex gap-3.5 rounded-xl border border-sand-200 dark:border-border bg-white dark:bg-card p-3 transition-shadow hover:shadow-md md:flex-col md:gap-2"
            >
              {/* Thumbnail */}
              <div className={cn(
                "flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl md:h-32 md:w-full",
                article.color, article.darkColor
              )}>
                {article.emoji}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between py-0.5 md:py-0">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-600 dark:text-primary">
                    {article.category}
                  </span>
                  <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-sand-800 dark:text-foreground">
                    {article.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-sand-400 dark:text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="text-[11px]">{article.readTime} read</span>
                  <span className="text-sand-300 dark:text-muted">·</span>
                  <span className="text-[11px]">{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 px-[var(--page-padding-x)] py-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100 dark:bg-secondary">
            <BookOpen className="h-6 w-6 text-sand-400 dark:text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-sand-600 dark:text-muted-foreground">
            No articles in this category yet
          </p>
          <p className="text-xs text-sand-400 dark:text-muted-foreground">
            Check back soon for new content
          </p>
        </div>
      )}
    </div>
  );
}
