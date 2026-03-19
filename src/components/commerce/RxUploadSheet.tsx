"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Shield, Banknote, ChevronLeft, FileText, Building2 } from "lucide-react";
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

type PaymentMethod = "insurance" | "cash" | null;
type RxStep = "payment_method" | "upload" | "submitting" | "submitted";

const INSURANCE_PROVIDERS = [
  "Select provider",
  "AXA Egypt",
  "Allianz Egypt",
  "MetLife Egypt",
  "Bupa Egypt",
  "Medgulf Insurance",
  "Royal & Sun Alliance",
  "Egyptian Saudi Insurance",
];

interface RxUploadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RxUploadSheet({ open, onOpenChange }: RxUploadSheetProps) {
  const router = useRouter();
  const rxOrders = useRxOrders();
  const [rxFiles, setRxFiles] = React.useState<File[]>([]);
  const [rxStep, setRxStep] = React.useState<RxStep>("payment_method");
  const [rxNote, setRxNote] = React.useState("");
  const [rxOrderType, setRxOrderType] = React.useState<RxOrderType>("rx_only");
  const [submittedOrderId, setSubmittedOrderId] = React.useState("");

  // Payment & insurance fields
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(null);
  const [nationalId, setNationalId] = React.useState("");
  const [insuranceProvider, setInsuranceProvider] = React.useState("");

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

  const resetAll = () => {
    setRxFiles([]);
    setRxStep("payment_method");
    setRxNote("");
    setRxOrderType("rx_only");
    setSubmittedOrderId("");
    setPaymentMethod(null);
    setNationalId("");
    setInsuranceProvider("");
  };

  const handleSheetChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setTimeout(resetAll, 300);
    }
  };

  const handleTrackOrder = () => {
    onOpenChange(false);
    setTimeout(() => {
      router.push(`/account/orders/rx/${submittedOrderId}`);
      resetAll();
    }, 300);
  };

  const stepTitle = {
    payment_method: "Upload Prescription",
    upload: paymentMethod === "insurance" ? "Insurance Details" : "Upload Prescription",
    submitting: "Submitting...",
    submitted: "Prescription Submitted",
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetChange}>
      <SheetContent side="bottom" className="rounded-t-2xl px-5 pb-8 pt-4">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-center text-lg font-bold text-sand-800">
            {stepTitle[rxStep]}
          </SheetTitle>
          {rxStep === "payment_method" && (
            <p className="text-center text-sm text-sand-500">
              How would you like to pay for this prescription?
            </p>
          )}
        </SheetHeader>

        <AnimatePresence mode="wait">
          {/* Step 0: Payment Method */}
          {rxStep === "payment_method" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("insurance");
                  setRxStep("upload");
                }}
                className="flex items-center gap-4 rounded-2xl border-2 border-sand-200 bg-white p-4 transition-all hover:border-brand-300 hover:bg-brand-50/30 active:scale-[0.98]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                  <Shield className="h-6 w-6 text-brand-600" />
                </div>
                <div className="text-start">
                  <p className="text-sm font-bold text-sand-800">Insurance will cover it</p>
                  <p className="mt-0.5 text-[0.7rem] text-sand-500">
                    We&apos;ll verify coverage with your provider
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setPaymentMethod("cash");
                  setRxStep("upload");
                }}
                className="flex items-center gap-4 rounded-2xl border-2 border-sand-200 bg-white p-4 transition-all hover:border-sand-300 hover:bg-sand-50/30 active:scale-[0.98]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <Banknote className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-start">
                  <p className="text-sm font-bold text-sand-800">Proceed with Cash</p>
                  <p className="mt-0.5 text-[0.7rem] text-sand-500">
                    Pay upon delivery or at the pharmacy
                  </p>
                </div>
              </button>

              <p className="mt-2 text-center text-[0.65rem] text-sand-400">
                Don&apos;t have a prescription?{" "}
                <span className="font-semibold text-brand-500">Consult our Doctor</span>
              </p>
            </motion.div>
          )}

          {/* Step 1: Upload + Insurance details */}
          {rxStep === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              {/* Back button */}
              <button
                type="button"
                onClick={() => setRxStep("payment_method")}
                className="flex items-center gap-1 text-xs font-medium text-brand-500"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Change payment method
              </button>

              {/* Payment method indicator */}
              <div className={cn(
                "flex items-center gap-2.5 rounded-xl p-3",
                paymentMethod === "insurance" ? "bg-brand-50 border border-brand-100" : "bg-emerald-50 border border-emerald-100"
              )}>
                {paymentMethod === "insurance" ? (
                  <Shield className="h-4 w-4 text-brand-600" />
                ) : (
                  <Banknote className="h-4 w-4 text-emerald-600" />
                )}
                <span className={cn(
                  "text-xs font-semibold",
                  paymentMethod === "insurance" ? "text-brand-700" : "text-emerald-700"
                )}>
                  {paymentMethod === "insurance" ? "Insurance Coverage" : "Cash Payment"}
                </span>
              </div>

              {/* Insurance-specific fields */}
              {paymentMethod === "insurance" && (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-sand-600">
                      <FileText className="h-3 w-3" />
                      National ID / Iqama ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 14))}
                        placeholder="Enter your ID number"
                        className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-sm text-sand-800 placeholder:text-sand-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                      />
                      {nationalId.length >= 10 && (
                        <CheckCircle2 className="absolute end-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-sand-600">
                      <Building2 className="h-3 w-3" />
                      Insurance Provider
                    </label>
                    <select
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2.5 text-sm text-sand-800 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                    >
                      {INSURANCE_PROVIDERS.map((p) => (
                        <option key={p} value={p === "Select provider" ? "" : p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    {insuranceProvider && (
                      <p className="mt-1 text-[0.6rem] text-sand-400">
                        Terms and conditions of your insurance provider will apply*
                      </p>
                    )}
                  </div>
                </div>
              )}

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
                disabled={
                  rxFiles.length === 0 ||
                  (paymentMethod === "insurance" && (nationalId.length < 10 || !insuranceProvider))
                }
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
                {paymentMethod === "insurance" && (
                  <p className="mt-2 text-xs text-brand-600 font-medium">
                    Insurance: {insuranceProvider}
                  </p>
                )}
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
