import { useState } from "react"
import {
  Search,
  Mic,
  SlidersHorizontal,
  Stars,
  Star,
  Sparkles,
  ArrowRight,
  Compass,
  ChevronRight,
  BookmarkPlus,
  Loader2,
  ChevronLeft,
} from "lucide-react"

type CategoryKey = "all" | "atolls" | "alpine" | "desert" | "cultural" | "michelin"

const FILTER_CATEGORIES: { id: CategoryKey; label: string }[] = [
  { id: "all", label: "All Sanctuaries" },
  { id: "atolls", label: "Private Atolls" },
  { id: "alpine", label: "Alpine Chalets" },
  { id: "desert", label: "Desert Oases" },
  { id: "cultural", label: "Cultural Havens" },
  { id: "michelin", label: "Michelin Escapes" },
]

const HABITATS = [
  {
    id: "kyoto",
    tag: "Private Ryokan",
    region: "Japan • Kansai Heritage",
    title: "Kyoto & Imperial Traditions",
    desc: "Private 16th-generation tea masters, hidden Arashiyama onsen estates, and kaiseki evenings.",
    price: "From $2,400 / night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvAP56k_gC9Tp8u6b7lfER_CUQIfnYKLdlpi32n4-Yz3quczPLw5ZSTgOGzGG5uB-Lzg-guVARsDe91ygLsFAy160aW3cXy1ZHttMmd8_UfPWnQ7_yKMd2yqf4LOg6RoY-iDMoKBt_T21XcGjgHg137YtBbk0a2vPIpept7TeJMr_seKCsV9zX-SySErP_w1Sg6vCTUb7CDR5N_vNh1lT8evVz0KLpbVHikZlZQTtYTsA6J_rMU-o4",
  },
  {
    id: "iceland",
    tag: "Glacier & Sky",
    region: "Iceland • Arctic Highlands",
    title: "Celestial Aurora Lodges",
    desc: "Private helicopter glacier landings, thermal lagoon dining, and bespoke astronomical guides.",
    price: "From $3,100 / night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAX2Sw0RewuzgN7Z7ylZV9nGcbGN0FK1RPYcK_UthLyt5IWvuFBZkcgNSRBwLBNdH37RypmV-vALsHdWU_oKxuAFuaYYqrDZtHEhpfqUaXSvQ7tgf7CjcndgUlrJ6W7-5XHHdATPPPkdcDkOchtx2xf81Je4SMRrAgSvUETtPqWfzFf7o143ntu2MmO4RGc1KQiGzEENp4ZVuYyRNhy4fSllWm9-d26SBsCA1Ato0DALa-41Gt0pRqX",
  },
  {
    id: "raja-ampat",
    tag: "Superyacht Safari",
    region: "Indonesia • Coral Triangle",
    title: "Raja Ampat Sanctuaries",
    desc: "Private catamaran expeditions, master dive instruction, and untouched bioluminescent lagoons.",
    price: "From $4,500 / night",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBbWRLRlDh2c7QS8g3RAJWW_l6UhJwLSsQHgXxcbd3BdUmI3cekYqKSn4i-uFbTa8-wmEFc5yqzoh5Hr1Kl83miQQh09t0BrdseCySWP68-3zkMT4oeCUY9dX7TZXat68-fXxczRZ8k6XULdk5zCi73TT1vDr0hCAgFcHXihqlM8ypMfqNXyGYAzsSHc-XAFrJl6nVhDDc9N4_OL15MetirJ-RR_i_N0mNpkd5O_jFw5kpu_WoKYaq",
  },
]

