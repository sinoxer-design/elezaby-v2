"use client";

import * as React from "react";
import { MapPin, Navigation, ChevronDown, ChevronUp, CircleCheck, CircleX, Clock, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ── Mock branch data ── */
const MOCK_BRANCHES = [
  { id: "b1", name: "Elezaby — Nasr City", area: "Nasr City", distance: "0.8 km", phone: "02-2271-1234", hours: "8 AM – 12 AM", inStock: true, qty: 12 },
  { id: "b2", name: "Elezaby — Heliopolis", area: "Heliopolis", distance: "2.1 km", phone: "02-2418-5678", hours: "8 AM – 11 PM", inStock: true, qty: 5 },
  { id: "b3", name: "Elezaby — Maadi", area: "Maadi", distance: "8.4 km", phone: "02-2359-9012", hours: "9 AM – 11 PM", inStock: false, qty: 0 },
  { id: "b4", name: "Elezaby — Zamalek", area: "Zamalek", distance: "6.2 km", phone: "02-2735-3456", hours: "8 AM – 12 AM", inStock: true, qty: 3 },
  { id: "b5", name: "Elezaby — 6th October", area: "6th October City", distance: "22 km", phone: "02-3837-7890", hours: "9 AM – 10 PM", inStock: true, qty: 18 },
  { id: "b6", name: "Elezaby — New Cairo", area: "New Cairo", distance: "12 km", phone: "02-2617-2345", hours: "8 AM – 12 AM", inStock: false, qty: 0 },
];

interface StoreAvailabilityProps {
  inStock?: boolean;
}

export function StoreAvailability({ inStock = true }: StoreAvailabilityProps) {
  const [sectionOpen, setSectionOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [detecting, setDetecting] = React.useState(false);
  const [detected, setDetected] = React.useState(false);
  const [selectedArea, setSelectedArea] = React.useState("");

  // Simulate location detection
  const handleDetect = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      setDetected(true);
      setSelectedArea("Nasr City, Cairo");
      setExpanded(true);
    }, 1200);
  };

  // Sort: in-stock first, then by distance
  const sortedBranches = [...MOCK_BRANCHES].sort((a, b) => {
    if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  const visibleBranches = expanded ? sortedBranches : sortedBranches.slice(0, 3);
  const inStockCount = MOCK_BRANCHES.filter((b) => b.inStock).length;

  return (
    <div className="rounded-xl border border-sand-200 overflow-hidden">
      {/* Header — clickable to collapse */}
      <button
        onClick={() => setSectionOpen(!sectionOpen)}
        className="flex w-full items-center justify-between p-3 bg-sand-50/50 transition-colors hover:bg-sand-100/50"
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-semibold text-sand-800">Store Availability</span>
          <span className="text-[0.6rem] font-medium text-sand-400">
            {inStockCount}/{MOCK_BRANCHES.length}
          </span>
        </div>
        <motion.div animate={{ rotate: sectionOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-sand-400" />
        </motion.div>
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
      {sectionOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >

      {/* Location detector */}
      <div className="flex items-center gap-2 border-t border-sand-100 px-3 py-2.5">
        {detected ? (
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-brand-50 px-2.5 py-1.5">
            <Navigation className="h-3 w-3 text-brand-500" />
            <span className="text-xs font-medium text-brand-700">{selectedArea}</span>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5 text-xs"
            onClick={handleDetect}
            disabled={detecting}
          >
            <Navigation className={cn("h-3.5 w-3.5", detecting && "animate-pulse")} />
            {detecting ? "Detecting..." : "Use My Location"}
          </Button>
        )}
        <span className="text-[0.6rem] text-sand-400">or</span>
        <select
          className="flex-1 rounded-lg border border-sand-200 bg-white px-2 py-1.5 text-xs text-sand-700 focus:border-brand-500 focus:outline-none"
          value={selectedArea}
          onChange={(e) => {
            setSelectedArea(e.target.value);
            setDetected(true);
            setExpanded(true);
          }}
        >
          <option value="">Select area</option>
          <option value="Nasr City, Cairo">Nasr City</option>
          <option value="Heliopolis, Cairo">Heliopolis</option>
          <option value="Maadi, Cairo">Maadi</option>
          <option value="Zamalek, Cairo">Zamalek</option>
          <option value="New Cairo">New Cairo</option>
          <option value="6th October City">6th October</option>
        </select>
      </div>

      {/* Branch list */}
      <div className="border-t border-sand-100">
        <AnimatePresence initial={false}>
          {visibleBranches.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-b border-sand-50 last:border-0"
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                {/* Status indicator */}
                {branch.inStock ? (
                  <CircleCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <CircleX className="h-4 w-4 shrink-0 text-red-400" />
                )}

                {/* Branch info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-xs font-semibold text-sand-800">{branch.name}</p>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[0.6rem] text-sand-500">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="h-2.5 w-2.5" />
                      {branch.distance}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-2.5 w-2.5" />
                      {branch.hours}
                    </span>
                  </div>
                </div>

                {/* Stock badge */}
                <div className="shrink-0">
                  {branch.inStock ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[0.55rem] font-bold text-emerald-700">
                      In Stock ({branch.qty})
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[0.55rem] font-bold text-red-500">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show more/less */}
        {MOCK_BRANCHES.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-center gap-1 border-t border-sand-100 py-2 text-[0.65rem] font-semibold text-brand-500 transition-colors hover:bg-sand-50"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Show All {MOCK_BRANCHES.length} Branches <ChevronDown className="h-3 w-3" /></>
            )}
          </button>
        )}
      </div>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
