"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useDeliveryContext, type DeliveryMethod } from "@/hooks/useDeliveryContext";
import {
  Search,
  MapPin,
  Navigation,
  Plus,
  ChevronRight,
  Store,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock data ────────────────────────────────────────────────────────

const AREAS = [
  "Nasr City",
  "Heliopolis",
  "Maadi",
  "Zamalek",
  "Dokki",
  "Mohandessin",
  "New Cairo",
  "6th of October",
  "Sheikh Zayed",
  "Giza",
  "Downtown",
  "Shoubra",
  "Garden City",
  "Ain Shams",
  "Abbassia",
];

const ELEZABY_STORES = [
  { id: "nasr-city", name: "Elezaby — Nasr City", area: "Nasr City", address: "Abbas El Akkad St." },
  { id: "heliopolis", name: "Elezaby — Heliopolis", area: "Heliopolis", address: "Korba, Baghdad St." },
  { id: "maadi", name: "Elezaby — Maadi", area: "Maadi", address: "Road 9, Maadi" },
  { id: "new-cairo", name: "Elezaby — New Cairo", area: "New Cairo", address: "90th Street, Fifth Settlement" },
  { id: "zamalek", name: "Elezaby — Zamalek", area: "Zamalek", address: "26th of July St." },
  { id: "dokki", name: "Elezaby — Dokki", area: "Dokki", address: "Tahrir St." },
  { id: "mohandessin", name: "Elezaby — Mohandessin", area: "Mohandessin", address: "Gameat El Dowal St." },
  { id: "6th-october", name: "Elezaby — 6th of October", area: "6th of October", address: "Al Mehwar Central" },
  { id: "sheikh-zayed", name: "Elezaby — Sheikh Zayed", area: "Sheikh Zayed", address: "Hyper One Mall" },
  { id: "giza", name: "Elezaby — Giza", area: "Giza", address: "Faisal St." },
];

// ── Saved addresses (localStorage) ──────────────────────────────────

interface SavedAddress {
  id: string;
  label: string;
  area: string;
  address: string;
}

const STORAGE_KEY = "elezaby-saved-addresses";

function loadAddresses(): SavedAddress[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as SavedAddress[]) : [];
  } catch {
    return [];
  }
}

