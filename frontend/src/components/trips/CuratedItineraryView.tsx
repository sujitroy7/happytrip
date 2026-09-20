import { useState } from "react"
import {
  BadgeCheck,
  PlaneLanding,
  Clock,
  Coins,
  Gauge,
  Sun,
  Route,
  Car,
  ArrowRight,
  Sparkles,
  Home,
  UtensilsCrossed,
  Sunset,
  Wine,
  Lightbulb,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react"

const DAYS = [
  { id: 1, label: "Day 1 (Arrival & Seminyak)" },
  { id: 2, label: "Day 2 (Canggu & Beachclub)" },
  { id: 3, label: "Day 3 (Ubud Temples & Food)" },
  { id: 4, label: "Day 4 (Uluwatu Sunsets)" },
]

export function CuratedItineraryView({
  onCustomizeClick,
  destination = "Bali",
}: {
  onCustomizeClick?: () => void
  destination?: string
}) {
  const [selectedDay, setSelectedDay] = useState(1)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-24 pb-28 gap-6">
      {/* 1. Title & Prologue */}
      <section className="flex flex-col gap-1 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase font-semibold">
            Curated Bespoke Voyage
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Your {destination} Escape
        </h1>
        <p className="font-display text-sm sm:text-base italic text-primary font-normal tracking-wide">
          5 Days • Balanced Cadence • Sanctuary &amp; Gastronomy
        </p>
      </section>

      {/* 2. Hero Destination Visual Card */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-card border border-border/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        <div
          className="w-full h-72 bg-cover bg-center relative flex flex-col justify-between p-4 sm:p-5"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuConhDRC2LxBm3o8G61D7MAUmKCXa5dITBBrBGJe1uYziqXyTZBAXJTL1ci6HznGZlZLVCRt406LuNvlmtaViSf6eEYhln5SLngbIJHgQocFVL2wYyW6ZiQD_gEfLlX_-LXRi4EZJFGr8IkEsbTO4R9Fir2odEiPKUxgzlJxdLJd_UWtfTOtnIpkXCwnaZFaDA4ymSoNG2OOHr07Mfm0HSqMsh97eeqj7GmOdne0kIKCWH6IDAPSZS1')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-black/50" />

          {/* Floating Top Badge */}
          <div className="relative z-10 self-start flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg">
            <BadgeCheck className="w-4 h-4 text-primary" />
            <span className="font-sans text-[10px] text-foreground tracking-wider uppercase font-semibold">
              Private Villa &amp; Chauffeur Included
            </span>
          </div>

          {/* Hero Bottom Highlights */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[9px] text-secondary uppercase tracking-widest font-medium">
                Sanctuary Base
              </span>
              <span className="font-display text-lg sm:text-xl text-foreground font-medium">
                The Seminyak &amp; Uluwatu Cliffs
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
              <PlaneLanding className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-semibold">Confirmed Flow</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Stats Matrix (4 Tiles) */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Tile 1 */}
        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-card/85 border border-border/50 shadow-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Duration
            </span>
          </div>
          <span className="font-display text-xl text-foreground mt-0.5">4D / 3N</span>
          <span className="text-[11px] text-muted-foreground">Arrival to departure</span>
        </div>

        {/* Tile 2 */}
        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-card/85 border border-border/50 shadow-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Budget Pool
            </span>
          </div>
          <span className="font-display text-xl text-foreground mt-0.5">₹48k – 58k</span>
          <span className="text-[11px] text-muted-foreground">Est. per guest total</span>
        </div>

        {/* Tile 3 */}
        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-card/85 border border-border/50 shadow-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Pacing
            </span>
          </div>
          <span className="font-display text-xl text-foreground mt-0.5">Balanced</span>
          <span className="text-[11px] text-muted-foreground">No rushed transfers</span>
        </div>

        {/* Tile 4 */}
        <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-card/85 border border-border/50 shadow-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <Sun className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Season
            </span>
          </div>
          <span className="font-display text-xl text-foreground mt-0.5">Apr – Oct</span>
          <span className="text-[11px] text-muted-foreground">Optimal dry breezes</span>
        </div>
      </section>

      {/* 4. AI Route Arc & Visual Map Preview */}
      <section className="flex flex-col gap-3 p-4 rounded-2xl bg-card/80 border border-border/60 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-primary" />
            <h2 className="font-display text-base text-foreground font-medium">
              Integrated Route Arc
            </h2>
          </div>
          <span className="font-sans text-[9px] text-primary uppercase bg-background/70 border border-border/40 px-2.5 py-0.5 rounded-full font-semibold">
            Optimized
          </span>
        </div>

        {/* Static Map Preview with Route Nodes */}
        <div
          className="w-full h-44 rounded-xl bg-cover bg-center relative overflow-hidden flex flex-col justify-end p-3.5 shadow-inner"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1m4uDGRTIAZxTZZXvi2ubqcIeA2IMgCvJHVKpY3GroSk5ilqf0phz0ti663JVLwqpgFBioJi9VdJut7D9CWU_ETfs54IROmVlIstuOlx1Xywu5zkdVmxpTn0IU4P5C6fejMTLZXmfbSS7rlhMTEozZZtuL_NizcWqsOJE7UJw64aGt88G3KC5BGQ-dSIAmw_vjQFcG3A0hJng-K2NR5yZm0ko6QT_wQBYjPVQYtdQYYK78C_1Ncvl')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />
          <div className="relative z-10 flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 text-foreground bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs border border-border/40">
              <span className="text-primary font-bold">●</span>
              <span>Avg. transfer: 42 mins</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs border border-border/40 font-semibold">
              <Car className="w-3.5 h-3.5 text-secondary" />
              <span>Dedicated Chauffeur</span>
            </div>
          </div>
        </div>

        {/* Route Line Sequence */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs text-muted-foreground pt-1">
          <span className="px-3 py-1 rounded-full bg-background/80 border border-border/40 text-foreground font-medium whitespace-nowrap">
            Denpasar Airport
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="px-3 py-1 rounded-full bg-background/80 border border-border/40 text-foreground font-medium whitespace-nowrap">
            Seminyak (D1-2)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="px-3 py-1 rounded-full bg-background/80 border border-border/40 text-foreground font-medium whitespace-nowrap">
            Ubud (D3)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="px-3 py-1 rounded-full bg-background/80 border border-border/40 text-foreground font-medium whitespace-nowrap">
            Uluwatu (D4)
          </span>
        </div>
      </section>

      {/* 5. AI Curator Note Callout */}
      <section className="relative p-4 rounded-2xl bg-card/90 border border-border/60 shadow-lg">
        <div className="flex gap-3 items-start">
          <div className="relative flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary tracking-widest uppercase font-semibold">
                HappyTrip Intelligence Dispatch
              </span>
              <span className="text-[11px] text-muted-foreground">Just now</span>
            </div>
            <p className="text-xs text-foreground leading-relaxed italic">
              “I've sequenced your route south-to-north-to-south to eliminate backtrack traffic, guaranteeing sunset beach club lounge time on Day 1 and crowd-free morning temple mist on Day 3.”
            </p>
          </div>
        </div>
      </section>

      {/* 6. Day Selector Horizontal Tabs */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-foreground font-medium">Daily Breakdown</h3>
          <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest">
            Active Day 0{selectedDay}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 snap-x">
          {DAYS.map((day) => {
            const isActive = selectedDay === day.id
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDay(day.id)}
                className={`snap-start px-4 py-2 rounded-full text-xs whitespace-nowrap font-medium transition-all shadow-sm flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                    : "bg-card/75 border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                <span>{day.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* 7. Detailed Day Timeline Cards with Connector Ribbon */}
      <section className="relative flex flex-col gap-5">
        {/* Continuous Vertical Ribbon */}
        <div className="absolute top-4 bottom-6 left-[18px] w-[1.5px] bg-gradient-to-b from-primary via-primary/50 to-card pointer-events-none" />

        {/* 01: VIP Arrival */}
        <div className="relative flex items-start gap-3 pl-1">
          <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <div className="flex-1 p-4 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary uppercase tracking-wider font-semibold">
                09:30 AM • ARRIVAL
              </span>
              <PlaneLanding className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-display text-sm sm:text-base text-foreground font-medium">
              VIP Arrival at Ngurah Rai Airport
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Airfield ramp welcome, fast-track customs lane clearance, and personal chauffeur meet &amp; greet with signature chilled lemongrass towels and fresh coconut nectar.
            </p>
          </div>
        </div>

        {/* 02: Villa Check-in */}
        <div className="relative flex items-start gap-3 pl-1">
          <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="flex-1 p-4 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary uppercase tracking-wider font-semibold">
                12:00 PM • CHECK-IN
              </span>
              <Home className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-display text-sm sm:text-base text-foreground font-medium">
              Private Villa Check-in: The Seminyak Beach Resort
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Direct oceanfront sanctuary unboxing. Private plunge pool prepared at optimal temperature with complimentary tropical fruit arrangement and Balinese floral blessing.
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-background text-[10px] text-secondary border border-border/40 font-medium">
                Ocean Plunge Suite
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-background text-[10px] text-muted-foreground border border-border/40">
                Butler on Duty
              </span>
            </div>
          </div>
        </div>

        {/* 03: Culinary Tasting */}
        <div className="relative flex items-start gap-3 pl-1">
          <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="flex-1 p-4 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary uppercase tracking-wider font-semibold">
                01:30 PM • GASTRONOMY
              </span>
              <UtensilsCrossed className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-display text-sm sm:text-base text-foreground font-medium">
              Authentic Balinese Culinary Tasting at Merah Putih
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Chef's curated heirloom tasting menu featuring slow-braised duck in traditional betutu spices under a towering translucent cathedral architecture.
            </p>
          </div>
        </div>

        {/* 04: Golden Hour Lounging */}
        <div className="relative flex items-start gap-3 pl-1">
          <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          </div>
          <div className="flex-1 p-4 rounded-xl bg-card border border-border/60 shadow-md flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary uppercase tracking-wider font-semibold">
                04:30 PM • SUNSET RITUAL
              </span>
              <Sunset className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-display text-sm sm:text-base text-foreground font-medium">
              Golden Hour Lounging at Seminyak Beach
            </h4>

            {/* Beachclub Photo */}
            <div
              className="w-full h-36 rounded-lg bg-cover bg-center my-1 relative shadow-inner"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXPtvgqt1c722Azb0kwXXdXHiVqYWdT1k1nOtv5GxQhE42pSBY7G2lzLmjfnlQ8DOceXgcmsPufGj5C1Tfr1fIwcmgpOD404oDTiJPm4-vVkm0KsK6LQEbH3IfwmCP7lLiEp5dVUD5P96U-HKxZx_Cy3n4BiP4972wvDs5OTajjsVZdjX5wepdhTqOY3nmzOsunJO6cjViDxQpd53mdP2sWks7GCqbbR1Iq8UjtHnPohq7t_RcUZ-e')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-card/90 text-foreground font-sans text-[9px] uppercase tracking-wider border border-border/40">
                Ku De Ta Exclusive Deck
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Unwind to ambient acoustic rhythms as the sky turns radiant lavender and gold across the Indian Ocean horizon.
            </p>

            {/* AI Whisper Bubble */}
            <div className="mt-2 p-2.5 rounded-lg bg-background/80 border border-border/40 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                “Reserved front-row daybed booked for optimal sunset lighting. Your name is confirmed under HappyTrip VIP Priority.”
              </p>
            </div>
          </div>
        </div>

        {/* 05: Candlelit Dinner */}
        <div className="relative flex items-start gap-3 pl-1">
          <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          </div>
          <div className="flex-1 p-4 rounded-xl bg-card border border-border/60 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] text-primary uppercase tracking-wider font-semibold">
                08:00 PM • EVENING
              </span>
              <Wine className="w-4 h-4 text-secondary" />
            </div>
            <h4 className="font-display text-sm sm:text-base text-foreground font-medium">
              Candlelit Dinner by the Ocean
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Private table laid directly on the sand with ambient torches, fresh catch grilled over coconut husks, and paired organic biodynamic wines.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Interactive Action CTAs */}
      <section className="flex flex-col gap-2.5 pt-2 pb-4">
        {/* Liquid Gold Brushed CTA */}
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground font-display text-base font-semibold tracking-wide shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
          <span>{isSaved ? "Trip Confirmed & Saved!" : "Confirm & Save Trip"}</span>
        </button>

        {/* Glass Secondary Action */}
        <button
          type="button"
          onClick={onCustomizeClick}
          className="w-full py-3 px-4 rounded-full bg-card/85 border border-border/60 text-foreground font-sans text-sm font-medium hover:bg-card active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span>Customize with AI Concierge</span>
        </button>
      </section>
    </div>
  )
}
