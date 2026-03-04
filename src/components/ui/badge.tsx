import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.625rem] font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground border-border",
        // El Ezaby pharmacy variants (navy/cyan brand)
        discount: "border-transparent bg-deal text-white rounded-sm",
        "low-stock": "border-transparent bg-warning text-sand-900 rounded-sm",
        prescription: "border-transparent bg-brand-700 text-white rounded-sm",
        "new": "border-transparent bg-cyan-100 text-cyan-800 rounded-sm",
        "best-seller": "border-transparent bg-amber-50 text-amber-900 rounded-sm",
        oos: "border-transparent bg-sand-200 text-sand-600 rounded-sm",
        // Commerce badges
        express: "border-transparent bg-express-bg text-cyan-700 rounded-sm font-bold",
        "flash-deal": "border-transparent bg-deal text-white rounded-sm font-bold animate-countdown-pulse",
        insurance: "border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
