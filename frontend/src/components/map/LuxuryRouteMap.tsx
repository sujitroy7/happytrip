import { useState } from "react"
import {
  ChevronDown,
  Sun,
  Layers,
  Compass,
  Navigation,
  Sparkles,
  Sliders,
  MapPin,
  Ruler,
  Clock,
  Wand2,
  X,
  PhoneCall,
  Wifi,
  Car,
  CheckCircle2,
  TreePine,
  Utensils,
  Landmark,
  Plane,
} from "lucide-react"

type FilterCategory = "all" | "villas" | "gastronomy" | "scenic"

export function LuxuryRouteMap() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  const [optApplied, setOptApplied] = useState(false)
  const [selectedPin, setSelectedPin] = useState<string>("seminyak"); void selectedPin;
  const [radarActive, setRadarActive] = useState(true)

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-20 pb-28">
      {/* 1. Map Canvas Section */}
      <div className="relative w-full h-[540px] sm:h-[580px] bg-background overflow-hidden select-none">
        {/* Coastal Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-card/40 via-background to-card/60 opacity-95" />

        {/* Procedural Vector Topography & Chauffeur Arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGlowGrad" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eecb6c" stopOpacity="0.2" />
            </linearGradient>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Topographic Shoreline Contours */}
          <path
            d="M 40,80 Q 120,40 220,70 T 360,110 T 390,260 T 320,380 T 260,490 T 150,520 T 70,410 T 30,220 Z"
            fill="#101e19"
            opacity="0.65"
          />
          <path
            d="M 60,100 Q 130,70 210,90 T 330,130 T 350,250 T 290,360 T 230,460 T 140,480 T 80,380 T 50,220 Z"
            fill="#14221d"
            opacity="0.75"
          />
          <path
            d="M 90,130 Q 150,110 200,120 T 290,170 T 300,240 T 260,330 T 200,410 T 130,420 T 100,320 Z"
            fill="#1f2d27"
            opacity="0.85"
          />

          {/* Chauffeur Route Path Arcs */}
          <path
            d="M 110,410 C 130,350 150,320 175,295 S 210,250 215,220 S 250,165 270,135"
            fill="none"
            filter="url(#routeGlow)"
            stroke="url(#goldGlowGrad)"
            strokeWidth="2.5"
            strokeDasharray="6,4"
            strokeLinecap="round"
            className="animate-pulse"
          />
          <path
            d="M 110,410 C 125,440 135,470 145,490"
            fill="none"
            opacity="0.7"
            stroke="#d4af37"
            strokeWidth="1.8"
            strokeDasharray="3,3"
          />

          {/* Live Chauffeur Transit Pulse */}
          <circle cx="190" cy="260" r="4.5" fill="#f2ca50">
            <animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values="0.2;1;0.2" />
          </circle>
        </svg>

        {/* Ambient Dark Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-background/80 pointer-events-none" />

        {/* Top Controls Bar */}
        <div className="absolute top-3 inset-x-0 px-4 flex flex-col gap-2.5 z-20">
          {/* Trip Selector Pill */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-2 bg-card/90 backdrop-blur-2xl px-3.5 py-2 rounded-full border border-border/60 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-display text-sm text-foreground tracking-wide font-medium">
                Bali Sanctuary Arc
              </span>
              <span className="bg-primary/20 text-primary text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase">
                Day 2 Active
              </span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Weather & Time Micro-Chip */}
            <div className="flex items-center gap-1.5 bg-card/85 backdrop-blur-xl px-3 py-1.5 rounded-full border border-border/50 shadow-lg">
              <Sun className="w-4 h-4 text-primary" />
              <span className="font-sans text-[10px] text-foreground font-medium">
                28°C • UBUD
              </span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: "all", label: "All Waypoints" },
              { id: "villas", label: "Villas" },
              { id: "gastronomy", label: "Gastronomy" },
              { id: "scenic", label: "Scenic" },
            ].map((cat) => {
              const isSelected = activeFilter === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id as FilterCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 shadow-sm ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold shadow-primary/20"
                      : "bg-card/80 backdrop-blur-md text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Waypoint Pins Layer */}
        {/* Pin 1: Ngurah Rai Airport VIP Ramp */}
        <div
          onClick={() => setSelectedPin("dps")}
          className="absolute left-[105px] top-[400px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-primary/25 animate-ping" />
            <div className="w-7 h-7 rounded-full bg-card border border-border shadow-xl flex items-center justify-center text-primary">
              <Plane className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap bg-background/90 backdrop-blur-md px-2 py-0.5 rounded border border-border/40 shadow-lg">
            <span className="text-[9px] font-sans text-foreground tracking-wider uppercase">
              DPS VIP RAMP
            </span>
          </div>
        </div>

        {/* Transit Time Capsule */}
        <div className="absolute left-[135px] top-[340px] z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-card/95 backdrop-blur-xl px-2.5 py-1 rounded-full border border-border/60 shadow-lg">
            <Car className="w-3 h-3 text-primary" />
            <span className="text-[9px] text-primary font-semibold">
              35m Transfer • Chauffeur Standby
            </span>
          </div>
        </div>

        {/* Pin 2: The Seminyak Base */}
        <div
          onClick={() => setSelectedPin("seminyak")}
          className="absolute left-[175px] top-[290px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/35 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-9 whitespace-nowrap bg-card/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/40 shadow-xl">
            <span className="text-xs text-primary font-semibold">
              The Seminyak Base
            </span>
          </div>
        </div>

        {/* Pin 3: Merah Putih */}
        <div
          onClick={() => setSelectedPin("merah")}
          className="absolute left-[215px] top-[230px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-secondary shadow-md">
            <Utensils className="w-3 h-3" />
          </div>
          <div className="absolute left-7 top-0 whitespace-nowrap bg-background/85 backdrop-blur-md px-2 py-0.5 rounded border border-border/40 shadow">
            <span className="text-[9px] text-muted-foreground">Merah Putih</span>
          </div>
        </div>

        {/* Pin 4: Highlands Arc (Ubud) */}
        <div
          onClick={() => setSelectedPin("ubud")}
          className="absolute left-[265px] top-[140px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 rounded-full bg-primary/30 animate-pulse" />
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary via-accent to-primary text-primary-foreground shadow-xl shadow-primary/40 flex items-center justify-center">
              <TreePine className="w-4 h-4" />
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap bg-card/95 backdrop-blur-md px-3 py-1 rounded-full border border-border/60 shadow-2xl">
            <span className="text-xs text-foreground font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Ubud Highlands Arc
            </span>
          </div>
        </div>

        {/* Pin 5: Uluwatu Cliff */}
        <div
          onClick={() => setSelectedPin("uluwatu")}
          className="absolute left-[145px] top-[485px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
        >
          <div className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground shadow-md">
            <Landmark className="w-3 h-3" />
          </div>
          <div className="absolute left-7 -top-1 whitespace-nowrap bg-background/85 backdrop-blur-md px-2 py-0.5 rounded border border-border/40 shadow">
            <span className="text-[9px] text-muted-foreground">Uluwatu Cliff</span>
          </div>
        </div>

        {/* Floating Map Action Controllers (Right Edge) */}
        <div className="absolute right-4 bottom-10 flex flex-col gap-2 z-20">
          <button
            type="button"
            onClick={() => setRadarActive(!radarActive)}
            aria-label="Live Chauffeur Radar"
            className={`w-11 h-11 rounded-full backdrop-blur-2xl shadow-xl flex items-center justify-center transition-all active:scale-95 ${
              radarActive
                ? "bg-primary text-primary-foreground shadow-primary/30"
                : "bg-card/90 text-primary border border-border/60"
            }`}
          >
            <Navigation className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Reset Compass"
            className="w-11 h-11 rounded-full bg-card/90 backdrop-blur-2xl text-muted-foreground border border-border/60 shadow-xl flex items-center justify-center hover:text-foreground active:scale-95 transition-all"
          >
            <Compass className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="3D Topography Elevation"
            className="w-11 h-11 rounded-full bg-card/90 backdrop-blur-2xl text-muted-foreground border border-border/60 shadow-xl flex items-center justify-center hover:text-foreground active:scale-95 transition-all"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Frosted Glass Bottom Itinerary Sheet */}
      <div className="relative -mt-6 w-full bg-card/95 backdrop-blur-3xl rounded-t-3xl border-t border-border/60 shadow-[0_-16px_40px_rgba(0,0,0,0.7)] px-4 pt-2.5 pb-8 flex flex-col gap-5 z-30">
        {/* Drag Handle */}
        <div className="w-full flex justify-center py-1">
          <span className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Sheet Header & Segment */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-[10px] text-primary uppercase tracking-widest font-semibold">
                Active Itinerary Segment
              </span>
              <h2 className="font-display text-xl text-foreground font-medium">
                Day 2 • Ubud &amp; Central Highlands
              </h2>
            </div>
            <button
              type="button"
              aria-label="Tune itinerary parameters"
              className="w-9 h-9 rounded-full bg-background/60 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Metrics Strip Capsule */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="bg-background/60 border border-border/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-foreground font-medium">5 Waypoints</span>
            </div>
            <div className="bg-background/60 border border-border/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
              <Ruler className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs text-foreground font-medium">48 km Total</span>
            </div>
            <div className="bg-background/60 border border-border/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-foreground font-medium">
                1h 45m Chauffeur Transit
              </span>
            </div>
            <div className="bg-background/60 border border-secondary/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-secondary font-semibold">
                Traffic: Flawless
              </span>
            </div>
          </div>
        </div>

        {/* AI Route Optimization Card */}
        <div className="relative bg-background/60 border border-primary/30 p-4 rounded-2xl overflow-hidden shadow-lg">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"
          />
          <div className="flex flex-col gap-2.5 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-sans text-[10px] text-primary uppercase font-bold tracking-wider">
                  AI Route Optimization
                </span>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                BACKTRACK -62%
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Re-sequenced{" "}
              <span className="text-foreground font-semibold">Tegalalang Mist Walk</span>{" "}
              to 07:00 AM before tour coaches arrive, saving 42 mins transfer time.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setOptApplied(true)}
                className={`flex-1 py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all ${
                  optApplied
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground shadow-primary/20"
                }`}
              >
                {optApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Optimization Applied</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Apply Route Optimization</span>
                  </>
                )}
              </button>

              <button
                type="button"
                aria-label="Dismiss Suggestion"
                className="w-9 h-9 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-foreground flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Arc Preview */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base text-foreground font-medium">
              Timeline Arc Preview
            </h3>
            <span className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">
              Chronological Order
            </span>
          </div>

          <div className="relative flex flex-col gap-4 pl-3 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-[1.5px] before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
            {/* Waypoint 1 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-card shrink-0 mt-1 shadow-sm" />
              <div className="flex-1 flex flex-col bg-background/60 border border-border/50 p-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans text-primary font-bold tracking-wider uppercase">
                    07:00 AM • PRIORITY DEPARTURE
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                </div>
                <span className="font-display text-sm text-foreground mt-0.5 font-medium">
                  Sunrise Rice Terrace &amp; Private Canopy Walk
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Tegalalang Valley • Reserved VIP Access Trail
                </span>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-[10px]">
                  <span className="text-secondary font-medium">Low Crowd Window</span>
                  <span>•</span>
                  <span>Chauffeur: Lexus LM Hybrid</span>
                </div>
              </div>
            </div>

            {/* Waypoint 2 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-3.5 h-3.5 rounded-full bg-border ring-4 ring-card shrink-0 mt-1" />
              <div className="flex-1 flex flex-col bg-background/40 border border-border/40 p-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    11:30 AM
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">
                    Ceremonial Guide Booked
                  </span>
                </div>
                <span className="font-display text-sm text-foreground mt-0.5 font-medium">
                  Sacred Water Purification at Tirta Empul
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Central Tampaksiring • Private Courtyard Entry
                </span>
              </div>
            </div>

            {/* Waypoint 3 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-3.5 h-3.5 rounded-full bg-border ring-4 ring-card shrink-0 mt-1" />
              <div className="flex-1 flex flex-col bg-background/40 border border-border/40 p-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    01:30 PM
                  </span>
                  <span className="text-[10px] text-primary font-semibold">
                    Michelin Guide Recommended
                  </span>
                </div>
                <span className="font-display text-sm text-foreground mt-0.5 font-medium">
                  Locavore NXT Multi-Course Tasting
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Chef's Table • Curated Wine Pairing
                </span>
              </div>
            </div>

            {/* Waypoint 4 */}
            <div className="relative flex items-start gap-3.5">
              <div className="w-3.5 h-3.5 rounded-full bg-border ring-4 ring-card shrink-0 mt-1" />
              <div className="flex-1 flex flex-col bg-background/40 border border-border/40 p-3 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    04:30 PM
                  </span>
                  <span className="text-[10px] text-primary font-semibold">
                    Sunset Transit
                  </span>
                </div>
                <span className="font-display text-sm text-foreground mt-0.5 font-medium">
                  Scenic Sayan Ridge Sunset Return
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Ayung River Valley Drive back to Coastal Suite
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Chauffeur Telemetry Floating Status Bar */}
        <div className="bg-background/80 border border-border/60 p-3.5 rounded-2xl flex items-center justify-between shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnbkF93vnzN7aj3jkAqzRJycvQ7rQ707hDwokAn7u1zPi4a-HxcDxmDFvPSqaWAXzhgvDYmgQWj_qPteSBotnYUJIaM3VHyRQFETFQdZBL0A-v3ojK7-wbuECmbnqejAxnw97CYPhOhX1Qv5yU82t53L-Ut9YfQ6uCTwoWfYjNjCWkWGObGpFE9Gjhv2chAgreQMEhMJtJUFnwLC_20lJ6KOoOrrBJLdAE0VEvCcEUHRFQXorGtI8A"
                alt="Chauffeur Wayan Sudarma"
                className="w-11 h-11 rounded-full object-cover shadow"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary border-2 border-background" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-[10px] text-primary uppercase font-semibold">
                Dedicated Chauffeur
              </span>
              <span className="text-xs text-foreground font-semibold truncate">
                Wayan Sudarma • Lexus LM350h
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Wifi className="w-3 h-3 text-secondary" />
                Air Quality: PM2.5 = 6 (Pristine)
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert("Connecting to private chauffeur Wayan Sudarma...")}
            aria-label="Call Chauffeur"
            className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
