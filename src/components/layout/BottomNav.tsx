"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Grid3X3, User, Flame, FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/useScroll";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OrderPrescriptionUpload } from "@/components/commerce/OrderPrescriptionUpload";
import { Button } from "@/components/ui/button";
import { useRxOrders } from "@/hooks/useRxOrders";
import type { RxOrderType } from "@/lib/mock-data";

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

type RxStep = "upload" | "submitting" | "submitted";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const rxOrders = useRxOrders();
  const { scrollDirection } = useScroll();
  const isHidden = scrollDirection === "down";
  const [rxSheetOpen, setRxSheetOpen] = React.useState(false);
  const [rxFiles, setRxFiles] = React.useState<File[]>([]);
  const [rxStep, setRxStep] = React.useState<RxStep>("upload");
  const [rxNote, setRxNote] = React.useState("");
  const [rxOrderType, setRxOrderType] = React.useState<RxOrderType>("rx_only");
  const [submittedOrderId, setSubmittedOrderId] = React.useState("");

  const handleSubmitRx = () => {
    if (rxFiles.length === 0) return;
    setRxStep("submitting");

    setTimeout(() => {
      const fileNames = rxFiles.map((f) => f.name);
      const orderId = rxOrders.submitPrescription(fileNames, rxNote, rxOrderType);
      setSubmittedOrderId(orderId);
      setRxStep("submitted");
    }, 1000);
  };

  const handleSheetChange = (open: boolean) => {
    setRxSheetOpen(open);
    if (!open) {
      setTimeout(() => {
        setRxFiles([]);
        setRxStep("upload");
        setRxNote("");
        setRxOrderType("rx_only");
        setSubmittedOrderId("");
      }, 300);
    }
  };

  const handleTrackOrder = () => {
    setRxSheetOpen(false);
    setTimeout(() => {
      router.push(`/account/orders/rx/${submittedOrderId}`);
      setRxFiles([]);
      setRxStep("upload");
      setRxNote("");
      setRxOrderType("rx_only");
      setSubmittedOrderId("");
    }, 300);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={isHidden ? { y: "calc(100% + 2rem)" } : { y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
      </motion.nav>

      {/* RX Upload Sheet — 3-step flow */}
      <Sheet open={rxSheetOpen} onOpenChange={handleSheetChange}>
        <SheetContent side="bottom" className="rounded-t-2xl px-5 pb-8 pt-4">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-center text-lg font-bold text-sand-800">
              {rxStep === "submitted" ? "Prescription Submitted" : "Upload Prescription"}
            </SheetTitle>
            {rxStep === "upload" && (
              <p className="text-center text-sm text-sand-500">
                Upload your prescription and a pharmacist will review it
              </p>
            )}
          </SheetHeader>

          <AnimatePresence mode="wait">
            {/* Step 1: Upload */}
            {rxStep === "upload" && (
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

                {/* Note for pharmacist */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sand-600">
                    Note for pharmacist (optional)
                  </label>
                  <textarea
                    value={rxNote}
                    onChange={(e) => setRxNote(e.target.value)}
                    placeholder="e.g. Monthly refill, need generic alternatives..."
                    className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-sm text-sand-800 placeholder:text-sand-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    rows={2}
                  />
                </div>

                {/* Order type toggle */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-sand-600">
                    Order type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRxOrderType("rx_only")}
                      className={cn(
                        "rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                        rxOrderType === "rx_only"
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-sand-200 bg-white text-sand-500 hover:border-sand-300"
                      )}
                    >
                      RX Only
                    </button>
                    <button
                      type="button"
                      onClick={() => setRxOrderType("mixed")}
                      className={cn(
                        "rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                        rxOrderType === "mixed"
                          ? "border-brand-600 bg-brand-50 text-brand-700"
                          : "border-sand-200 bg-white text-sand-500 hover:border-sand-300"
                      )}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitRx}
                  disabled={rxFiles.length === 0}
                  className="h-12 w-full rounded-xl bg-brand-700 text-base font-bold text-white hover:bg-brand-600 disabled:opacity-50"
                >
                  Submit Prescription
                </Button>
              </motion.div>
            )}

            {/* Step 2: Submitting */}
            {rxStep === "submitting" && (
              <motion.div
                key="submitting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-10"
              >
                <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
                <p className="text-sm font-medium text-sand-600">
                  Submitting your prescription...
                </p>
              </motion.div>
            )}

            {/* Step 3: Submitted */}
            {rxStep === "submitted" && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <div className="text-center">
                  <p className="text-base font-semibold text-sand-800">
                    Prescription Submitted!
                  </p>
                  <div className="mt-2 inline-block rounded-full bg-brand-50 px-3 py-1">
                    <span className="text-sm font-bold text-brand-700">
                      {submittedOrderId}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-sand-500">
                    A pharmacist will review your prescription shortly
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2 pt-2">
                  <Button
                    onClick={handleTrackOrder}
                    className="h-12 w-full rounded-xl bg-brand-700 text-base font-bold text-white hover:bg-brand-600"
                  >
                    Track Your Prescription
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleSheetChange(false)}
                    className="h-10 w-full text-sm text-sand-500"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    </>
  );
}