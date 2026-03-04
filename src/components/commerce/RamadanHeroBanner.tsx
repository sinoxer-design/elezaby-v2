"use client";

import * as React from"react";
import { cn } from"@/lib/utils";

/* ─────────── Detailed Lantern SVG (Fanous) ─────────── */

function BlueLantern({
 className,
 style,
 glowColor ="oklch(0.72 0.15 230 / 0.45)",
 glowIntensity = 1,
}: {
 className?: string;
 style?: React.CSSProperties;
 glowColor?: string;
 glowIntensity?: number;
}) {
 return (
 <svg
 viewBox="0 0 80 180"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 style={style}
 aria-hidden
 >
 {/* Chain links */}
 <path
 d="M40 0v8M40 12v8M40 24v8"
 stroke="currentColor"
 strokeWidth="1.4"
 strokeLinecap="round"
 />
 <circle cx="40" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
 <circle cx="40" cy="22" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />

 {/* Hook ring */}
 <path
 d="M36 32c0-3 1.8-5 4-5s4 2 4 5"
 stroke="currentColor"
 strokeWidth="1.2"
 fill="none"
 />

 {/* Crown / cap */}
 <path d="M26 38h28l-2 4H28l-2-4z" fill="currentColor" />
 <path
 d="M28 42h24c1.5 0 2.5 1 2.5 2.5v2c0 0-4 2.5-14.5 2.5S26 46.5 26 46.5v-2c0-1.5 1-2.5 2.5-2.5z"
 fill="currentColor"
 fillOpacity="0.85"
 />
 {/* Crown detail arches */}
 <path
 d="M30 38c1.5-3 3-5 5-5s3.5 2 5 5M40 33c1.5-3 3-5 5-5s3.5 2 5 5"
 stroke="currentColor"
 strokeWidth="0.6"
 strokeOpacity="0.4"
 fill="none"
 />

 {/* Body — elongated bulb with pointed waist */}
 <path
 d="M28 49c-7 12-10 28-10 46 0 22 8 38 22 42 14-4 22-20 22-42 0-18-3-34-10-46H28z"
 fill="currentColor"
 fillOpacity="0.2"
 stroke="currentColor"
 strokeWidth="0.8"
 strokeOpacity="0.5"
 />

 {/* Vertical panel ribs */}
 <line x1="40" y1="49" x2="40" y2="135" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
 <line x1="32" y1="53" x2="28" y2="130" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.2" />
 <line x1="48" y1="53" x2="52" y2="130" stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.2" />
 {/* Diagonal cross-ribs for faceted look */}
 <line x1="28" y1="70" x2="40" y2="90" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" />
 <line x1="52" y1="70" x2="40" y2="90" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.15" />
 <line x1="28" y1="100" x2="40" y2="80" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.12" />
 <line x1="52" y1="100" x2="40" y2="80" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.12" />

 {/* Horizontal bands */}
 <ellipse cx="40" cy="68" rx="17" ry="1.2" fill="currentColor" fillOpacity="0.2" />
 <ellipse cx="40" cy="95" rx="18" ry="1.2" fill="currentColor" fillOpacity="0.2" />
 <ellipse cx="40" cy="118" rx="15" ry="1" fill="currentColor" fillOpacity="0.18" />

 {/* Inner glow — layered radials */}
 <ellipse
 cx="40"
 cy="88"
 rx="14"
 ry="30"
 fill={glowColor}
 style={{ opacity: glowIntensity }}
 />
 <ellipse
 cx="40"
 cy="88"
 rx="8"
 ry="18"
 fill={glowColor}
 style={{ opacity: glowIntensity * 0.8 }}
 />
 {/* Hot center spot */}
 <ellipse
 cx="40"
 cy="85"
 rx="4"
 ry="8"
 fill="oklch(0.90 0.08 230 / 0.3)"
 style={{ opacity: glowIntensity * 0.6 }}
 />

 {/* Bottom collar */}
 <path
 d="M29 135h22c1.5 0 2.5 1 2.5 2v1.5c0 1-4 3-13 3s-13-2-13-3V137c0-1 1-2 2.5-2z"
 fill="currentColor"
 fillOpacity="0.8"
 />

 {/* Finial */}
 <path d="M36 141h8l-1.5 7h-5l-1.5-7z" fill="currentColor" fillOpacity="0.7" />
 <path d="M38.5 148h3l-1.5 10-1.5-10z" fill="currentColor" fillOpacity="0.5" />
 </svg>
 );
}

/* ─────────── Decorative star ─────────── */
function TinyStar({ className, style }: { className?: string; style?: React.CSSProperties }) {
 return (
 <svg
 viewBox="0 0 12 12"
 fill="currentColor"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 style={style}
 aria-hidden
 >
 <path d="M6 0l1.5 4.5H12l-3.7 2.7 1.4 4.3L6 8.5 2.3 11.5l1.4-4.3L0 4.5h4.5z" />
 </svg>
 );
}

