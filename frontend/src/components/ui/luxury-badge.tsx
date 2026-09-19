import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const luxuryBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium tracking-wider uppercase transition-colors backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-card/80 text-secondary border border-border/80 shadow-sm",
        gold:
          "bg-primary/10 text-primary border border-primary/25 shadow-sm",
        glass:
          "bg-card/60 text-foreground border border-border/60 shadow-inner",
        accent:
          "bg-accent/15 text-accent border border-accent/30",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[10px] tracking-widest",
        default: "px-3.5 py-1 text-xs tracking-wider",
        lg: "px-4 py-1.5 text-xs tracking-widest font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LuxuryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof luxuryBadgeVariants> {
  icon?: React.ReactNode
}

export function LuxuryBadge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: LuxuryBadgeProps) {
  return (
    <div
      className={cn(luxuryBadgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
