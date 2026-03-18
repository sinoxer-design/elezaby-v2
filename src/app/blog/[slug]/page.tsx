"use client";

import * as React from "react";
import Link from"next/link";
import { useParams } from"next/navigation";
import { ChevronLeft, Clock, Calendar, User, Share2, Bookmark, ChevronRight } from"lucide-react";
import { Button } from"@/components/ui/button";
import { cn } from"@/lib/utils";

/** Keywords that auto-link to product listing pages */
const KEYWORD_LINKS: { keyword: string; href: string }[] = [
  { keyword: "SPF 30", href: "/products?q=spf" },
  { keyword: "sunscreen", href: "/products?q=sunscreen" },
  { keyword: "moisturizer", href: "/products?category=skincare" },
  { keyword: "hyaluronic acid", href: "/products?q=hyaluronic+acid" },
  { keyword: "niacinamide", href: "/products?q=niacinamide" },
  { keyword: "Vitamin B12", href: "/products?q=vitamin+b12" },
  { keyword: "Vitamin D", href: "/products?q=vitamin+d" },
  { keyword: "Iron", href: "/products?q=iron+supplement" },
  { keyword: "lip balm", href: "/products?q=lip+balm" },
  { keyword: "diapers", href: "/products?q=diapers" },
  { keyword: "baby formula", href: "/products?q=baby+formula" },
  { keyword: "diaper rash", href: "/products?q=diaper+rash" },
  { keyword: "baby lotion", href: "/products?q=baby+lotion" },
];

