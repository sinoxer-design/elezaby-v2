"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Grid3X3, User, Flame, FileUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSnappy, springBouncy, easeStandard } from "@/lib/motion";
import { useScroll } from "@/hooks/useScroll";
import { RxUploadSheet } from "@/components/commerce/RxUploadSheet";

interface NavItem {
  href: string;
  icon: typeof Home;
  label: string;
  elevated?: boolean;
  isAction?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories", icon: Grid3X3, label: "Categories" },
  { href: "/products?sale=true", icon: Flame, label: "Sales", elevated: true },
  { href: "#rx-upload", icon: FileUp, label: "Upload Rx", isAction: true },
  { href: "/account", icon: User, label: "Account" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { scrollDirection } = useScroll();
  const isHidden = scrollDirection === "down";
  const [rxSheetOpen, setRxSheetOpen] = React.useState(false);

  return (
    <>
      <motion.nav
        initial={false}
        animate={isHidden ? { y: "calc(100% + 2rem)" } : { y: 0 }}
        transition={{ duration: 0.3, ease: easeStandard }}
        className="fixed inset-x-0 bottom-0 z-sticky border-t border-sand-200 bg-white/95 backdrop-blur-md shadow-bottom-nav lg:hidden"
        style={{ paddingBottom: "var(--safe-area-bottom)" }}
      >
        <div className="mx-auto flex h-[var(--bottom-nav-height)] max-w-lg items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : !item.isAction && pathname.startsWith(item.href.split("?")[0]);

            // ── Elevated Sales Button ──────────────────────────
            if (item.elevated) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center gap-0.5 px-3 py-2"
                >
                  <motion.div
                    className="relative -mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-deal to-amber-500 text-white shadow-elevated"
                    whileTap={{ scale: 0.9 }}
                    transition={springSnappy}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-deal/30"
                      animate={
                        isHidden
                          ? { opacity: 0, scale: 1 }
                          : { opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }
                      }
                      transition={
                        isHidden
                          ? { duration: 0 }
                          : {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    />
                    <Flame className="relative h-6 w-6" strokeWidth={2.5} />
                  </motion.div>
                  <span className="text-[0.625rem] font-bold text-deal">
                    {item.label}
                  </span>
                </Link>
              );
            }

            // ── RX Upload Action Button ──────────────────────
            if (item.isAction) {
              return (
                <button
                  key={item.href}
                  onClick={() => setRxSheetOpen(true)}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 px-3 py-2 transition-colors duration-200",
                    rxSheetOpen ? "text-brand-600" : "text-sand-400"
                  )}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: rxSheetOpen ? 1.1 : 1 }}
                      transition={springSnappy}
                    >
                      <item.icon
                        className="h-5 w-5"
                        strokeWidth={rxSheetOpen ? 2.5 : 1.5}
                      />
                    </motion.div>
                  </div>
                  <span className="text-[0.625rem] font-medium">{item.label}</span>
                </button>
              );
            }

            // ── Standard Nav Item ──────────────────────────────
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 px-3 py-2 transition-colors duration-200",
                  isActive ? "text-brand-600" : "text-sand-400"
                )}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-[1px] h-0.5 w-8 rounded-full bg-brand-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={springBouncy}
                    />
                  )}
                </AnimatePresence>

                <div className="relative">
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={springSnappy}
                  >
                    <item.icon
                      className="h-5 w-5"
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                  </motion.div>
                </div>

                <span className="text-[0.625rem] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      <RxUploadSheet open={rxSheetOpen} onOpenChange={setRxSheetOpen} />
    </>
  );
}
