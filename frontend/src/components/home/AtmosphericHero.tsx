import { LuxuryBadge } from "../ui/luxury-badge"
import { Crown } from "lucide-react"

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBWlQ6Huylm-YDOGJwthQHr0b8FFzwlO2FeNksyyDyFykyTuHoKIpcFJN8Iz26juAh8PtxNgd7HduYP1wHjOWVGBJ983THuYxqcoLp_HVXW-GqZg4a0Avn8CwVM8gzUJeOA53dfaTQiC-HLBx4eAx4DGlXK6cSD59tSJZtM9U8QJgr_RcPVZkaeIPqkuJ-QiKtXio2XaJ4Nmr0_M5jw4fBIrWqHMsT1bCSc-c7KGW1VMLZMus-8669B"

export function AtmosphericHero() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Cinematic Twilight Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transform scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
      />

      {/* Atmospheric Luxury Scrims */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/40 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-card/40 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full h-64 bg-background/80 blur-2xl" />
    </div>
  )
}

export function TopStatusPill() {
  return (
    <header className="relative z-10 pt-2 sm:pt-4 flex justify-center w-full">
      <LuxuryBadge
        variant="default"
        size="sm"
        icon={<Crown className="w-3.5 h-3.5 text-primary" />}
        className="shadow-md backdrop-blur-xl border-border/60 text-[11px] py-1 px-3.5"
      >
        Private Client Access
      </LuxuryBadge>
    </header>
  )
}
