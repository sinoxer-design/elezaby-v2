"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface LocationWarningSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeLocation: () => void;
}

export function LocationWarningSheet({
  open,
  onOpenChange,
  onChangeLocation,
}: LocationWarningSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col items-center rounded-t-3xl px-6 pb-8 pt-6"
      >
        <SheetHeader className="flex flex-col items-center gap-3 pb-2">
          {/* Animated pin icon */}
          <motion.div
            initial={{ y: -10, scale: 0.9 }}
            animate={{ y: [0, -8, 0], scale: 1 }}
            transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, scale: { duration: 0.3 } }}
            className="relative"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-brand-100 to-brand-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-brand-500 to-brand-600 shadow-lg">
                <MapPin className="h-7 w-7 text-white" fill="white" fillOpacity={0.3} />
              </div>
            </div>
            {/* Shadow */}
            <motion.div
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -bottom-2 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-brand-200/40 blur-sm"
            />
          </motion.div>

          <SheetTitle className="text-center text-base font-bold text-sand-800">
            Your location is too far from last store
          </SheetTitle>
          <SheetDescription className="text-center text-sm text-sand-500">
            We noticed you&apos;re far from your selected delivery area. Update
            your location to see accurate stock and delivery times.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex w-full flex-col gap-2.5">
          <Button
            onClick={() => {
              onChangeLocation();
              onOpenChange(false);
            }}
            className="h-12 w-full rounded-2xl bg-brand-600 text-sm font-bold text-white hover:bg-brand-700"
          >
            Change Location
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-10 w-full text-sm font-semibold text-brand-500"
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
