"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Grid3X3, Search, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/categories", icon: Grid3X3, label: "Categories" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/account", icon: User, label: "Account" },
];

interface BottomNavProps {
  cartCount?: number;
}

export function BottomNav({ cartCount = 0 }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-sticky border-t border-sand-200 bg-white/95 dark:bg-background/95 dark:border-border backdrop-blur-md shadow-bottom-nav lg:hidden"
      style={{ paddingBottom: "var(--safe-area-bottom)" }}
    >
      <div className="mx-auto flex h-[var(--bottom-nav-height)] max-w-lg items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 px-4 py-2 transition-colors duration-200",
                isActive ? "text-brand-500" : "text-sand-400"
              )}
            >
              {/* Active indicator bar */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-[1px] h-0.5 w-8 rounded-full bg-brand-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative">
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <item.icon
                    className="h-6 w-6"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>

                {/* Cart badge */}
                <AnimatePresence>
                  {item.label === "Cart" && cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -end-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[9px] font-bold text-white"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
