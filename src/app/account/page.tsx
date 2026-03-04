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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";

const menuItems = [
  {
    icon: UserCircle,
    label: "My Profile",
    description: "Age, gender, health conditions",
    href: "/account/profile",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    showIncomplete: true,
  },
  {
    icon: Shield,
    label: "Health Insurance",
    description: "Upload & manage insurance coverage",
    href: "/account/insurance",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: Package,
    label: "My Orders",
    description: "Track and manage your orders",
    href: "/account/orders",
    badge: "2",
    color: "text-brand-500",
    bg: "bg-brand-50 dark:bg-brand-500/10",
  },
  {
    icon: Heart,
    label: "Wishlist",
    description: "Products you've saved",
    href: "/account/wishlist",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
  },
  {
    icon: MapPin,
    label: "Addresses",
    description: "Manage delivery addresses",
    href: "/account/addresses",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    description: "Cards and payment options",
    href: "/account/payments",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Theme, language, notifications",
    href: "/account/settings",
    color: "text-sand-500",
    bg: "bg-sand-100 dark:bg-secondary",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "FAQs and contact us",
    href: "/account/help",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-500/10",
  },
];

export default function AccountPage() {
  const { isProfileComplete } = useUserProfile();

  return (
    <div className="px-[var(--page-padding-x)] py-4 lg:py-8">
      {/* Mobile: single column / Desktop: sidebar + grid layout */}
      <div className="mx-auto max-w-lg lg:max-w-5xl lg:flex lg:gap-8 lg:items-start">
        {/* Left: Profile sidebar (desktop) / Top section (mobile) */}
        <div className="flex flex-col gap-4 lg:w-72 lg:shrink-0 lg:sticky lg:top-[calc(var(--header-height-desktop)+1rem)]">
          {/* Profile Card */}
          <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card p-4 shadow-card lg:flex-col lg:items-center lg:p-6 lg:text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10 lg:h-20 lg:w-20">
              <User className="h-8 w-8 text-brand-500 lg:h-10 lg:w-10" />
            </div>
            <div className="flex-1 lg:flex-initial">
              <h2 className="font-display text-lg text-sand-800 dark:text-foreground">
                Guest User
              </h2>
              <p className="text-sm text-sand-500 dark:text-muted-foreground">
                Sign in for a personalized experience
              </p>
            </div>
          </div>

          {/* Sign In / Register */}
          <div className="flex gap-3 lg:flex-col">
            <Button variant="default" className="flex-1" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/onboarding">Register</Link>
            </Button>
          </div>

          {/* Sign Out — desktop only in sidebar */}
          <button className="hidden lg:flex items-center justify-center gap-2 rounded-xl border border-sand-200 dark:border-border px-4 py-3 text-sm font-medium text-discount transition-colors hover:bg-red-50 dark:hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

          <p className="hidden lg:block text-center text-xs text-sand-400 dark:text-muted-foreground">
            El Ezaby Pharmacy v1.0.0
          </p>
        </div>

        {/* Right: Menu grid */}
        <div className="mt-4 lg:mt-0 flex-1">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl bg-white dark:bg-card p-4 shadow-card transition-all hover:shadow-elevated lg:flex-col lg:items-start lg:gap-3 lg:p-5"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl lg:h-12 lg:w-12",
                    item.bg
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5 lg:h-6 lg:w-6", item.color)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-sand-800 dark:text-foreground">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[0.625rem] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                    {(item as typeof menuItems[0] & { showIncomplete?: boolean }).showIncomplete && !isProfileComplete && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-deal px-1.5 text-[0.625rem] font-bold text-white">
                        !
                      </span>
                    )}
                  </div>
                  <p className="hidden text-xs text-sand-400 dark:text-muted-foreground lg:block mt-0.5">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-sand-300 dark:text-muted-foreground lg:hidden" />
              </Link>
            ))}
          </div>
        </div>

        {/* Sign Out — mobile only */}
        <div className="mt-4 flex flex-col gap-3 lg:hidden">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-sand-200 dark:border-border px-4 py-3 text-sm font-medium text-discount transition-colors hover:bg-red-50 dark:hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
          <p className="text-center text-xs text-sand-400 dark:text-muted-foreground">
            El Ezaby Pharmacy v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
