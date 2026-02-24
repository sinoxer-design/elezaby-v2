"use client";

import * as React from "react";
import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PrescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onSubmit: () => void;
}

export function PrescriptionDialog({
  open,
  onOpenChange,
  productName,
  onSubmit,
}: PrescriptionDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setIsSubmitting(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    onSubmit();
    // Reset state after close animation
    setTimeout(() => {
      setFile(null);
    }, 300);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setFile(null);
        setIsSubmitting(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-xl sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold text-sand-800">
            Upload Prescription
          </DialogTitle>
          <DialogDescription className="text-sm text-sand-500">
            A valid prescription is required for{" "}
            <span className="font-medium text-sand-700">{productName}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Upload Area */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 transition-colors",
            file
              ? "border-brand-300 bg-brand-50"
              : "border-sand-300 bg-sand-50 hover:border-brand-400 hover:bg-sand-100"
          )}
        >
          {file ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-brand-500" />
              <div className="text-center">
                <p className="text-sm font-medium text-sand-700">
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-sand-400">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
              <span className="text-xs text-brand-500">
                Tap to change file
              </span>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-200 transition-colors group-hover:bg-brand-100">
                <Upload className="h-5 w-5 text-sand-500 transition-colors group-hover:text-brand-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-sand-700">
                  Tap to upload
                </p>
                <p className="mt-0.5 text-xs text-sand-400">
                  JPG, PNG or PDF, max 5MB
                </p>
              </div>
            </>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Submit Button */}
        <Button
          variant="add-to-cart"
          size="pdp-cta"
          onClick={handleSubmit}
          disabled={!file || isSubmitting}
          className="rounded-xl"
        >
          {isSubmitting ? "Uploading..." : "Submit Prescription"}
        </Button>

        {/* Note */}
        <p className="text-center text-xs leading-relaxed text-sand-400">
          Your prescription will be verified by our pharmacist within 30 minutes
        </p>
      </DialogContent>
    </Dialog>
  );
}
