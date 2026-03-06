"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Grid3X3, User, Flame, FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OrderPrescriptionUpload } from "@/components/commerce/OrderPrescriptionUpload";
import { Button } from "@/components/ui/button";

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

type RxStatus = "idle" | "validating" | "success";

export function BottomNav() {
  const pathname = usePathname();
  const [rxSheetOpen, setRxSheetOpen] = React.useState(false);
  const [rxFiles, setRxFiles] = React.useState<File[]>([]);
  const [rxStatus, setRxStatus] = React.useState<RxStatus>("idle");

  const handleSubmitRx = () => {
    if (rxFiles.length === 0) return;
    setRxStatus("validating");
    setTimeout(() => {
      setRxStatus("success");
      setTimeout(() => {
        setRxSheetOpen(false);
        // Reset after sheet close animation
        setTimeout(() => {
          setRxFiles([]);
          setRxStatus("idle");
        }, 300);
      }, 2000);
    }, 1500);
  };

  const handleSheetChange = (open: boolean) => {
    setRxSheetOpen(open);
    if (!open) {
      setTimeout(() => {
        setRxFiles([]);
        setRxStatus("idle");
      }, 300);
    }
  };

  return (
    <>
      <nav
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
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-deal/30"
                      animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
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
                {/* Active indicator bar */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-[1px] h-0.5 w-8 rounded-full bg-brand-600"
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
      </nav>

      {/* RX Upload Sheet */}
      <Sheet open={rxSheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent side="bottom" className="rounded-t-2xl px-5 pb-8 pt-4">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-center text-lg font-bold text-sand-800">
              Upload Prescription
            </SheetTitle>
            <p className="text-center text-sm text-sand-500">
              Upload a photo of your prescription and we&apos;ll validate it
            </p>
          </SheetHeader>

          <AnimatePresence mode="wait">
            {rxStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <p className="text-base font-semibold text-sand-800">
                  Prescription Validated
                </p>
                <p className="text-sm text-sand-500">
                  Your prescription has been approved successfully
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <OrderPrescriptionUpload
                  files={rxFiles}
                  onFilesChange={setRxFiles}
                />

                <Button
                  onClick={handleSubmitRx}
                  disabled={rxFiles.length === 0 || rxStatus === "validating"}
                  className="h-12 w-full rounded-xl bg-brand-700 text-base font-bold text-white hover:bg-brand-600 disabled:opacity-50"
                >
                  {rxStatus === "validating" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Validating...
                    </span>
                  ) : (
                    "Submit Prescription"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </>
  );
}
