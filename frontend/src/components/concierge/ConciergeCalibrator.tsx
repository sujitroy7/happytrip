import { useState } from "react"
import {
  Sparkles,
  Lock,
  Calendar,
  Check,
  Stars,
  Radio,
} from "lucide-react"

export function ConciergeCalibrator() {
  // Interactive state
  const [selectedTiming, setSelectedTiming] = useState<string>("next-month")
  const [selectedAtmospheres, setSelectedAtmospheres] = useState<string[]>([
    "beaches",
    "culinary",
    "culture",
    "adventure",
    "nightlife",
  ])
  const [selectedStyle, setSelectedStyle] = useState<string>("premium")
  const [selectedRhythm, setSelectedRhythm] = useState<string>("balanced")

  const toggleAtmosphere = (id: string) => {
    setSelectedAtmospheres((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-1 pb-36 pt-24 gap-5">
      {/* Concierge Session Card */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-card/75 backdrop-blur-2xl border border-border/60 shadow-2xl p-4 sm:p-5">
        {/* Glow ambient filters */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 w-52 h-52 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Header Metadata */}
        <div className="relative z-10 flex items-center justify-between pb-2 mb-4 bg-background/50 rounded-xl px-3.5 py-2 border border-border/30">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-semibold">
              Aura Synthesis Active
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-sans text-[10px] tracking-widest uppercase">
              Private Vault
            </span>
          </div>
        </div>

        {/* Conversational Stream */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* User Query Bubble */}
          <div className="flex flex-col items-end gap-1 pl-6">
            <div className="flex items-center gap-1.5 text-muted-foreground px-1">
              <span className="text-[10px] tracking-wider uppercase text-secondary font-medium">
                Client Dossier
              </span>
              <span className="text-[10px] text-muted-foreground">• 10:42 AM</span>
            </div>
            <div className="relative rounded-2xl rounded-tr-sm bg-card border border-border/60 shadow-md p-3.5 text-foreground text-sm leading-relaxed">
              <p>
                “I want to spend 4 days in Bali. I want beaches, local food, nightlife, temples, and some adventure. I have a medium budget and don’t want the trip to feel rushed.”
              </p>
            </div>
          </div>

          {/* AI Concierge Response Bubble */}
          <div className="flex flex-col items-start gap-1.5 pr-3">
            <div className="flex items-center gap-1.5 px-1">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-display text-sm text-primary tracking-wide">
                Aura Concierge
              </span>
              <span className="text-[9px] uppercase tracking-widest text-secondary bg-secondary/15 px-2 py-0.5 rounded-full ml-1 font-semibold">
                Calibrating
              </span>
            </div>
            <div className="relative rounded-2xl rounded-tl-sm bg-background/70 border-l-2 border-l-primary border border-border/40 p-3.5 text-sm text-foreground leading-relaxed w-full">
              <p>
                That sounds like an exquisite 4-day Bali escape. To calibrate the itinerary perfectly to your rhythm without haste, I have a few quick reflections:
              </p>
            </div>
          </div>

          {/* Intake Modules */}
          <div className="flex flex-col gap-3.5 pt-1">
            {/* Question 1: Dates */}
            <div className="flex flex-col gap-2 bg-background/50 rounded-xl p-3.5 border border-border/40 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                    1
                  </span>
                  <span className="font-display text-sm text-foreground">
                    When are you planning to go?
                  </span>
                </div>
                <Calendar className="w-4 h-4 text-primary" />
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTiming("this-month")}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-full text-xs transition-all ${
                    selectedTiming === "this-month"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "bg-card/70 text-muted-foreground hover:bg-card"
                  }`}
                >
                  <span>This Month</span>
                  <span className="text-[9px] uppercase tracking-wider text-secondary">
                    Shoulder Season
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTiming("next-month")}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-full text-xs transition-all ${
                    selectedTiming === "next-month"
                      ? "bg-primary text-primary-foreground font-semibold shadow-md"
                      : "bg-card/70 text-muted-foreground hover:bg-card"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Next Month</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-black/15 px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTiming("custom")}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-full text-xs transition-all ${
                    selectedTiming === "custom"
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "bg-card/70 text-muted-foreground hover:bg-card"
                  }`}
                >
                  <span>Choose Custom Dates</span>
                  <span className="text-[10px] text-primary tracking-wider font-semibold">
                    Oct 12 – 16
                  </span>
                </button>
              </div>
            </div>

            {/* Question 2: Atmosphere */}
            <div className="flex flex-col gap-2 bg-background/50 rounded-xl p-3.5 border border-border/40 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                    2
                  </span>
                  <span className="font-display text-sm text-foreground">
                    Desired Atmosphere
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-secondary font-semibold">
                  Multi-Select
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Tap highlights you wish to thread into your private agenda.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { id: "beaches", label: "🏖 Beaches" },
                  { id: "culinary", label: "🍜 Local Culinary" },
                  { id: "culture", label: "🏛 Culture & Temples" },
                  { id: "adventure", label: "🏄 Soft Adventure" },
                  { id: "nightlife", label: "🍸 Sunset Nightlife" },
                  { id: "wellness", label: "🌿 Wellness & Spa" },
                ].map((chip) => {
                  const isSelected = selectedAtmospheres.includes(chip.id)
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleAtmosphere(chip.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                        isSelected
                          ? "bg-primary/20 text-primary border border-primary/40 font-medium"
                          : "bg-card/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{chip.label}</span>
                      {isSelected && <Check className="w-3 h-3 text-primary font-bold" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Question 3: Travel Style & Comfort */}
            <div className="flex flex-col gap-2 bg-background/50 rounded-xl p-3.5 border border-border/40 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                    3
                  </span>
                  <span className="font-display text-sm text-foreground">
                    Travel Style &amp; Comfort
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-primary font-semibold">
                  Budget Scale
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {/* Comfortable */}
                <button
                  type="button"
                  onClick={() => setSelectedStyle("comfortable")}
                  className={`text-left p-3 rounded-xl transition-all flex items-start justify-between ${
                    selectedStyle === "comfortable"
                      ? "bg-card border border-primary/40 shadow-md"
                      : "bg-card/50 hover:bg-card/70 text-muted-foreground"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-sm text-foreground">
                      Comfortable
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Boutique sanctuary hotels &amp; on-demand transport
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-secondary/15 text-secondary px-2 py-0.5 rounded">
                    Tier 1
                  </span>
                </button>

                {/* Premium */}
                <button
                  type="button"
                  onClick={() => setSelectedStyle("premium")}
                  className={`relative text-left p-3 rounded-xl transition-all flex items-start justify-between ${
                    selectedStyle === "premium"
                      ? "bg-card border-l-2 border-l-primary border border-primary/30 shadow-lg text-foreground"
                      : "bg-card/50 hover:bg-card/70 text-muted-foreground"
                  }`}
                >
                  <div className="flex flex-col gap-0.5 pl-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display text-base text-primary font-medium">
                        Premium
                      </span>
                      <span className="text-[8px] uppercase tracking-widest bg-primary text-primary-foreground font-bold px-1.5 py-0.5 rounded-full">
                        Selected
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground">
                      Private Villa in Uluwatu/Canggu &amp; dedicated chauffeur
                    </span>
                    <span className="text-[10px] text-secondary flex items-center gap-1 mt-0.5">
                      <Check className="w-3 h-3" /> Perfect harmony with your mid-tier brief
                    </span>
                  </div>
                  <Stars className="w-4 h-4 text-primary shrink-0" />
                </button>

                {/* Ultra Luxury */}
                <button
                  type="button"
                  onClick={() => setSelectedStyle("ultra")}
                  className={`text-left p-3 rounded-xl transition-all flex items-start justify-between ${
                    selectedStyle === "ultra"
                      ? "bg-card border border-primary/40 shadow-md"
                      : "bg-card/50 hover:bg-card/70 text-muted-foreground"
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-display text-sm text-foreground">
                      Ultra Luxury
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Cliffside estate, heli-transfers &amp; VIP access
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider bg-secondary/15 text-secondary px-2 py-0.5 rounded">
                    Tier 3
                  </span>
                </button>
              </div>
            </div>

            {/* Question 4: Daily Rhythm */}
            <div className="flex flex-col gap-2 bg-background/50 rounded-xl p-3.5 border border-border/40 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px]">
                    4
                  </span>
                  <span className="font-display text-sm text-foreground">
                    Daily Rhythm
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-secondary font-semibold">
                  Pacing
                </span>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                {[
                  {
                    id: "relaxed",
                    title: "Relaxed",
                    sub: "1–2 gentle stops/day • Slow mornings",
                  },
                  {
                    id: "balanced",
                    title: "Balanced",
                    tag: "Matches Prompt",
                    sub: "3 curated stops with sunset downtime",
                  },
                  {
                    id: "packed",
                    title: "Packed & Energetic",
                    sub: "Continuous exploration • Dawn to dusk",
                  },
                ].map((rhythm) => {
                  const isSelected = selectedRhythm === rhythm.id
                  return (
                    <button
                      key={rhythm.id}
                      type="button"
                      onClick={() => setSelectedRhythm(rhythm.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                        isSelected
                          ? "bg-card border border-primary/30 shadow-sm"
                          : "bg-card/40 text-muted-foreground hover:bg-card/60"
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs font-medium ${
                              isSelected ? "text-primary font-semibold" : "text-foreground"
                            }`}
                          >
                            {rhythm.title}
                          </span>
                          {rhythm.tag && (
                            <span className="text-[8px] uppercase bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                              {rhythm.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground">{rhythm.sub}</span>
                      </div>
                      <Radio
                        className={`w-4 h-4 ${
                          isSelected ? "text-primary fill-primary/30" : "text-border"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Proactive Match Card */}
            <div className="flex items-center gap-3 bg-card/80 border border-border/50 rounded-xl p-3 shadow-sm">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIgFZNaruksxpU_8sqBsTWQ9sDKRJ421oJAyfZqO8Y-B_aY75hbhrReOjepuIVTBlQy7hgRGx7ZuU4pDBYWMdJJfPE5UkPZCsQhndnRP6Ksv-pOg4VMZlkqnvZd9BkWPQHM2ZXMviJd3Ik8hU89NgWmrFm7Tkpfpxm0xbEvRnQyOg0jUICJi6bWLfapama4aAKcA9YD2ATdDTsyvdzGBhJR_DMKhNbPUIR8dul13hlqqDoazEpSAY0"
                  alt="Uluwatu Sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-primary font-semibold">
                  Aura Proactive Match
                </span>
                <span className="font-display text-xs text-foreground truncate">
                  Uluwatu Sunset &amp; Jimbaran Seafood Lounge
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Aligned with soft adventure &amp; ocean night vibes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
