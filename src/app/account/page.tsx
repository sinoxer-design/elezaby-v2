"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  User,
  UserCircle,
  Shield,
  MapPin,
  Heart,
  Package,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Bell,
  Globe,
  Languages,
  Lock,
  Pencil,
  RotateCcw,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";

/* ── Mock logged-in user ─────────────────────────────────── */
const mockUser = {
  name: "Ahmed",
  email: "ahmed@example.com",
  initial: "A",
};

/* ── Quick action cards (2×2 grid) ───────────────────────── */
const quickActions = [
  {
    icon: Package,
    label: "Orders",
    description: "Manage & track",
    href: "/account/orders",
    badge: "2",
  },
  {
    icon: RotateCcw,
    label: "Returns",
    description: "0 active requests",
    href: "/account/orders",
  },
  {
    icon: Shield,
    label: "Insurance",
    description: "Health coverage",
    href: "/account/insurance",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "0 saved items",
    href: "/account/wishlist",
  },
];

/* ── My Account list items ───────────────────────────────── */
const accountItems = [
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payments" },
  { icon: Shield, label: "Health Insurance", href: "/account/insurance" },
  { icon: QrCode, label: "QR Code", href: "/account/profile" },
];

/* ── Settings list items ─────────────────────────────────── */
const settingsItems = [
  {
    icon: Globe,
    label: "Country",
    href: "/account/settings",
    trailing: (
      <span className="flex items-center gap-1.5 text-sm text-sand-500">
        🇪🇬
      </span>
    ),
  },
  {
    icon: Languages,
    label: "Language",
    href: "/account/settings",
    trailing: (
      <span className="text-sm text-sand-500">العربية</span>
    ),
  },
  { icon: Lock, label: "Security", href: "/account/settings" },
  { icon: Bell, label: "Notifications", href: "/account/settings" },
  { icon: Settings, label: "Preferences", href: "/account/settings" },
];

export default function AccountPage() {
  const { isProfileComplete, completionPercentage } = useUserProfile();

  return (
    <div className="px-[var(--page-padding-x)] py-4 lg:py-8">
      <div className="mx-auto max-w-lg lg:max-w-5xl lg:flex lg:gap-8 lg:items-start">
        {/* ── Left column (desktop sidebar) ── */}
        <div className="flex flex-col gap-4 lg:w-72 lg:shrink-0 lg:sticky lg:top-[calc(var(--header-height-desktop)+1rem)]">

          {/* Profile card */}
          <div className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100">
                <span className="text-lg font-bold text-brand-700">
                  {mockUser.initial}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-sand-800">
                  {mockUser.name}
                </h2>
                <p className="truncate text-sm text-sand-500">
                  {mockUser.email}
                </p>
              </div>
              <Link
                href="/account/profile"
                className="text-sm font-medium text-sand-500 transition-colors hover:text-brand-600"
              >
                Edit
              </Link>
            </div>

            {/* Profile completion progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="h-1.5 flex-1 rounded-full bg-sand-100">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="ms-3 text-sm font-semibold text-brand-600">
                  {completionPercentage}%
                </span>
              </div>
              <p className="mt-1.5 text-xs text-sand-400">
                Complete your profile for personalized recommendations
              </p>
            </div>
          </div>

          {/* Elezaby Plus promo banner */}
          <Link
            href="/account/settings"
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-3 transition-opacity hover:opacity-95"
          >
            <div>
              <p className="text-sm font-semibold text-white">
                Save 100+ EGP every month
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-cyan-300">
                Try Free
              </span>
              <ChevronRight className="h-4 w-4 text-cyan-300" />
            </div>
          </Link>

          {/* Quick actions — 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="flex items-center gap-2">
                  <action.icon className="h-5 w-5 text-sand-500" />
                  {action.badge && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[0.625rem] font-bold text-white">
                      {action.badge}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-sand-800">
                    {action.label}
                  </span>
                  <p className="text-xs text-sand-400">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop-only sign out */}
          <button className="hidden lg:flex items-center justify-center gap-2 rounded-xl border border-sand-200 px-4 py-3 text-sm font-medium text-discount transition-colors hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

          <p className="hidden lg:block text-center text-xs text-sand-400">
            El Ezaby Pharmacy v1.0.0
          </p>
        </div>

        {/* ── Right column (mobile: below, desktop: main area) ── */}
        <div className="mt-4 flex-1 flex flex-col gap-4 lg:mt-0">

          {/* My Account section */}
          <div className="rounded-2xl bg-white shadow-card">
            <h3 className="px-4 pt-4 pb-1 text-sm font-semibold text-sand-800">
              My account
            </h3>
            <div className="divide-y divide-sand-100">
              {accountItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand-50"
                >
                  <item.icon className="h-5 w-5 text-sand-400" />
                  <span className="flex-1 text-sm text-sand-700">
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-sand-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Settings section */}
          <div className="rounded-2xl bg-white shadow-card">
            <h3 className="px-4 pt-4 pb-1 text-sm font-semibold text-sand-800">
              Settings
            </h3>
            <div className="divide-y divide-sand-100">
              {settingsItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand-50"
                >
                  <item.icon className="h-5 w-5 text-sand-400" />
                  <span className="flex-1 text-sm text-sand-700">
                    {item.label}
                  </span>
                  {item.trailing && item.trailing}
                  <ChevronRight className="h-4 w-4 text-sand-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="rounded-2xl bg-white shadow-card">
            <div className="divide-y divide-sand-100">
              <Link
                href="/account/help"
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-sand-50"
              >
                <HelpCircle className="h-5 w-5 text-sand-400" />
                <span className="flex-1 text-sm text-sand-700">
                  Help & Support
                </span>
                <ChevronRight className="h-4 w-4 text-sand-300" />
              </Link>
            </div>
          </div>

          {/* Sign Out — mobile only */}
          <div className="flex flex-col gap-3 lg:hidden">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-sand-200 bg-white px-4 py-3.5 text-sm font-medium text-discount shadow-card transition-colors hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
            <p className="text-center text-xs text-sand-400">
              El Ezaby Pharmacy v1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
