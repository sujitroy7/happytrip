import * as React from "react"
import { Sparkles, Luggage, Compass, Navigation, CircleUser } from "lucide-react"
import { cn } from "../../lib/utils"

export type NavTab = "home" | "trips" | "explore" | "map" | "profile"

export interface BottomNavProps {
  activeTab?: NavTab
  onTabChange?: (tab: NavTab) => void
  className?: string
}

interface NavItemConfig {
  id: NavTab
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "home", label: "HOME", icon: Sparkles },
  { id: "trips", label: "TRIPS", icon: Luggage },
  { id: "explore", label: "EXPLORE", icon: Compass },
  { id: "map", label: "MAP", icon: Navigation },
  { id: "profile", label: "PROFILE", icon: CircleUser },
]

export function BottomNav({
  activeTab = "home",
  onTabChange,
  className,
}: BottomNavProps) {
  return (
    <div
      className={cn(
        "fixed bottom-4 sm:bottom-6 left-0 w-full z-50 pb-safe px-3 sm:px-4 flex justify-center pointer-events-none",
        className
      )}
    >
      <nav
        aria-label="Concierge Navigation"
        className="relative overflow-hidden pointer-events-auto flex items-center justify-between w-full max-w-md h-16 sm:h-18 px-4 sm:px-6 rounded-full luxury-glass transition-all duration-300"
      >
        {/* Specular glass reflection sheen */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent pointer-events-none rounded-t-full" />
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange?.(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center min-w-[52px] py-1 transition-all duration-200 group active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                    isActive && "drop-shadow-[0_0_8px_rgba(242,202,80,0.5)]"
                  )}
                />
              </div>
              <span
                className={cn(
                  "font-sans text-[9px] tracking-[0.14em] uppercase mt-1 transition-colors",
                  isActive ? "font-semibold text-primary" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
