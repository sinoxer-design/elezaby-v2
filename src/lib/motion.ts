// Shared Framer Motion transition presets
// Keeps animation configs consistent across the app

// ── Spring presets ──────────────────────────────────────
export const springDefault = { type: "spring" as const, stiffness: 400, damping: 25 };
export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 20 };
export const springStiff = { type: "spring" as const, stiffness: 400, damping: 30 };
export const springGentle = { type: "spring" as const, stiffness: 300, damping: 25 };
export const springGentleLoose = { type: "spring" as const, stiffness: 300, damping: 20 };
export const springBouncy = { type: "spring" as const, stiffness: 500, damping: 30 };

// ── Easing curves ───────────────────────────────────────
export const easeStandard = [0.4, 0, 0.2, 1] as const;
export const easeSmooth = [0.22, 1, 0.36, 1] as const;
export const easeDecelerate = [0.16, 1, 0.3, 1] as const;