function persistAddresses(addresses: SavedAddress[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch {
    // ignore
  }
}

// ── Component ───────────────────────────────────────────────────────

interface LocationPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationPickerSheet({ open, onOpenChange }: LocationPickerSheetProps) {
  const {
    deliveryMethod,
    setDeliveryMethod,
    deliveryAddress,
    setDeliveryAddress,
    pickupStore,
    setPickupStore,
  } = useDeliveryContext();

  const [activeTab, setActiveTab] = React.useState<DeliveryMethod>(deliveryMethod);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [savedAddresses, setSavedAddresses] = React.useState<SavedAddress[]>([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newLabel, setNewLabel] = React.useState("Home");
  const [newArea, setNewArea] = React.useState("");
  const [newAddress, setNewAddress] = React.useState("");

  // Load saved addresses on mount
  React.useEffect(() => {
    setSavedAddresses(loadAddresses());
  }, []);

  // Sync tab with delivery method when opening
  React.useEffect(() => {
    if (open) {
      setActiveTab(deliveryMethod);
      setSearchQuery("");
      setShowAddForm(false);
    }
  }, [open, deliveryMethod]);

  // ── Handlers ────────────────────────────────────────────────────

  const handleSelectAddress = (addr: SavedAddress) => {
    setDeliveryMethod("delivery");
    setDeliveryAddress(`${addr.area}, Cairo`);
    onOpenChange(false);
  };

  const handleSelectArea = (area: string) => {
    setDeliveryMethod("delivery");
    setDeliveryAddress(`${area}, Cairo`);
    onOpenChange(false);
  };

  const handleSelectStore = (store: (typeof ELEZABY_STORES)[0]) => {
    setDeliveryMethod("pickup");
    setPickupStore(store.name);
    onOpenChange(false);
  };

  const handleAddAddress = () => {
    if (!newArea || !newAddress) return;
    const addr: SavedAddress = {
      id: Date.now().toString(),
      label: newLabel || "Home",
      area: newArea,
      address: newAddress,
    };
    const updated = [...savedAddresses, addr];
    setSavedAddresses(updated);
    persistAddresses(updated);
    setShowAddForm(false);
    setNewLabel("Home");
    setNewArea("");
    setNewAddress("");
    handleSelectAddress(addr);
  };

  const handleRemoveAddress = (id: string) => {
    const updated = savedAddresses.filter((a) => a.id !== id);
    setSavedAddresses(updated);
    persistAddresses(updated);
  };

  // ── Search filtering ────────────────────────────────────────────

  const filteredAreas = searchQuery
    ? AREAS.filter((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredStores = searchQuery
    ? ELEZABY_STORES.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : ELEZABY_STORES;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="rounded-t-2xl px-0 pb-0 gap-0 max-h-[85vh]"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-sand-300" />
        </div>

        <SheetHeader className="px-5 pb-3">
          <SheetTitle className="text-lg font-bold text-sand-800">
            Choose Location
          </SheetTitle>
          <SheetDescription className="sr-only">
            Select a delivery address or pickup store
          </SheetDescription>
        </SheetHeader>

        {/* ── Tab Switcher ── */}
        <div className="mx-5 flex rounded-xl bg-sand-100 p-1">
          <button
            onClick={() => setActiveTab("delivery")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all",
              activeTab === "delivery"
                ? "bg-white text-sand-800 shadow-sm"
                : "text-sand-500 hover:text-sand-700"
            )}
          >
            Address
          </button>
          <button
            onClick={() => setActiveTab("pickup")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all",
              activeTab === "pickup"
                ? "bg-white text-sand-800 shadow-sm"
                : "text-sand-500 hover:text-sand-700"
            )}
          >
            Store Pickup
          </button>
        </div>

        {/* ── Search ── */}
        <div className="px-5 pt-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand-400" />
            <Input
              type="text"
              placeholder={
                activeTab === "delivery"
                  ? "Search for your building, area..."
                  : "Search for a store..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-xl bg-sand-50 pl-10 pr-4 text-sm"
            />
          </div>
        </div>

        {/* ── Scrollable Content ── */}
        <div className="mt-3 flex-1 overflow-y-auto px-5 pb-8">
          {activeTab === "delivery" ? (
            <>
              {/* Search results */}
              {searchQuery && filteredAreas.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase text-sand-400">
                    Areas
                  </p>
                  <div className="space-y-1">
                    {filteredAreas.map((area) => (
                      <button
                        key={area}
                        onClick={() => handleSelectArea(area)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-sand-50"
                      >
                        <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
                        <div>
                          <p className="text-sm font-medium text-sand-800">{area}</p>
                          <p className="text-xs text-sand-400">Cairo</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery && filteredAreas.length === 0 && (
                <div className="mb-4 rounded-xl bg-sand-50 p-4 text-center">
                  <p className="text-sm text-sand-500">No areas match &ldquo;{searchQuery}&rdquo;</p>
                </div>
              )}

              {!searchQuery && (
                <>
                  {/* Location enable prompt */}
                  <div className="mb-3 flex items-center gap-3 rounded-xl border border-sand-200 bg-sand-50/50 px-4 py-3">
                    <Navigation className="h-5 w-5 shrink-0 text-brand-500" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-brand-600">
                        Location not enabled
                      </p>
                      <p className="text-xs text-sand-400">
                        Enable for seamless deliveries
                      </p>
                    </div>
                    <button className="rounded-lg border border-brand-500 px-4 py-1.5 text-xs font-semibold text-brand-600 transition-colors hover:bg-brand-50">
                      Enable
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-b border-dashed border-sand-200 mb-3" />

                  {/* Add new address */}
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-sand-50"
                    >
                      <Plus className="h-5 w-5 shrink-0 text-brand-500" />
                      <span className="flex-1 text-sm font-semibold text-brand-600">
                        Add new address
                      </span>
                      <ChevronRight className="h-4 w-4 text-sand-400" />
                    </button>
                  )}

                  {/* Add address form */}
                  {showAddForm && (
                    <div className="mb-4 space-y-3 rounded-xl border border-brand-200 bg-brand-50/30 p-4">
                      <p className="text-sm font-bold text-sand-800">New Address</p>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-sand-600">Label</label>
                        <div className="flex gap-2">
                          {["Home", "Work", "Other"].map((l) => (
                            <button
                              key={l}
                              onClick={() => setNewLabel(l)}
                              className={cn(
                                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                                newLabel === l
                                  ? "border-brand-500 bg-brand-50 text-brand-600"
                                  : "border-sand-200 bg-white text-sand-600 hover:border-sand-300"
                              )}
                            >
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-sand-600">Area</label>
                        <select
                          value={newArea}
                          onChange={(e) => setNewArea(e.target.value)}
                          className="h-10 w-full appearance-none rounded-xl border border-sand-200 bg-white px-3 text-sm text-sand-800 outline-none focus-visible:border-brand-400 focus-visible:ring-1 focus-visible:ring-brand-400"
                        >
                          <option value="" disabled>Select area</option>
                          {AREAS.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-sand-600">
                          Street & Building
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g. Abbas El Akkad St., Bldg 5"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="h-10 rounded-xl bg-white text-sm"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setShowAddForm(false)}
                          className="flex-1 rounded-xl border border-sand-200 py-2.5 text-sm font-semibold text-sand-600 transition-colors hover:bg-sand-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          disabled={!newArea || !newAddress}
                          className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-b border-dashed border-sand-200 mb-3" />

                  {/* Saved addresses */}
                  {savedAddresses.length > 0 ? (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase text-sand-400">
                        Saved Addresses
                      </p>
                      <div className="space-y-1">
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-sand-50"
                          >
                            <button
                              onClick={() => handleSelectAddress(addr)}
                              className="flex flex-1 items-center gap-3 text-left"
                            >
                              <MapPin className="h-4.5 w-4.5 shrink-0 text-brand-500" />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-semibold text-sand-800">
                                    {addr.label}
                                  </p>
                                  {deliveryAddress === `${addr.area}, Cairo` && deliveryMethod === "delivery" && (
                                    <Check className="h-3.5 w-3.5 text-brand-500" />
                                  )}
                                </div>
                                <p className="truncate text-xs text-sand-400">
                                  {addr.address}, {addr.area}
                                </p>
                              </div>
                            </button>
                            <button
                              onClick={() => handleRemoveAddress(addr.id)}
                              className="rounded-lg p-1 text-sand-300 opacity-0 transition-all hover:bg-sand-100 hover:text-sand-500 group-hover:opacity-100"
                              aria-label="Remove address"
                            >
                              <span className="text-xs">Remove</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Empty state */
                    <div className="flex flex-col items-center py-8 text-center">
                      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-50">
                        <MapPin className="h-10 w-10 text-brand-300" />
                      </div>
                      <p className="text-sm font-bold text-sand-800">
                        No Saved Addresses
                      </p>
                      <p className="mt-1 max-w-[16rem] text-xs text-sand-400">
                        Add an address to get your orders delivered straight to your doorstep
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            /* ── Store Pickup Tab ── */
            <div className="space-y-1">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => handleSelectStore(store)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-sand-50",
                      pickupStore === store.name && "bg-brand-50"
                    )}
                  >
                    <Store className="h-5 w-5 shrink-0 text-brand-500" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-sand-800">{store.name}</p>
                      <p className="text-xs text-sand-400">{store.address}</p>
                    </div>
                    {pickupStore === store.name && (
                      <Check className="h-4 w-4 shrink-0 text-brand-500" />
                    )}
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center py-8 text-center">
                  <Store className="h-10 w-10 text-sand-300 mb-3" />
                  <p className="text-sm text-sand-500">
                    No stores match &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