/** Replaces keyword occurrences in text with clickable links */
function linkifyKeywords(text: string): React.ReactNode {
  // Sort by longest keyword first to avoid partial matches
  const sorted = [...KEYWORD_LINKS].sort((a, b) => b.keyword.length - a.keyword.length);
  const pattern = sorted.map((k) => k.keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(\\b(?:${pattern})\\b)`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const match = sorted.find((k) => k.keyword.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <Link
          key={i}
          href={match.href}
          className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 transition-colors hover:text-brand-800"
        >
          {part}
        </Link>
      );
    }
    return part;
  });
}

interface Article {
 id: string;
 slug: string;
 title: string;
 category: string;
 readTime: string;
 date: string;
 excerpt: string;
 body: string[];
 color: string;
 darkColor: string;
 emoji: string;
}

const mockArticles: Article[] = [
 {
 id:"1",
 slug:"the-complete-summer-skincare-guide",
 title:"The Complete Summer Skincare Guide",
 category:"Skincare",
 readTime:"5 min",
 date:"Feb 22, 2026",
 excerpt:"Protect your skin from the harsh summer sun with our expert dermatologist-approved routine.",
 color:"from-amber-50 to-orange-50",
 darkColor:"",
 emoji:"☀️",
 body: [
"As temperatures rise across Egypt, your skin faces unique challenges from increased UV exposure, humidity, and environmental stressors. A proper summer skincare routine is essential for maintaining healthy, radiant skin throughout the season.",
"Start with a broad-spectrum sunscreen of at least SPF 30, applied generously 15 minutes before sun exposure. Our pharmacists recommend reapplying every two hours, especially if you are spending time outdoors. Look for formulations that are lightweight and non-comedogenic to avoid clogged pores.",
"Hydration is key during the summer months. Switch to a lighter moisturizer that provides adequate hydration without feeling heavy on the skin. Ingredients like hyaluronic acid and niacinamide are excellent choices for summer skincare, helping to retain moisture while controlling oil production.",
"Do not forget to pay attention to often-neglected areas like your lips, ears, and the back of your hands. Using a lip balm with SPF and wearing protective clothing can significantly reduce your risk of sun damage and premature aging.",
 ],
 },
 {
 id:"2",
 slug:"essential-vitamins-for-daily-energy",
 title:"Essential Vitamins for Daily Energy",
 category:"Wellness",
 readTime:"4 min",
 date:"Feb 20, 2026",
 excerpt:"Discover which vitamins can help you stay energized throughout the day without relying on caffeine.",
 color:"from-green-50 to-emerald-50",
 darkColor:"",
 emoji:"💊",
 body: [
"Feeling tired and sluggish throughout the day is a common complaint, especially with demanding modern lifestyles. While caffeine might offer a quick fix, the right vitamins and minerals can provide sustained energy without the crash.",
"Vitamin B12 is one of the most important nutrients for energy production. It plays a crucial role in converting food into glucose, which your body uses for fuel. A deficiency in B12 can lead to fatigue, weakness, and even mood changes.",
"Iron is another essential mineral that directly impacts your energy levels. It helps transport oxygen throughout your body, and low iron levels can result in anemia and chronic fatigue. Women, in particular, should monitor their iron levels regularly.",
"Vitamin D, often called the sunshine vitamin, is also linked to energy and mood regulation. Despite living in a sunny climate, many Egyptians are deficient in vitamin D due to indoor lifestyles. A simple blood test can determine if you need supplementation.",
 ],
 },
 {
 id:"3",
 slug:"baby-care-tips-for-new-parents",
 title:"Baby Care Tips for New Parents",
 category:"Baby Care",
 readTime:"6 min",
 date:"Feb 18, 2026",
 excerpt:"Everything first-time parents need to know about keeping their newborn healthy and comfortable.",
 color:"from-sky-50 to-blue-50",
 darkColor:"",
 emoji:"👶",
 body: [
"Welcoming a new baby is one of life's most exciting moments, but it also comes with many questions and concerns for first-time parents. Understanding the basics of newborn care can help you feel more confident and prepared.",
"Skin care for newborns requires gentle, fragrance-free products designed specifically for sensitive baby skin. Avoid over-bathing, as this can strip the natural oils from your baby's skin. Two to three baths per week is typically sufficient for newborns.",
"Feeding schedules, diaper changes, and sleep patterns can feel overwhelming at first, but establishing a routine early on helps both you and your baby. Our pharmacy team can recommend appropriate formulas, vitamins, and care products.",
"Always keep a well-stocked baby care kit at home, including a digital thermometer, saline drops for nasal congestion, and a gentle petroleum jelly for diaper rash prevention.",
 ],
 },
 {
 id:"4",
 slug:"understanding-your-prescription-labels",
 title:"Understanding Your Prescription Labels",
 category:"Pharmacy Tips",
 readTime:"3 min",
 date:"Feb 15, 2026",
 excerpt:"Learn how to read and understand medication labels to ensure safe and effective use.",
 color:"from-violet-50 to-purple-50",
 darkColor:"",
 emoji:"💡",
 body: [
"Prescription labels contain vital information that ensures you take your medication safely and effectively. Understanding each part of the label can prevent dosing errors and potential drug interactions.",
"The label includes your name, the prescribing doctor, pharmacy details, and most importantly, the dosage instructions. Pay close attention to phrases like 'take with food' or 'avoid sunlight'.",
"Expiration dates are not just suggestions. Using expired medication can be ineffective or even harmful. Always check the expiration date before taking any medication, and safely dispose of expired products at your nearest Elezaby pharmacy.",
"If you ever have questions about your prescription, our pharmacists are always available to help. We can explain potential side effects, interactions with other medications, and the best times to take your medicine.",
 ],
 },
 {
 id:"5",
 slug:"top-10-superfoods-for-immune-health",
 title:"Top 10 Superfoods for Immune Health",
 category:"Nutrition",
 readTime:"5 min",
 date:"Feb 12, 2026",
 excerpt:"Boost your immune system naturally with these nutrient-rich foods recommended by our pharmacists.",
 color:"from-rose-50 to-pink-50",
 darkColor:"",
 emoji:"🥗",
 body: [
"A strong immune system is your body's first line of defense against illness. While supplements can help fill nutritional gaps, incorporating immune-boosting foods into your daily diet is the most effective long-term strategy.",
"Citrus fruits like oranges and lemons are packed with vitamin C, a powerful antioxidant that supports immune cell function. Garlic contains allicin, a compound with natural antimicrobial properties.",
"Leafy greens such as spinach and kale are rich in vitamins A, C, and E, as well as numerous antioxidants and beta-carotene. Turmeric, a staple in Egyptian cuisine, contains curcumin with significant anti-inflammatory effects.",
"Nuts and seeds, particularly almonds and sunflower seeds, are excellent sources of vitamin E. Try to include a variety of these superfoods in your meals throughout the week for optimal immune support.",
 ],
 },
 {
 id:"6",
 slug:"how-to-choose-the-right-moisturizer",
 title:"How to Choose the Right Moisturizer",
 category:"Skincare",
 readTime:"4 min",
 date:"Feb 10, 2026",
 excerpt:"A simple guide to finding the perfect moisturizer for your skin type and concerns.",
 color:"from-teal-50 to-cyan-50",
 darkColor:"",
 emoji:"🧴",
 body: [
"Choosing the right moisturizer can make a significant difference in your skin's health and appearance. With countless options available, understanding your skin type is the first step to finding the perfect match.",
"For oily skin, look for lightweight, oil-free moisturizers labeled as non-comedogenic. Gel-based formulas with hyaluronic acid provide hydration without adding excess oil.",
"Sensitive skin requires extra care. Choose fragrance-free, hypoallergenic moisturizers with soothing ingredients like aloe vera, chamomile, or centella asiatica. Always patch-test new products first.",
"Combination skin can be tricky. Consider using different moisturizers for different zones of your face, or look for balancing formulas. Our dermocosmetics section at Elezaby has trained staff who can help you find the ideal product.",
 ],
 },
];

export default function BlogDetailPage() {
 const params = useParams();
 const slug = params.slug as string;
 const article = mockArticles.find((a) => a.slug === slug);

 if (!article) {
 return (
 <div className="flex flex-col items-center justify-center gap-2 px-[var(--page-padding-x)] py-16">
 <p className="text-sm font-medium text-sand-600">Article not found</p>
 <Link href="/blog" className="text-sm font-semibold text-brand-500">
 Back to Blog
 </Link>
 </div>
 );
 }

 const relatedArticles = mockArticles
 .filter((a) => a.id !== article.id)
 .slice(0, 3);

 return (
 <div className="flex flex-col pb-8">
 {/* Hero Banner */}
 <div className={cn("bg-gradient-to-br px-[var(--page-padding-x)] pb-6 pt-3 lg:px-8", article.color, article.darkColor)}>
 {/* Nav Row */}
 <div className="flex items-center justify-between">
 <Button variant="ghost" size="icon-sm" className="bg-white/50 backdrop-blur-sm" asChild>
 <Link href="/blog">
 <ChevronLeft className="h-5 w-5 text-sand-700" />
 </Link>
 </Button>
 <div className="flex gap-2">
 <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
 <Share2 className="h-4 w-4 text-sand-600" />
 </button>
 <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
 <Bookmark className="h-4 w-4 text-sand-600" />
 </button>
 </div>
 </div>

 {/* Category + Emoji */}
 <div className="mt-4 flex items-center gap-3">
 <span className="inline-block rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700 backdrop-blur-sm">
 {article.category}
 </span>
 </div>
 <div className="mt-4 text-5xl">{article.emoji}</div>

 {/* Title */}
 <h1 className="mt-4 text-2xl font-bold leading-tight text-sand-800 lg:text-3xl">
 {article.title}
 </h1>
 <p className="mt-2 text-sm text-sand-600">{article.excerpt}</p>
 </div>

 {/* Author & Meta Bar */}
 <div className="flex items-center gap-3 border-b border-sand-100 px-[var(--page-padding-x)] py-3 lg:px-8">
 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50">
 <User className="h-4 w-4 text-brand-500" />
 </div>
 <div className="flex-1">
 <p className="text-sm font-semibold text-sand-700">Dr. Sarah Ahmed</p>
 <p className="text-[11px] text-sand-400">Clinical Pharmacist</p>
 </div>
 <div className="flex items-center gap-3 text-[11px] text-sand-400">
 <span className="flex items-center gap-1">
 <Clock className="h-3 w-3" />
 {article.readTime}
 </span>
 <span className="flex items-center gap-1">
 <Calendar className="h-3 w-3" />
 {article.date}
 </span>
 </div>
 </div>

 {/* Article Body — centered on md+ */}
 <div className="mx-auto w-full max-w-2xl flex flex-col gap-5 px-[var(--page-padding-x)] pt-5 lg:px-8">
 {article.body.map((paragraph, index) => (
 <p key={index} className="text-[15px] leading-[1.75] text-sand-600 lg:text-base">
 {linkifyKeywords(paragraph)}
 </p>
 ))}
 </div>

 {/* CTA */}
 <div className="mx-auto w-full max-w-2xl px-[var(--page-padding-x)] mt-8 lg:px-8">
 <div className="rounded-xl bg-brand-50 p-4">
 <p className="text-sm font-semibold text-brand-800">Need advice?</p>
 <p className="mt-0.5 text-xs text-brand-600">
 Our pharmacists are available to answer your health questions.
 </p>
 <Button variant="default" size="sm" className="mt-3" asChild>
 <Link href="/account/help">Chat with a Pharmacist</Link>
 </Button>
 </div>
 </div>

 {/* Related Articles */}
 <div className="mt-8 px-[var(--page-padding-x)] lg:px-8">
 <div className="flex items-center justify-between mb-3">
 <h2 className="text-base font-bold text-sand-800">Keep Reading</h2>
 <Link href="/blog" className="flex items-center gap-0.5 text-xs font-semibold text-brand-500">
 All Articles <ChevronRight className="h-3.5 w-3.5" />
 </Link>
 </div>
 {/* Mobile: horizontal scroll, md+: 3-col grid */}
 <div className="flex gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
 {relatedArticles.map((related) => (
 <Link
 key={related.id}
 href={`/blog/${related.slug}`}
 className="w-[65%] shrink-0 overflow-hidden rounded-xl border border-sand-200 bg-white md:w-auto"
 >
 <div className={cn("flex h-24 items-center justify-center bg-gradient-to-br text-3xl", related.color, related.darkColor)}>
 {related.emoji}
 </div>
 <div className="p-3">
 <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
 {related.category}
 </span>
 <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-sand-800">
 {related.title}
 </h3>
 <span className="mt-1.5 flex items-center gap-1 text-[11px] text-sand-400">
 <Clock className="h-3 w-3" /> {related.readTime} read
 </span>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </div>
 );
}