export function ExploreDestinations({
  onDraftClick,
  onMapClick,
}: {
  onDraftClick?: () => void
  onMapClick?: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all")
  const [isDrafting, setIsDrafting] = useState(false)
  const [oracleStatus, setOracleStatus] = useState("Ask AI for tailored sanctum matches")
  const [isListening, setIsListening] = useState(false)

  const handleDraft = () => {
    setIsDrafting(true)
    setTimeout(() => {
      setIsDrafting(false)
      onDraftClick?.()
    }, 1500)
  }

  const handleOracleClick = () => {
    setOracleStatus("Synthesizing member tastes...")
    setTimeout(() => {
      setOracleStatus("Matching private atolls & villas...")
      setTimeout(() => {
        setOracleStatus("Ask AI for tailored sanctum matches")
      }, 1500)
    }, 1200)
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    setTimeout(() => {
      setIsListening(false)
      setSearchQuery("Private Amalfi cliffside villa with yacht tender")
    }, 2000)
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-24 pb-28 gap-6">
      {/* 1. Editorial Header Section */}
      <section className="flex flex-col gap-1.5 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-sans text-[10px] uppercase text-primary tracking-[0.2em] font-semibold">
            Curated Discovery &amp; Bespoke Destinations
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight font-normal leading-tight">
          Where will you{" "}
          <span className="italic font-display text-primary font-normal">
            drift next?
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
          Hand-selected private atolls, secluded alpine refuges, and imperial retreats orchestrated exclusively by your HappyTrip travel atelier.
        </p>
      </section>

      {/* 2. Natural Language AI Search Bar */}
      <section className="relative">
        <div className="flex items-center w-full rounded-full bg-card/85 backdrop-blur-2xl border border-border/60 shadow-xl px-4 py-2 gap-2.5">
          <Search className="w-4 h-4 text-primary shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isListening
                ? "Listening to your destination wish..."
                : "Search sanctuaries, remote atolls, private estates..."
            }
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 text-xs focus:outline-none min-w-0 font-sans"
          />
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleVoiceSearch}
              aria-label="Voice Search"
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                isListening
                  ? "bg-primary text-primary-foreground animate-pulse shadow-md"
                  : "bg-background/60 text-secondary hover:text-primary"
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="Adjust Filters"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-background/60 text-muted-foreground hover:text-primary transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Curated Collection Filter Chips */}
      <section className="-mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-0.5 snap-x">
        {FILTER_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 snap-start px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-primary/20"
                  : "bg-card/70 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          )
        })}
      </section>

      {/* 4. Featured Destination Showcase Card (Flagship Showcase) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary">
            <Stars className="w-4 h-4 text-primary fill-primary" />
            <span className="font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-primary">
              Flagship Showcase
            </span>
          </div>
          <span className="text-[10px] text-secondary font-medium uppercase tracking-wider">
            Verified Dossier
          </span>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden bg-card border border-border/60 shadow-2xl flex flex-col group">
          {/* Media Layer with Scrim */}
          <div className="relative w-full h-80 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT1wzd3cG6Gv7STkDvFMQBTw03491vAAQ0vtMUbgwrmcnngEMS0vSC5ERlODNwE3JN64ft1oczDh2zbIFUAyDX85QJvjOoTjczJH_lvU6wotAxAhE-eYv-_pjbjw56fMFq79o6MHJawp61r0_nNx65zpKE5PwoRj6c3o885k1UXDmlbYJdUBjjCOhdL6G_Ij7N_1yXnpnarhUOCOx2v90-baS6q0LHY8vmfCbyF1ak1o3mJwO-rt7x"
              alt="Amalfi Coast & Capri, Italy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {/* Top Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-primary font-sans text-[10px] tracking-wider uppercase font-semibold border border-primary/20">
                HappyTrip Spotlight • Yacht Charter
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-md text-foreground text-xs font-semibold border border-border/40">
                <Star className="w-3 h-3 text-primary fill-primary" />
                <span>4.98</span>
              </div>
            </div>

            {/* In-Hero Content Hook */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col">
              <span className="font-sans text-[10px] text-secondary uppercase tracking-widest font-semibold">
                Campania &amp; Tyrrhenian Sea
              </span>
              <h2 className="font-display text-xl sm:text-2xl text-foreground mt-0.5 font-medium">
                Amalfi Coast &amp; Capri, Italy
              </h2>
            </div>
          </div>

          {/* Card Dossier Details */}
          <div className="p-4 sm:p-5 flex flex-col gap-3.5">
            {/* Highlights Row */}
            <div className="grid grid-cols-3 gap-2 py-2 rounded-xl bg-background/60 border border-border/40 text-center">
              <div className="flex flex-col items-center justify-center p-1">
                <span className="text-[9px] text-muted-foreground uppercase font-medium">Duration</span>
                <span className="text-xs text-foreground font-semibold mt-0.5">7 Days Private</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1">
                <span className="text-[9px] text-muted-foreground uppercase font-medium">Estate</span>
                <span className="text-xs text-foreground font-semibold mt-0.5">Cliffside Palazzo</span>
              </div>
              <div className="flex flex-col items-center justify-center p-1">
                <span className="text-[9px] text-muted-foreground uppercase font-medium">Transit</span>
                <span className="text-xs text-foreground font-semibold mt-0.5">Wally 52 Tender</span>
              </div>
            </div>

            {/* AI Whisper Card */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-card/90 border border-primary/25 backdrop-blur-md">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-primary tracking-wider uppercase font-semibold">
                  HappyTrip Predictive Insight
                </span>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed italic">
                  Optimal window: Mid-Sept to Oct for tranquil Blue Grotto navigation, calm bath-warm currents, and private vintner cellar access in Ravello.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleDraft}
              disabled={isDrafting}
              className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
            >
              {isDrafting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Private Charter Dossier...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Draft Itinerary with AI Atelier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Destination Collections Carousel (Horizontal Swipe) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-sans text-[10px] text-primary uppercase tracking-[0.16em] font-semibold">
              Curated Curiosities
            </span>
            <h3 className="font-display text-lg text-foreground font-medium mt-0.5">
              Premier Habitats
            </h3>
          </div>
          <button
            type="button"
            className="text-xs text-primary hover:underline flex items-center gap-0.5 font-medium"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Swipe Cards */}
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2 pt-1 snap-x snap-mandatory">
          {HABITATS.map((item) => (
            <div
              key={item.id}
              className="min-w-[275px] max-w-[275px] rounded-2xl bg-card border border-border/60 overflow-hidden flex flex-col shadow-xl shrink-0 snap-start group"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-background/80 backdrop-blur-md text-primary font-sans text-[10px] uppercase font-semibold border border-border/40">
                  {item.tag}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between gap-3">
                <div>
                  <span className="font-sans text-[9px] text-secondary uppercase font-medium">
                    {item.region}
                  </span>
                  <h4 className="font-display text-base text-foreground font-medium mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="font-sans text-[10px] text-primary uppercase tracking-widest font-semibold">
                    {item.price}
                  </span>
                  <button
                    type="button"
                    aria-label={`Open ${item.title}`}
                    className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Map Dossier Teaser */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary">
            <Compass className="w-4 h-4 text-primary" />
            <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">
              Global Cartography
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">Live Satellite Overlay</span>
        </div>

        <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-xl bg-card border border-border/60">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1m4uDGRTIAZxTZZXvi2ubqcIeA2IMgCvJHVKpY3GroSk5ilqf0phz0ti663JVLwqpgFBioJi9VdJut7D9CWU_ETfs54IROmVlIstuOlx1Xywu5zkdVmxpTn0IU4P5C6fejMTLZXmfbSS7rlhMTEozZZtuL_NizcWqsOJE7UJw64aGt88G3KC5BGQ-dSIAmw_vjQFcG3A0hJng-K2NR5yZm0ko6QT_wQBYjPVQYtdQYYK78C_1Ncvl')",
            }}
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-card/90 text-foreground font-sans text-[10px] tracking-widest uppercase font-semibold border border-border/50">
                Private Airway Coordinates
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className="font-sans text-[10px] text-secondary uppercase font-medium">
                  Charter Route Active
                </span>
                <h4 className="font-display text-lg text-foreground font-medium">
                  Tuamotu Archipelago
                </h4>
              </div>
              <button
                type="button"
                onClick={onMapClick}
                className="px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground font-sans text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>Explore Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Hidden Gems Curated by AI (Confidential Enclaves) */}
      <section className="flex flex-col gap-2 pb-2">
        <div className="flex items-center gap-1.5 text-primary">
          <Stars className="w-4 h-4 text-primary fill-primary" />
          <h3 className="font-display text-lg text-foreground font-medium">
            Confidential Enclaves
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Autonomous machine discovery of low-footprint, high-discretion sanctuaries reserved for HappyTrip patrons.
        </p>

        <div className="flex flex-col gap-2.5 mt-1">
          {/* Enclave Item 1 */}
          <div className="p-3.5 rounded-2xl bg-card border border-border/60 flex items-center gap-3.5 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP8FQ-ypTOJv8S4anPpKl4g0FFoxWbGRssQxvE7Kx_CjDWLbPYxqZzmVgvKV7TKFkeTpdDHxs2XWQGfPalC-3yUJ47xZdoPERHpaBGU6MgIT8HJ7D9gHbr1Fm5Ql8x-7WpOiu5AmvPFmbFoBjO9wmqKUF5OxgslowyjT9Ty9nDFi7VfqIjZzMsh-hsvDRRWIAIbC-2e2DUBpZkg-pICCmliealEyr6bsDYZV3ljku3h-t94vD9tZvH"
                alt="Trøndelag Fjord Norway"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-grow">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] text-primary uppercase font-semibold">
                  Trøndelag Fjord, Norway
                </span>
                <span className="text-[10px] text-secondary font-medium">0% Light Index</span>
              </div>
              <h4 className="font-display text-sm text-foreground truncate mt-0.5">
                Fjord Sanctuary &amp; Foraging Lab
              </h4>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                Zero light pollution, Nordic sauna barge, and private 3-star Michelin chef in residence.
              </p>
            </div>
            <div className="shrink-0 text-primary">
              <BookmarkPlus className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Enclave Item 2 */}
          <div className="p-3.5 rounded-2xl bg-card border border-border/60 flex items-center gap-3.5 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe1VAxcxsidDvIK_71Px5aDn3ox4FipfUirrKxWJ_uQCIuv9HaExyPsXDcXtbLXpJTWtVPKs-Z540-x0pAKtfz6i0DNbi_wrRQ2iEcCT-80s2sTfowI_b2bi66JcxBRopLYi-R5GWwlje2SjkFHLL2nWNEZGh9XOEPqJq7zrS2dbVjiucU8UpoCfsc7s8qvmIhlIKL7pTz52wQ1suio5UbG3IRDisf3lxbynriuEMjqHOez_gRQ8dD"
                alt="Siwa Oasis Egypt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-grow">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] text-primary uppercase font-semibold">
                  Siwa Oasis, Egypt
                </span>
                <span className="text-[10px] text-secondary font-medium">Pure Isolation</span>
              </div>
              <h4 className="font-display text-sm text-foreground truncate mt-0.5">
                Adrere Amellal Salt Haven
              </h4>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                Eco-luxury kershef villas, luminous salt pools, and bespoke Bedouin astronomers.
              </p>
            </div>
            <div className="shrink-0 text-primary">
              <BookmarkPlus className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Sticky Floating AI Concierge Drawer Trigger */}
      <div className="sticky bottom-24 z-30 self-center w-full max-w-sm">
        <button
          type="button"
          onClick={handleOracleClick}
          className="w-full py-3 px-4 rounded-full bg-card/95 backdrop-blur-2xl border border-primary/30 text-foreground shadow-[0_16px_36px_-8px_rgba(0,0,0,0.85)] flex items-center justify-between group active:scale-95 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-[9px] uppercase tracking-wider text-primary font-bold">
                HappyTrip Travel Oracle
              </span>
              <span className="text-xs text-foreground font-medium truncate max-w-[220px]">
                {oracleStatus}
              </span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-background/80 flex items-center justify-center text-primary group-hover:-translate-x-0.5 transition-transform">
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </div>
  )
}
