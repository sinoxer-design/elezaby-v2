"use client";

import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Ramadan Atmospheric Background
   Pure CSS hanging lanterns + bokeh + stars
   ───────────────────────────────────────────────────── */

function HangingLantern({
  bodyW,
  bodyH,
  chainH,
  color,
  glowColor,
  className,
  style,
}: {
  bodyW: number;
  bodyH: number;
  chainH: number;
  color: string;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const glow = glowColor || color;

  return (
    <div className={cn("relative", className)} style={style} aria-hidden>
      {/* Chain line */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 2,
          height: chainH,
          background: color,
          opacity: 0.5,
        }}
      />
      {/* Cap / crown */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: chainH - 1,
          width: bodyW * 0.7,
          height: bodyW * 0.22,
          background: color,
          opacity: 0.6,
          borderRadius: "3px 3px 1px 1px",
        }}
      />
      {/* Lantern body — rounded pill */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: chainH + bodyW * 0.22 - 1,
          width: bodyW,
          height: bodyH,
          background: color,
          opacity: 0.3,
          borderRadius: `${bodyW / 2}px / ${bodyH * 0.35}px`,
        }}
      />
      {/* Body inner highlight */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: chainH + bodyW * 0.22 + bodyH * 0.15,
          width: bodyW * 0.6,
          height: bodyH * 0.65,
          background: `radial-gradient(ellipse, ${glow.replace(")", " / 0.2)")}, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
      {/* Bottom tip */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: chainH + bodyW * 0.22 + bodyH - 3,
          width: 0,
          height: 0,
          borderLeft: `${bodyW * 0.15}px solid transparent`,
          borderRight: `${bodyW * 0.15}px solid transparent`,
          borderTop: `${bodyW * 0.4}px solid ${color}`,
          opacity: 0.35,
        }}
      />
      {/* Outer glow — no filter:blur to avoid stacking context issues */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: chainH - bodyH * 0.2,
          width: bodyW * 4,
          height: bodyH * 2.5,
          background: `radial-gradient(ellipse, ${glow.replace(")", " / 0.1)")} 0%, transparent 55%)`,
          opacity: 1,
        }}
      />
    </div>
  );
}

/* Lantern positions — spread across the page */
const LANTERNS: {
  bodyW: number;
  bodyH: number;
  chainH: number;
  top: number;
  side: "left" | "right";
  offset: string;
  anim: string;
  delay: string;
}[] = [
  // Row 1 — top
  { bodyW: 48, bodyH: 76, chainH: 28, top: 0,   side: "right", offset: "3%",  anim: "animate-lantern-float-1", delay: "0s" },
  { bodyW: 40, bodyH: 64, chainH: 22, top: 0,   side: "left",  offset: "1%",  anim: "animate-lantern-float-2", delay: "1.5s" },
  { bodyW: 36, bodyH: 58, chainH: 30, top: 0,   side: "right", offset: "20%", anim: "animate-lantern-float-3", delay: "3s" },
  // Row 2 — mid
  { bodyW: 32, bodyH: 52, chainH: 18, top: 220, side: "right", offset: "0%",  anim: "animate-lantern-float-2", delay: "4s" },
  { bodyW: 28, bodyH: 44, chainH: 16, top: 260, side: "left",  offset: "0%",  anim: "animate-lantern-float-3", delay: "2s" },
  { bodyW: 30, bodyH: 48, chainH: 20, top: 200, side: "left",  offset: "16%", anim: "animate-lantern-float-1", delay: "5s" },
  // Row 3 — lower
  { bodyW: 24, bodyH: 38, chainH: 14, top: 420, side: "right", offset: "1%",  anim: "animate-lantern-float-1", delay: "6s" },
  { bodyW: 22, bodyH: 34, chainH: 12, top: 460, side: "left",  offset: "1%",  anim: "animate-lantern-float-3", delay: "7s" },
  // Row 4 — deep
  { bodyW: 20, bodyH: 32, chainH: 10, top: 620, side: "right", offset: "2%",  anim: "animate-lantern-float-2", delay: "8s" },
  { bodyW: 18, bodyH: 28, chainH: 10, top: 640, side: "left",  offset: "2%",  anim: "animate-lantern-float-1", delay: "9s" },
];

interface RamadanHeroBannerProps {
  className?: string;
}

export function RamadanHeroBanner({ className }: RamadanHeroBannerProps) {
  const navy = "oklch(0.30 0.11 260)";
  const glow = "oklch(0.55 0.15 250)";

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none",
        className
      )}
      aria-hidden
      style={{ zIndex: 0 }}
    >
      {/* ── Top gradient wash ── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: 500,
          background: `linear-gradient(
            180deg,
            oklch(0.91 0.035 250 / 0.4) 0%,
            oklch(0.94 0.02 250 / 0.2) 35%,
            oklch(0.97 0.008 250 / 0.06) 70%,
            transparent 100%
          )`,
        }}
      />

      {/* ── All lanterns ── */}
      {LANTERNS.map((l, i) => (
        <HangingLantern
          key={i}
          bodyW={l.bodyW}
          bodyH={l.bodyH}
          chainH={l.chainH}
          color={navy}
          glowColor={glow}
          className={`absolute ${l.anim}`}
          style={{
            top: l.top,
            [l.side]: l.offset,
            width: l.bodyW * 3,
            height: l.chainH + l.bodyH + l.bodyW * 0.6,
            animationDelay: l.delay,
          }}
        />
      ))}

      {/* ── Crescent moon ── */}
      <svg
        className="absolute animate-drift-slow"
        viewBox="0 0 32 32"
        style={{ top: 6, right: "15%", width: 24, height: 24, opacity: 0.2 }}
      >
        <path d="M22 4a14 14 0 000 24 14 14 0 110-24z" fill={navy} />
      </svg>

      {/* ── Stars ── */}
      {[
        { t: 16, l: "8%", s: 7, d: "0s", o: 0.25 },
        { t: 8,  r: "26%", s: 6, d: "1.4s", o: 0.22 },
        { t: 50, r: "10%", s: 5, d: "0.7s", o: 0.18 },
        { t: 95, l: "4%",  s: 5, d: "2.2s", o: 0.16 },
        { t: 170, r: "6%", s: 4, d: "3.5s", o: 0.14 },
        { t: 30, l: "22%", s: 4, d: "1.8s", o: 0.16 },
        { t: 130, r: "20%", s: 4, d: "4.2s", o: 0.12 },
        { t: 250, l: "6%",  s: 3, d: "5s",   o: 0.1 },
      ].map((s, i) => (
        <svg
          key={i}
          className={`absolute ${i % 2 === 0 ? "animate-twinkle" : "animate-twinkle-alt"}`}
          viewBox="0 0 10 10"
          fill={navy}
          style={{
            top: s.t,
            left: "l" in s ? s.l : undefined,
            right: "r" in s ? s.r : undefined,
            width: s.s,
            height: s.s,
            opacity: s.o,
            animationDelay: s.d,
          }}
        >
          <path d="M5 0L5.8 3.5 10 5 5.8 6.5 5 10 4.2 6.5 0 5 4.2 3.5z" />
        </svg>
      ))}
    </div>
  );
}
