import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-400 shadow-sm",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-sand-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-brand-500 underline-offset-4 hover:underline",
        // Custom El Ezaby variants
        "add-to-cart": "bg-primary text-primary-foreground hover:bg-brand-400 shadow-sm font-bold",
        "notify-me": "bg-sand-800 text-white hover:bg-sand-700 shadow-sm",
        "options": "border-2 border-primary text-primary bg-white hover:bg-brand-50",
        "upload-rx": "bg-health text-white hover:opacity-90 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-6 gap-1 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        // Product card CTA
        "card-cta": "h-10 w-full rounded-lg text-xs font-semibold gap-1.5 px-3",
        // Full-width PDP CTA
        "pdp-cta": "h-12 w-full rounded-xl text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
