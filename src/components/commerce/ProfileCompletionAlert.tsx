"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";

export function ProfileCompletionAlert() {
  const { profile, updateProfile, isProfileComplete, completionPercentage } =
    useUserProfile();
  const [dismissed, setDismissed] = React.useState(false);

  // Check if alert should be hidden (dismissed within last 24h)
  const shouldHide = React.useMemo(() => {
    if (isProfileComplete) return true;
    if (dismissed) return true;
    if (profile.profileDismissedAt) {
      const dismissedAt = new Date(profile.profileDismissedAt).getTime();
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
      if (dismissedAt > twentyFourHoursAgo) return true;
    }
    return false;
  }, [isProfileComplete, dismissed, profile.profileDismissedAt]);

  const handleDismiss = () => {
    setDismissed(true);
    updateProfile({ profileDismissedAt: new Date().toISOString() });
  };

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="px-[var(--page-padding-x)] lg:px-8"
      >
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card border border-sand-200 dark:border-border shadow-sm p-4">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute end-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-sand-200/50 dark:bg-secondary text-sand-500 dark:text-muted-foreground hover:bg-sand-200 dark:hover:bg-secondary/80 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-cyan-500 text-white">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0 pe-6">
              <h3 className="text-sm font-bold text-sand-800 dark:text-foreground">
                Complete your profile
              </h3>
              <p className="mt-0.5 text-xs text-sand-500 dark:text-muted-foreground">
                Get personalized recommendations and exclusive offers
              </p>

              {/* Progress bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-sand-100 dark:bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-bold text-brand-600 dark:text-primary tabular-nums">
                  {completionPercentage}%
                </span>
              </div>

              {/* CTA */}
              <Button
                size="sm"
                className="mt-3 h-8 rounded-lg text-xs"
                asChild
              >
                <Link href="/account/profile">Complete Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
