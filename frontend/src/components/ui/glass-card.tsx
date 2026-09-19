import * as React from "react"
import { cn } from "../../lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-card/85 backdrop-blur-2xl border border-border/70 p-6 shadow-2xl transition-all duration-300",
          glow && "shadow-primary/5 hover:border-primary/30",
          className
        )}
        {...props}
      >
        {glow && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/15 blur-2xl rounded-full"
          />
        )}
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"
