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
        // Custom El Ezaby pharmacy variants
        discount: "border-transparent bg-discount text-white rounded-sm",
        "low-stock": "border-transparent bg-warning text-sand-900 rounded-sm",
        prescription: "border-transparent bg-health text-white rounded-sm",
        "new": "border-transparent bg-brand-100 text-brand-700 rounded-sm",
        "best-seller": "border-transparent bg-amber-50 text-amber-900 rounded-sm",
        oos: "border-transparent bg-sand-200 text-sand-600 rounded-sm",
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
