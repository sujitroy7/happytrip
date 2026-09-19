import { useState } from "react"
import { GlassCard } from "../ui/glass-card"
import { LuxuryBadge } from "../ui/luxury-badge"
import { Button } from "../ui/button"
import { HappyTripLogo } from "./HappyTripLogo"
import {
  Sparkles,
  Plane,
  Ship,
  Key,
  ArrowRight,
  Compass,
} from "lucide-react"

const HIGHLIGHTS = [
  {
    icon: Plane,
    label: "Aviation",
    desc: "Global Fleet",
  },
  {
    icon: Ship,
    label: "Charters",
    desc: "Superyacht",
  },
  {
    icon: Key,
    label: "Havens",
    desc: "Private Villas",
  },
]

export function ConciergeGatewayCard() {
  const [isPlanning, setIsPlanning] = useState(false)

  const handlePlanClick = () => {
    setIsPlanning(true)
    setTimeout(() => {
      setIsPlanning(false)
    }, 300)
  }

  return (
    <section
      aria-label="HappyTrip Luxury Concierge Gateway"
      className="relative z-10 w-full max-w-[370px] sm:max-w-md mx-auto my-auto px-2"
    >
      <GlassCard glow className="text-center p-5 sm:p-6 shadow-2xl rounded-2xl border-border/60 bg-card/85">
        {/* Verified AI Concierge Micro-Badge */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <LuxuryBadge
            variant="glass"
            size="sm"
            icon={<Sparkles className="w-3 h-3 text-primary" />}
            className="text-[10px] sm:text-xs py-0.5 px-3 border-border/50"
          >
            Curated by AI Concierge
          </LuxuryBadge>
        </div>

        {/* HappyTrip Luxury Crest Monogram */}
        <div className="mb-2 sm:mb-3">
          <HappyTripLogo size={52} />
        </div>

        {/* Brand Naming & Luxury Typography */}
        <h1 className="font-display text-2xl sm:text-3xl text-foreground tracking-[0.2em] uppercase font-light leading-tight">
          H A P P Y T R I P
        </h1>

        <p className="font-display text-sm sm:text-base italic text-primary mt-1 font-normal tracking-wide">
          Intelligent Luxury Journeys
        </p>

        <p className="text-xs text-muted-foreground mt-1 max-w-[260px] mx-auto leading-snug">
          Your journey, intelligently planned.
        </p>

        {/* Departure Highlights Preview */}
        <div className="grid grid-cols-3 gap-1.5 my-4 p-2.5 bg-background/60 border border-border/40 rounded-xl">
          {HIGHLIGHTS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-card/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-foreground uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  {item.desc}
                </span>
              </div>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5">
          <Button
            variant="luxury"
            size="pill"
            id="plan-trip-btn"
            onClick={handlePlanClick}
            className={`w-full h-11 sm:h-12 text-sm font-semibold group ${isPlanning ? "scale-95 opacity-90" : ""}`}
          >
            <span>Plan my trip</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>

          <Button
            variant="glass"
            size="pill"
            id="explore-btn"
            className="w-full h-10 sm:h-11 text-xs sm:text-sm font-medium"
          >
            <Compass className="w-3.5 h-3.5 text-accent mr-1" />
            <span>Explore without planning</span>
          </Button>
        </div>
      </GlassCard>
    </section>
  )
}
