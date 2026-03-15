"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { springGentleLoose } from "@/lib/motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OrderPrescriptionUpload } from "@/components/commerce/OrderPrescriptionUpload";
import { Button } from "@/components/ui/button";
import { useRxOrders } from "@/hooks/useRxOrders";
import type { RxOrderType } from "@/lib/data/rx";

type RxStep = "upload" | "submitting" | "submitted";

interface RxUploadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RxUploadSheet({ open, onOpenChange }: RxUploadSheetProps) {
  const router = useRouter();
  const rxOrders = useRxOrders();
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

  const handleSheetChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
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
    onOpenChange(false);
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
    <Sheet open={open} onOpenChange={handleSheetChange}>
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
                transition={{ ...springGentleLoose, delay: 0.1 }}
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
  );
}