/* ─────────── Crescent moon ─────────── */
function CrescentMoon({ className, style }: { className?: string; style?: React.CSSProperties }) {
 return (
 <svg
 viewBox="0 0 60 60"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 style={style}
 aria-hidden
 >
 <path
 d="M45 10C37 13 31 22 31 33c0 11 6 20 14 23-3 1-6 1.5-9 1.5C21 57.5 9 45 9 30S21 2.5 36 2.5c3 0 6 .5 9 1.5-2 1-4 2.5-6 4.5"
 fill="currentColor"
 />
 </svg>
 );
}

/* ─────────── Main Background Component ─────────── */

interface RamadanHeroBannerProps {
 className?: string;
}

/**
 * Page-level Ramadan atmospheric background with floating blue-toned lanterns.
 * Renders as an absolute layer behind all homepage content.
 * Uses pointer-events-none so UI remains fully interactive.
 */
export function RamadanHeroBanner({ className }: RamadanHeroBannerProps) {
 return (
 <div
 className={cn(
"absolute inset-0 overflow-hidden pointer-events-none select-none",
 className
 )}
 aria-hidden
 style={{ zIndex: 0 }}
 >
 {/* ── Very subtle tinted wash — barely-there blue tint ── */}
 <div
 className="absolute inset-0"
 style={{
 background: `
 linear-gradient(
 180deg,
 oklch(0.94 0.02 240 / 0.3) 0%,
 oklch(0.96 0.01 245 / 0.15) 20%,
 transparent 45%
 )
 `,
 }}
 />

 {/* ── LARGE lantern — far right edge, partially offscreen ── */}
 <div
 className="absolute animate-lantern-float-1"
 style={{
 top:"-30px",
 right:"-15px",
 width:"100px",
 height:"230px",
 }}
 >
 <BlueLantern
 className="h-full w-full text-brand-500/20"
 glowColor="oklch(0.72 0.15 230 / 0.25)"
 glowIntensity={0.8}
 />
 </div>

 {/* ── Medium lantern — far left edge ── */}
 <div
 className="absolute animate-lantern-float-2"
 style={{
 top:"0px",
 left:"-10px",
 width:"65px",
 height:"155px",
 animationDelay:"2s",
 }}
 >
 <BlueLantern
 className="h-full w-full text-brand-400/16"
 glowColor="oklch(0.72 0.15 230 / 0.2)"
 glowIntensity={0.6}
 />
 </div>

 {/* ── Small lantern — right edge, further down ── */}
 <div
 className="absolute animate-lantern-float-3"
 style={{
 top:"350px",
 right:"-5px",
 width:"45px",
 height:"108px",
 animationDelay:"5s",
 }}
 >
 <BlueLantern
 className="h-full w-full text-cyan-600/12"
 glowColor="oklch(0.72 0.15 230 / 0.15)"
 glowIntensity={0.5}
 />
 </div>

 {/* ── Tiny lantern — left edge, lower ── */}
 <div
 className="absolute animate-lantern-float-1"
 style={{
 top:"520px",
 left:"-8px",
 width:"36px",
 height:"85px",
 animationDelay:"7s",
 }}
 >
 <BlueLantern
 className="h-full w-full text-brand-300/10"
 glowColor="oklch(0.72 0.15 230 / 0.1)"
 glowIntensity={0.4}
 />
 </div>

 {/* ── Crescent moon — top-right corner ── */}
 <CrescentMoon
 className="absolute text-brand-300/12 animate-drift-slow"
 style={{
 top:"15px",
 right:"18%",
 width:"24px",
 height:"24px",
 }}
 />

 {/* ── Decorative twinkling stars — edges only ── */}
 <TinyStar
 className="absolute text-cyan-400/15 animate-twinkle"
 style={{ top:"40px", left:"4%", width:"8px", height:"8px", animationDelay:"0s" }}
 />
 <TinyStar
 className="absolute text-brand-300/12 animate-twinkle-alt"
 style={{ top:"20px", right:"12%", width:"6px", height:"6px", animationDelay:"1.5s" }}
 />
 <TinyStar
 className="absolute text-cyan-300/12 animate-twinkle"
 style={{ top:"100px", right:"5%", width:"7px", height:"7px", animationDelay:"0.8s" }}
 />
 <TinyStar
 className="absolute text-brand-200/10 animate-twinkle-alt"
 style={{ top:"200px", left:"3%", width:"5px", height:"5px", animationDelay:"2.2s" }}
 />
 <TinyStar
 className="absolute text-cyan-400/10 animate-twinkle"
 style={{ top:"280px", right:"8%", width:"6px", height:"6px", animationDelay:"3.5s" }}
 />
 </div>
 );
}
