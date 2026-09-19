import { useState } from "react"
import {
  Sparkles,
  Mic,
  ImagePlus,
  ArrowRight,
  Car,
  Star,
  ArrowUpRight,
  Plane,
  ChevronRight,
  Loader2,
} from "lucide-react"

const INSPIRATION_CHIPS = [
  "✦ Weekend getaway",
  "✦ Beach escape",
  "✦ Ultra-luxury villa",
  "✦ Adventure & Nature",
  "✦ Cultural immersion",
  "✦ Solo retreat",
]

const RECENT_TRIPS = [
  {
    id: "bali",
    destination: "Bali, Indonesia",
    duration: "4 Days • Luxury Villa & Sanctuary",
    season: "Dry Season",
    rating: "5.0",
    status: "Upcoming",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4A4mxhHGePOmdN_o7ucKP29JR5k9xobf0eSQYvDFfK-JIm1LiWpnVFwYmhHx7lh0BuCPcERnThzaK7FlEx_pPDy4K2NMc6KrngSjQpRyqBliOx9HWtP1ZMO3vIIWGq24PqyKXjgOIJt2jtZ0C00yS8wiaQC994rLSDSlflpPqOC5Jkcrce5uhLpWO_pMH_jaQ_Ym4DOrGE0kqdVwpul47p4NpSliZhhAIAoaCTQ7rHezq_j0IBRz_",
  },
  {
    id: "kyoto",
    destination: "Kyoto, Japan",
    duration: "7 Days • Private Onsen & Tea Ryokan",
    season: "Autumn Flora",
    rating: "4.9",
    status: "Planned",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuQvMefaEYZIepitxX2HQ1HQiMfiotFR6U0mRiPleqMH7hGNATYvJy-xwyJmaUK0GmU3OJcYPfgRdMz9U4ACWpVeTjtjiu-g_MOdgYci6fJ9Fd_C85Ls5lrRJntpRJJOVIJ5YXsIlmWrGgBK9JmR7DiFvnh8ufQueuHdiMed_0s0LQs6YkA8AryaOZ1j0EvULs9OXMk-U6WCcT70hc2fnG74z0d45CmHXBuGQ4mytoCLAU76kxYuEU",
  },
  {
    id: "amalfi",
    destination: "Amalfi Coast, Italy",
    duration: "5 Days • Cliffside Suite & Yacht",
    season: "Summer Mist",
    rating: "4.9",
    status: "Draft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS3pNfiYrzb0FE69gmxDE5ccDmC6x3QgOYSW3-GpYZdM1JLIVzgC4LJJ4AP8PSDUkKwS9Scx8UsFq8W6KKtvlHFcGpOu_I-HNKymESjFhAQhe_iewwXCr1hScIRzlBwxeZk9XIfRLrOhNS2mgF7J1pOgVjvPVFtPfuAXzQFyjVYHETCmL-c1wKH-ox9cFJnfRBv5QnyCVrDoaSPCTg1XcuM-hYvfoWYo3xG0aTNyO7pC0Mm3xRshpc",
  },
]

