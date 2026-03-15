"use client";

import * as React from "react";
import Image from "next/image";
import { Bell, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CompareSheet } from "./CompareSheet";
import { type ProductData } from "./ProductCard";
import { getSimilarProducts } from "@/lib/data/products";
import { useOverlaySheet } from "@/hooks/useOverlaySheet";

interface NotifyMeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  product?: ProductData;
  onAddToCart?: (productId: string) => void;
  onSubmit: (email: string) => void;
}

export function NotifyMeDialog({
  open,
  onOpenChange,
  productName,
  product,
  onAddToCart,
  onSubmit,
}: NotifyMeDialogProps) {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const { setSheetOpen } = useOverlaySheet();

  // Hide floating cart button when dialog is open
  React.useEffect(() => {
    setSheetOpen(open);
    return () => setSheetOpen(false);
  }, [open, setSheetOpen]);

  const similarProducts = React.useMemo(
    () => (product ? getSimilarProducts(product.id) : []),
    [product]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitting(false);
    setIsSuccess(true);
    onSubmit(email);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      // Reset state after close animation
      setTimeout(() => {
        setEmail("");
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 300);
    }
  };

  const handleBrowseSimilar = () => {
    handleOpenChange(false);
    // Small delay so dialog closes before sheet opens
    setTimeout(() => setCompareOpen(true), 200);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="rounded-xl sm:max-w-md">
          {isSuccess ? (
            /* Success State */
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 className="h-7 w-7 text-brand-500" />
              </div>
              <h3 className="text-lg font-semibold text-sand-800">
                You&apos;ll be notified!
              </h3>
              <p className="text-center text-sm text-sand-500">
                We&apos;ll send a notification to{" "}
                <span className="font-medium text-sand-700">{email}</span> when{" "}
                <span className="font-medium text-sand-700">{productName}</span>{" "}
                is back in stock.
              </p>

              {/* Browse Similar after success */}
              {product && similarProducts.length > 0 && (
                <button
                  type="button"
                  onClick={handleBrowseSimilar}
                  className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Browse similar products
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}

              <Button
                variant="outline"
                size="default"
                onClick={() => handleOpenChange(false)}
                className="mt-2 rounded-xl"
              >
                Close
              </Button>
            </div>
          ) : (
            /* Form State */
            <>
              <DialogHeader className="items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-100">
                  <Bell className="h-6 w-6 text-sand-600" />
                </div>
                <DialogTitle className="text-lg font-semibold text-sand-800">
                  Get Notified
                </DialogTitle>
                <DialogDescription className="text-sm text-sand-500">
                  We&apos;ll notify you when{" "}
                  <span className="font-medium text-sand-700">
                    {productName}
                  </span>{" "}
                  is back in stock
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="notify-email"
                    className="mb-1.5 block text-sm font-medium text-sand-600"
                  >
                    Email address
                  </label>
                  <Input
                    id="notify-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl border-sand-200 bg-sand-50 focus-visible:border-brand-500 focus-visible:ring-brand-500/20"
                  />
                </div>

                <Button
                  type="submit"
                  variant="add-to-cart"
                  size="pdp-cta"
                  disabled={!email || isSubmitting}
                  className="rounded-xl"
                >
                  {isSubmitting ? "Submitting..." : "Notify Me"}
                </Button>
              </form>

              {/* Browse Similar — shown in form state too */}
              {product && similarProducts.length > 0 && (
                <div className="-mx-6 -mb-6 border-t border-sand-100">
                  <button
                    type="button"
                    onClick={handleBrowseSimilar}
                    className="flex w-full items-center gap-3.5 rounded-b-xl bg-sand-50 px-6 py-4 transition-colors hover:bg-sand-100"
                  >
                    {/* Preview of similar product images */}
                    <div className="flex -space-x-2.5">
                      {similarProducts.slice(0, 3).map((p) => (
                        <div
                          key={p.id}
                          className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-white bg-sand-100"
                        >
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0 flex-1 text-start">
                      <p className="text-sm font-semibold text-sand-700">
                        Browse similar products
                      </p>
                      <p className="text-xs text-sand-400">
                        {similarProducts.length} alternatives available
                      </p>
                    </div>
                    <ArrowRight className="h-4.5 w-4.5 shrink-0 text-sand-400" />
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Sheet — opened from the dialog */}
      {product && (
        <CompareSheet
          open={compareOpen}
          onOpenChange={setCompareOpen}
          product={product}
          similarProducts={similarProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
}
