import * as React from "react"
import { cn } from "../../lib/utils"
import { HappyTripLogo } from "../home/HappyTripLogo"
import { ThemeToggle } from "../ui/ThemeToggle"

export interface ConciergeHeaderProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string
  subTitle?: string
  avatarUrl?: string
  onProfileClick?: () => void
}

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdeHFtdiwk9SvJTy932LOHStMk4XM2H_atYrbieEdKtq45CY9DWzoVm1GkkkKLGgDmtG19y8VfNQQfDPZcU_k9VpvhSnt_RG8jmzH1RbGQ7n3B3ihvht77tbHwGA9qrTe8LS6ATK3QPzMT6kerBnce9zTZ3WntMHLE984v8ywFrbc_pBdX2Z8GEsD1lubU4hxuaCLs7gKPa9LGdP8SGVPpfSEceSqDJeTwBCAJjou1OthuIronGT6d"

export function ConciergeHeader({
  brandName = "HAPPYTRIP",
  subTitle = "VOYAGE CONCIERGE",
  avatarUrl = DEFAULT_AVATAR,
  onProfileClick,
  className,
  ...props
}: ConciergeHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 pt-safe px-3 sm:px-4 flex justify-center pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden pointer-events-auto w-full max-w-md h-16 sm:h-20 flex items-center justify-between rounded-full luxury-glass px-4 sm:px-5 my-2 transition-all duration-300">
        {/* Specular glass reflection sheen */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent pointer-events-none rounded-t-full" />
        
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-3">
          {/* Custom HappyTrip Luxury Logo */}
          <div className="flex-shrink-0">
            <HappyTripLogo size={36} />
          </div>

          {/* Editorial Brand Text */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-normal tracking-[0.18em] uppercase text-foreground">
                {brandName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
            </div>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
              {subTitle}
            </span>
          </div>
        </div>

        {/* Right: Theme Toggle & Gilded Profile Avatar */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle size="sm" />
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Member Profile"
            className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-primary via-accent to-primary/60 shadow-[0_0_14px_rgba(242,202,80,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
