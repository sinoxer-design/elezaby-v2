"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Truck, Heart, Stethoscope, Sparkles } from "lucide-react";

const screens = [
  {
    title: "Your Health, Delivered",
    description:
      "Get medicines, health products, and personal care items delivered to your door",
    icons: [Truck, Heart],
    color: "bg-brand-100",
    iconColor: "text-brand-600",
  },
  {
    title: "Expert Pharmacy Care",
    description:
      "Upload prescriptions easily and get pharmacist guidance",
    icons: [Stethoscope],
    color: "bg-blue-50",
    iconColor: "text-info",
  },
  {
    title: "Personalized For You",
    description:
      "Discover products tailored to your health needs and preferences",
    icons: [Sparkles],
    color: "bg-amber-50",
    iconColor: "text-warning",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function OnboardingWelcomePage() {
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const isLast = current === screens.length - 1;
  const screen = screens[current];

  const goNext = () => {
    if (isLast) {
      router.push("/onboarding/interests");
    } else {
      setDirection(1);
      setCurrent((prev) => prev + 1);
    }
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-brand-50 px-[var(--page-padding-x)]">
      {/* Skip Link */}
      <div className="flex h-14 items-center justify-end">
        <Link
          href="/auth/register"
          className="text-sm font-medium text-sand-500 transition-colors hover:text-sand-700"
        >
          Skip
        </Link>
      </div>

      {/* Screen Content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative w-full max-w-sm overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col items-center gap-8"
            >
              {/* Icon Area */}
              <div
                className={`flex h-48 w-48 items-center justify-center rounded-full ${screen.color}`}
              >
                <div className="flex items-center gap-2">
                  {screen.icons.map((Icon, i) => (
                    <Icon
                      key={i}
                      className={`h-16 w-16 ${screen.iconColor}`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="text-2xl font-bold text-sand-800">
                  {screen.title}
                </h1>
                <p className="max-w-xs text-sm leading-relaxed text-sand-500">
                  {screen.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center gap-6 pb-12">
        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to screen ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-brand-500"
                  : "w-2 bg-sand-300"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          size="pdp-cta"
          onClick={goNext}
          className="max-w-sm"
        >
          {isLast ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