export function CuratedVoyageHome({ onTripSelect }: { onTripSelect?: (tripId: string) => void }) {
  const [prompt, setPrompt] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isCurating, setIsCurating] = useState(false)

  const handleChipClick = (chipText: string) => {
    const clean = chipText.replace("✦", "").trim()
    setPrompt(
      `Craft an exclusive ${clean.toLowerCase()} with bespoke dining, five-star private villa accommodations, and seamless private transfers...`
    )
  }

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true)
      setTimeout(() => {
        setIsListening(false)
        setPrompt(
          "Private 3-day wellness charter around Greek Cyclades with dedicated chef and secluded coves."
        )
      }, 2500)
    } else {
      setIsListening(false)
    }
  }

  const handleCurate = () => {
    if (!prompt.trim()) return
    setIsCurating(true)
    setTimeout(() => {
      setIsCurating(false)
      setPrompt("")
      onTripSelect?.("bali")
    }, 1200)
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-24 pb-28 gap-6">
      {/* 1. Hero Header */}
      <div className="relative flex flex-col pt-2">
        <div
          aria-hidden="true"
          className="absolute -top-12 -left-8 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        />
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-sans text-[10px] tracking-[0.2em] text-primary uppercase font-semibold">
            Elite Purser Intelligence
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-foreground leading-[1.15] font-normal">
          Where are you{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic font-display">
            dreaming
          </span>{" "}
          of going?
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Tell me your idea. I'll turn it into an effortless luxury trip.
        </p>
      </div>

      {/* 2. Bespoke Concierge Input Card */}
      <div className="relative w-full">
        <div
          aria-hidden="true"
          className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/15 to-transparent blur-md opacity-80 animate-pulse pointer-events-none"
        />
        <div className="relative rounded-2xl bg-card/85 backdrop-blur-2xl p-4 sm:p-5 border border-border/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] flex flex-col gap-4">
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold tracking-wide">
                HappyTrip Bespoke Concierge
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/60 border border-border/40">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-[9px] font-semibold text-secondary uppercase tracking-widest">
                Private Line
              </span>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                isListening
                  ? "Listening to your voyage preferences in Mayfair English..."
                  : "Plan a 5-day escape to Bali with private beach clubs, local temple dining, and relaxed luxury pace..."
              }
              rows={3}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 text-sm resize-none focus:outline-none leading-relaxed"
            />
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceToggle}
                aria-label="Voice prompt"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  isListening
                    ? "bg-primary text-primary-foreground animate-pulse shadow-md"
                    : "bg-background/60 hover:bg-card text-primary border border-border/50"
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Upload visual moodboard"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-background/60 hover:bg-card text-muted-foreground hover:text-primary transition-colors border border-border/50"
              >
                <ImagePlus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleCurate}
              aria-label="Curate journey"
              disabled={isCurating}
              className="flex items-center justify-center gap-1.5 pl-4 pr-3.5 py-2.5 rounded-full bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground text-xs font-semibold shadow-[0_4px_16px_rgba(242,202,80,0.3)] active:scale-95 transition-transform"
            >
              {isCurating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Drafting...</span>
                </>
              ) : (
                <>
                  <span>Curate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Curated Inspirations Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground">
          Curated Inspirations
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 snap-x">
          {INSPIRATION_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="shrink-0 snap-start px-3.5 py-2 rounded-full bg-card/75 hover:bg-card border border-border/50 text-foreground hover:text-primary active:scale-95 transition-all text-xs font-medium tracking-wide shadow-sm"
            >
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Recent Curated Trips Horizontal Scroll */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-display text-lg sm:text-xl text-foreground font-medium">
              Recent Curated Trips
            </h2>
            <span className="text-xs text-muted-foreground">
              Active reservations and custom itineraries
            </span>
          </div>
          <button
            type="button"
            className="text-[10px] tracking-widest uppercase font-semibold text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 snap-x snap-mandatory">
          {RECENT_TRIPS.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onTripSelect?.(trip.id)}
              className="snap-start shrink-0 w-[285px] sm:w-[300px] rounded-2xl bg-card/85 border border-border/60 flex flex-col overflow-hidden shadow-[0_16px_32px_rgba(0,0,0,0.45)] group cursor-pointer hover:border-primary/40 transition-colors"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-44 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-card/85 backdrop-blur-md text-foreground font-sans text-[9px] font-semibold tracking-widest uppercase flex items-center gap-1 shadow-sm border border-border/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {trip.status}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-md text-primary text-[10px] font-semibold border border-primary/20">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  <span>{trip.rating}</span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="p-4 flex flex-col gap-2.5">
                <div>
                  <h3 className="font-display text-base text-foreground font-medium">
                    {trip.destination}
                  </h3>
                  <p className="text-xs text-muted-foreground">{trip.duration}</p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-background/70 text-secondary text-[9px] tracking-wider uppercase font-semibold border border-border/30">
                      {trip.season}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                      <Car className="w-3.5 h-3.5 text-primary" />
                      <span>Chauffeur</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Open ${trip.destination} details`}
                    className="w-7 h-7 rounded-full bg-background/70 border border-border/40 flex items-center justify-center text-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Aviation Standby Banner */}
      <div className="rounded-2xl bg-card/75 border border-border/60 p-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              Aviation Concierge On Standby
            </span>
            <span className="text-[11px] text-muted-foreground">
              Direct charter coordination in 14 minutes
            </span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-primary shrink-0" />
      </div>
    </div>
  )
}
