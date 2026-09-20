import { useState, useRef, useEffect } from "react"
import { ThemeToggle } from "../ui/ThemeToggle"
import { HappyTripLogo } from "../home/HappyTripLogo"

export interface CalibratedVoyageData {
  source: string
  destination: string
  budget: string
  party: string
  sanctuary: string
  landmarks: string[]
  gastronomy: string[]
}

interface AuraConciergeCalibrationProps {
  destination?: string
  initialSource?: string
  onBack: () => void
  onSynthesize: (data: CalibratedVoyageData) => void
}

interface ChatMessage {
  id: string
  sender: "user" | "concierge"
  text: string
  time: string
}

// Destination-specific metadata catalog
function getDestinationData(dest: string) {
  const normalized = dest.toLowerCase().trim()

  if (normalized.includes("kyoto") || normalized.includes("japan")) {
    return {
      name: "Kyoto",
      arcTitle: "Imperial Kyoto & Zen Arc",
      dates: "Nov 04 – 09",
      dossier: "Dossier #9102",
      sanctuaries: [
        {
          id: "kyoto-1",
          title: "Historic Gion Machiya Villa • Higashiyama",
          subtitle: "Centuries-old cedar pavilion, private zen garden & master tea master",
          icon: "temple_buddhist",
        },
        {
          id: "kyoto-2",
          title: "Bamboo Grove Onsen Ryokan • Arashiyama",
          subtitle: "Natural geothermal waters, mountain mist & personal nakai-san attendant",
          icon: "forest",
        },
        {
          id: "kyoto-3",
          title: "Kamo Riverfront Heritage Suite • Kamigyo",
          subtitle: "Tatami terraces overlooking tranquil watercourses & cherry blossoms",
          icon: "villa",
        },
        {
          id: "kyoto-4",
          title: "Zen Botanical Sanctuary • Kitayama",
          subtitle: "Modern Japanese minimalist estate surrounded by cedar forests",
          icon: "spa",
        },
      ],
      landmarks: [
        {
          id: "kyoto-lm-1",
          title: "Fushimi Inari Dawn Path & Sacred Torii",
          subtitle: "Private dawn ascent before public hours with Shinto priest blessings",
        },
        {
          id: "kyoto-lm-2",
          title: "Kinkaku-ji Golden Pavilion Private Garden",
          subtitle: "Exclusive morning tea ceremony in the gilded lakeside pavilion",
        },
        {
          id: "kyoto-lm-3",
          title: "Arashiyama Bamboo Forest & Tenryu-ji",
          subtitle: "Highland bamboo walk and 14th-century UNESCO zen reflection ponds",
        },
        {
          id: "kyoto-lm-4",
          title: "Kiyomizu-dera Veranda Sunset Vista",
          subtitle: "Panoramic twilight over ancient pagodas from the historic wooden terrace",
        },
      ],
      gastronomy: [
        { id: "kyoto-g-1", title: "Kikunoi Honten", desc: "Three-Michelin-star Kaiseki in Maruyama" },
        { id: "kyoto-g-2", title: "Gion Sasaki", desc: "Modern Kappo dining with grandmaster chef" },
        { id: "kyoto-g-3", title: "Monk Kyoto", desc: "Philosopher's Path 7-course wood-fired tasting" },
        { id: "kyoto-g-4", title: "Pontocho Riverside", desc: "Traditional Kawadoko summer deck banquet" },
      ],
      quickChips: [
        "Dedicated Chauffeur (Alphard Royal)",
        "Shinkansen Gran Class",
        "Geisha Cultural Evening",
        "Matcha Tea Master Class",
        "Full 5-Day Arc",
      ],
    }
  }

  if (normalized.includes("amalfi") || normalized.includes("italy") || normalized.includes("positano")) {
    return {
      name: "Amalfi Coast",
      arcTitle: "Amalfi Coast Tyrrhenian Arc",
      dates: "Jul 12 – 17",
      dossier: "Dossier #7721",
      sanctuaries: [
        {
          id: "amalfi-1",
          title: "Cliffside Palazzo & Sea Grotto • Positano",
          subtitle: "Iconic pastel cascades, private infinity plunge & yacht mooring",
          icon: "villa",
        },
        {
          id: "amalfi-2",
          title: "Ravello Belvedere Estate • Ravello",
          subtitle: "350 meters above the cobalt Mediterranean with fragrant lemon groves",
          icon: "forest",
        },
        {
          id: "amalfi-3",
          title: "Private Cove Villa • Capri Island",
          subtitle: "Faraglioni rock vistas, private motor launch & dedicated concierge",
          icon: "beach_access",
        },
        {
          id: "amalfi-4",
          title: "Heritage Nautical Suite • Amalfi Port",
          subtitle: "Historic maritime architecture with panoramic sea vistas",
          icon: "temple_buddhist",
        },
      ],
      landmarks: [
        {
          id: "amalfi-lm-1",
          title: "Capri Blue Grotto Private Wooden Riva",
          subtitle: "Sunrise private charter into glowing azure limestone grottos",
        },
        {
          id: "amalfi-lm-2",
          title: "Path of the Gods Cliffside Walk",
          subtitle: "Guided high-altitude trail with Mediterranean cliff panoramas",
        },
        {
          id: "amalfi-lm-3",
          title: "Villa Cimbrone Infinity Gardens",
          subtitle: "Terrace of Infinity marble statues overlooking Salerno gulf",
        },
        {
          id: "amalfi-lm-4",
          title: "Duomo di Amalfi & Cloister of Paradise",
          subtitle: "9th-century Moorish cloisters and private bell tower access",
        },
      ],
      gastronomy: [
        { id: "amalfi-g-1", title: "Quattro Passi", desc: "Nerano 3-star seaside Mediterranean perfection" },
        { id: "amalfi-g-2", title: "La Sponda", desc: "400 romantic evening candles in Positano" },
        { id: "amalfi-g-3", title: "Rossellinis", desc: "Ravello cliffside Michelin degustation" },
        { id: "amalfi-g-4", title: "Lo Scoglio", desc: "Authentic yacht-tender fresh sea urchin & zucchini" },
      ],
      quickChips: [
        "Private Riva 56' Rivale Yacht",
        "Helicopter Transfer (Naples - Positano)",
        "Capri Sunset Apertivo",
        "Lemon Grove Wine Tasting",
        "Full 5-Day Arc",
      ],
    }
  }

  if (normalized.includes("paris") || normalized.includes("france")) {
    return {
      name: "Paris",
      arcTitle: "Haute Seine & Paris Arc",
      dates: "Sep 20 – 25",
      dossier: "Dossier #9420",
      sanctuaries: [
        {
          id: "paris-1",
          title: "Palace Suite • Place Vendôme",
          subtitle: "Private butler, gilded 18th-century salons & bespoke wine cellar",
          icon: "villa",
        },
        {
          id: "paris-2",
          title: "Seine Riverfront Penthouse • Île Saint-Louis",
          subtitle: "Panoramic views of Notre-Dame with private river launch access",
          icon: "beach_access",
        },
        {
          id: "paris-3",
          title: "Artisan Boutique Haven • Saint-Germain-des-Prés",
          subtitle: "Literary heritage, quiet courtyard gardens & antique furnishings",
          icon: "temple_buddhist",
        },
        {
          id: "paris-4",
          title: "Historic Royal Courtyard • Le Marais",
          subtitle: "Private aristocratic mansion with secluded sculpted hedges",
          icon: "forest",
        },
      ],
      landmarks: [
        {
          id: "paris-lm-1",
          title: "Private Louvre Nocturne & Mona Lisa Salon",
          subtitle: "After-hours private walkthrough led by head curator",
        },
        {
          id: "paris-lm-2",
          title: "Sainte-Chapelle Stained Glass Dawn Access",
          subtitle: "Witness illuminated Gothic jewel-toned windows in solitude",
        },
        {
          id: "paris-lm-3",
          title: "Palace of Versailles Grand Trianon Tour",
          subtitle: "Private royal carriage and secret Queen's Hamlet access",
        },
        {
          id: "paris-lm-4",
          title: "Montmartre Hidden Atelier & Wine Cellar",
          subtitle: "Private vineyard visit and avant-garde art atelier salon",
        },
      ],
      gastronomy: [
        { id: "paris-g-1", title: "Plénitude", desc: "Cheval Blanc Three-Michelin-star by Arnaud Donckele" },
        { id: "paris-g-2", title: "Le Gabriel", desc: "La Réserve imperial salon French haute cuisine" },
        { id: "paris-g-3", title: "Septime", desc: "Progressive French tasting & rare natural wines" },
        { id: "paris-g-4", title: "Guy Savoy", desc: "Monnaie de Paris riverside fine dining masterclass" },
      ],
      quickChips: [
        "Mercedes Maybach Chauffeur",
        "Private Seine Wooden Launch",
        "Opera Garnier Royal Box",
        "Champagne Cave Tasting",
        "Full 5-Day Arc",
      ],
    }
  }

  // Default: Bali (as in provided HTML) or custom dynamic
  const titleName = dest ? dest.charAt(0).toUpperCase() + dest.slice(1) : "Bali"
  return {
    name: titleName,
    arcTitle: `${titleName} Archipelago Arc`,
    dates: "Oct 14 – 19",
    dossier: "Dossier #8842",
    sanctuaries: [
      {
        id: "bali-1",
        title: "Cliffside Private Villa • Uluwatu",
        subtitle: "Dramatic limestone bluffs, private infinity edge & butler",
        icon: "villa",
      },
      {
        id: "bali-2",
        title: "Beachfront Haven • Seminyak",
        subtitle: "Lively sunset beach clubs, boutique shopping & ocean surf",
        icon: "beach_access",
      },
      {
        id: "bali-3",
        title: "Jungle Canopy Estate • Ubud",
        subtitle: "Ayung River gorge, serene mist, holistic wellness retreats",
        icon: "forest",
      },
      {
        id: "bali-4",
        title: "Luxury Heritage Resort • Nusa Dua",
        subtitle: "Sprawling palaces, manicured white sands & calm lagoons",
        icon: "temple_buddhist",
      },
    ],
    landmarks: [
      {
        id: "bali-lm-1",
        title: "Uluwatu Sea Temple & Sunset Kecak",
        subtitle: "Ocean amphitheatres & private purser viewing box",
      },
      {
        id: "bali-lm-2",
        title: "Tirta Empul Sacred Water Springs",
        subtitle: "Exclusive dawn purification ceremony with temple elder",
      },
      {
        id: "bali-lm-3",
        title: "Tegalalang Terraces & Secret Waterfalls",
        subtitle: "Highland jungle trekking and organic plantation tasting",
      },
      {
        id: "bali-lm-4",
        title: "Besakih Mother Temple of Bali",
        subtitle: "Grand volcano slopes of Mt Agung & heirloom history",
      },
    ],
    gastronomy: [
      { id: "bali-g-1", title: "Merah Putih", desc: "Modern Indonesian translucent cathedral" },
      { id: "bali-g-2", title: "Locavore NXT", desc: "Pioneering Ubud forest hyper-local degustation" },
      { id: "bali-g-3", title: "Jimbaran Seashore", desc: "Candlelit seafood on private ocean sand" },
      { id: "bali-g-4", title: "Sundara Sunset", desc: "Four Seasons beachfront cocktail & grill" },
    ],
    quickChips: [
      "Dedicated Chauffeur (Lexus LM350h)",
      "Chartered Helicopter Transfers",
      "Explore Sunset Cliffs in Uluwatu",
      "Add Ayurvedic Forest Spa Day",
      "Review full 5-day itinerary outline",
    ],
  }
}

interface MapHub {
  id: string
  name: string
  code: string
  label: string
  country: string
  x: number // svg coordinate 0-960
  y: number // svg coordinate 0-440
}

const GLOBAL_HUBS: MapHub[] = [
  { id: "london", name: "London", code: "LHR", label: "London (LHR)", country: "United Kingdom", x: 440, y: 140 },
  { id: "newyork", name: "New York", code: "JFK", label: "New York (JFK)", country: "United States", x: 260, y: 175 },
  { id: "dubai", name: "Dubai", code: "DXB", label: "Dubai (DXB)", country: "United Arab Emirates", x: 570, y: 200 },
  { id: "singapore", name: "Singapore", code: "SIN", label: "Singapore (SIN)", country: "Singapore", x: 730, y: 265 },
  { id: "tokyo", name: "Tokyo", code: "HND", label: "Tokyo (HND)", country: "Japan", x: 820, y: 175 },
  { id: "paris", name: "Paris", code: "CDG", label: "Paris (CDG)", country: "France", x: 460, y: 155 },
  { id: "bali", name: "Bali", code: "DPS", label: "Bali (DPS)", country: "Indonesia", x: 760, y: 295 },
  { id: "kyoto", name: "Kyoto", code: "KIX", label: "Kyoto (KIX)", country: "Japan", x: 805, y: 180 },
  { id: "amalfi", name: "Amalfi Coast", code: "NAP", label: "Amalfi (NAP)", country: "Italy", x: 485, y: 172 },
  { id: "zurich", name: "Swiss Alps", code: "ZRH", label: "Zurich (ZRH)", country: "Switzerland", x: 472, y: 160 },
  { id: "losangeles", name: "Los Angeles", code: "LAX", label: "Los Angeles (LAX)", country: "United States", x: 170, y: 185 },
  { id: "sydney", name: "Sydney", code: "SYD", label: "Sydney (SYD)", country: "Australia", x: 860, y: 350 },
]

function findHub(query: string, defaultHub: MapHub): MapHub {
  if (!query) return defaultHub
  const q = query.toLowerCase()
  const found = GLOBAL_HUBS.find(
    (h) =>
      h.name.toLowerCase().includes(q) ||
      h.code.toLowerCase() === q ||
      q.includes(h.name.toLowerCase()) ||
      q.includes(h.code.toLowerCase())
  )
  if (found) return found
  let hash = 0
  for (let i = 0; i < query.length; i++) {
    hash = (hash << 5) - hash + query.charCodeAt(i)
  }
  const x = 200 + (Math.abs(hash) % 560)
  const y = 140 + (Math.abs(hash >> 3) % 180)
  return {
    id: "custom",
    name: query.split("(")[0].trim(),
    code: query.includes("(") ? query.split("(")[1].replace(")", "").trim().toUpperCase() : "ARC",
    label: query,
    country: "Bespoke Port",
    x,
    y,
  }
}

function calculateFlightStats(source: MapHub, destination: MapHub) {
  const dx = (destination.x - source.x) * 18
  const dy = (destination.y - source.y) * 26
  const rawDist = Math.round(Math.sqrt(dx * dx + dy * dy))
  const distanceKm = Math.max(1200, Math.min(18500, rawDist * 28))
  const hours = Math.floor(distanceKm / 850)
  const minutes = Math.round(((distanceKm % 850) / 850) * 60)
  
  let aircraft = "Super-Midsize Jet • Citation Longitude"
  if (distanceKm > 7000) {
    aircraft = "Ultra Long-Range Jet • Gulfstream G650ER"
  } else if (distanceKm < 3000) {
    aircraft = "Executive Light Jet • Phenom 300E"
  }

  return {
    distanceKm: distanceKm.toLocaleString(),
    flightTime: `${hours}h ${minutes}m`,
    aircraft,
  }
}

interface BudgetTier {
  id: string
  name: string
  range: string
  amount: number
  description: string
  features: string[]
  icon: string
}

const BUDGET_TIERS: BudgetTier[] = [
  {
    id: "signature",
    name: "Signature Sovereign",
    range: "$5,000 – $10,000",
    amount: 8500,
    description: "Curated 5-Star Boutique Suites • Dedicated Airport Purser • Priority Reserves",
    features: ["5-Star Signature Suites", "Private Executive Transfers", "Sommelier Curated Tables"],
    icon: "hotel",
  },
  {
    id: "imperial",
    name: "Imperial Bespoke",
    range: "$10,000 – $25,000",
    amount: 18000,
    description: "Private Cliffside/Forest Villa with Pool • Dedicated Butler • Chauffeur • Degustation Pairings",
    features: ["Private Villa Estate", "Dedicated 24/7 Butler", "Michelin Degustation Arc", "Helicopter Transfer"],
    icon: "diamond",
  },
  {
    id: "royal",
    name: "Royal Sovereign Ultra",
    range: "$25,000+",
    amount: 35000,
    description: "Private Jet Arc • Private Island/Palazzo Buyout • Superyacht Excursions • Master Purser",
    features: ["Private Jet Flight Trajectory", "Exclusive Estate Buyout", "Superyacht Day Charter", "Master Purser Attaché"],
    icon: "workspace_premium",
  },
]

export function AuraConciergeCalibration({
  destination = "Bali",
  initialSource = "London (LHR)",
  onBack,
  onSynthesize,
}: AuraConciergeCalibrationProps) {
  // Source & Destination states
  const [sourceInput, setSourceInput] = useState<string>(initialSource)
  const [destinationInput, setDestinationInput] = useState<string>(destination)

  // Active Hubs for Map calculation
  const defaultSourceHub = GLOBAL_HUBS[0] // London
  const defaultDestHub = GLOBAL_HUBS[6] // Bali
  const sourceHub = findHub(sourceInput, defaultSourceHub)
  const destHub = findHub(destinationInput, defaultDestHub)

  // Telemetry
  const flightStats = calculateFlightStats(sourceHub, destHub)

  // Destination Catalog data dynamically tied to destinationInput
  const destData = getDestinationData(destinationInput)

  // Budget states
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>("imperial")
  const [budgetAmount, setBudgetAmount] = useState<number>(18000)

  // One-by-one question progression states
  // Step 1: Source & Destination with Interactive Map
  // Step 2: Budget Calibration
  // Step 3: Travel Party & Composition
  // Step 4: Sanctuary & Hotel Atmosphere
  // Step 5: Sacred Landmarks (multi-select)
  // Step 6: Gastronomy (multi-select)
  // Step 7: Synthesize CTA
  const [currentQuestionStep, setCurrentQuestionStep] = useState<number>(1)

  // Selected values for steps 3 - 6
  const [selectedParty, setSelectedParty] = useState<string>("Intimate Couple")
  const [selectedSanctuary, setSelectedSanctuary] = useState<string>(destData.sanctuaries[0].title)
  const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([
    destData.landmarks[0].title,
    destData.landmarks[1].title,
  ])
  const [selectedGastronomy, setSelectedGastronomy] = useState<string[]>([
    destData.gastronomy[0].title,
    destData.gastronomy[3].title,
  ])

  // Sync selections when destination changes
  const [prevDestination, setPrevDestination] = useState<string>(destinationInput)
  if (destinationInput !== prevDestination) {
    setPrevDestination(destinationInput)
    if (destData.sanctuaries[0]) {
      setSelectedSanctuary(destData.sanctuaries[0].title)
    }
    if (destData.landmarks.length >= 2) {
      setSelectedLandmarks([destData.landmarks[0].title, destData.landmarks[1].title])
    }
    if (destData.gastronomy.length >= 2) {
      setSelectedGastronomy([destData.gastronomy[0].title, destData.gastronomy[1].title])
    }
  }

  // Interactive chat stream
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const chatStreamRef = useRef<HTMLDivElement>(null)

  // Scroll to new content smoothly
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [currentQuestionStep, messages])

  const handleSwapLocations = () => {
    const temp = sourceInput
    setSourceInput(destinationInput)
    setDestinationInput(temp)
  }

  const handleConfirmRoute = () => {
    if (currentQuestionStep < 2) {
      setCurrentQuestionStep(2)
    }
  }

  const handleBudgetTierSelect = (tierId: string) => {
    setSelectedBudgetTier(tierId)
    const tier = BUDGET_TIERS.find((t) => t.id === tierId)
    if (tier) {
      setBudgetAmount(tier.amount)
    }
  }

  const handleConfirmBudget = () => {
    if (currentQuestionStep < 3) {
      setCurrentQuestionStep(3)
    }
  }

  const handlePartySelect = (party: string) => {
    setSelectedParty(party)
    if (currentQuestionStep < 4) {
      setCurrentQuestionStep(4)
    }
  }

  const handleSanctuarySelect = (sanctuaryTitle: string) => {
    setSelectedSanctuary(sanctuaryTitle)
    if (currentQuestionStep < 5) {
      setCurrentQuestionStep(5)
    }
  }

  const toggleLandmark = (title: string) => {
    setSelectedLandmarks((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const proceedFromLandmarks = () => {
    if (currentQuestionStep < 6) {
      setCurrentQuestionStep(6)
    }
  }

  const toggleGastronomy = (title: string) => {
    setSelectedGastronomy((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const proceedFromGastronomy = () => {
    if (currentQuestionStep < 7) {
      setCurrentQuestionStep(7)
    }
  }

  const handleQuickChipClick = (chip: string) => {
    handleSendMessage(chip)
  }

  const messageCountRef = useRef(0)

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim()
    if (!text) return

    messageCountRef.current += 1
    const currentCount = messageCountRef.current

    const userMsg: ChatMessage = {
      id: `user-msg-${currentCount}`,
      sender: "user",
      text,
      time: "Just now • Atelier Direct",
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputText("")

    // Generate Concierge response
    setTimeout(() => {
      messageCountRef.current += 1
      const aiCount = messageCountRef.current
      const conciergeMsg: ChatMessage = {
        id: `ai-msg-${aiCount}`,
        sender: "concierge",
        text: `Noted with utmost discretion. I am weaving "${text}" into your ${destData.name} voyage blueprint and synchronising with our local purser team.`,
        time: "Just now • HappyTrip AI Concierge",
      }
      setMessages((prev) => [...prev, conciergeMsg])
    }, 600)
  }

  const handleVoiceToggle = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true)
      setTimeout(() => {
        setIsVoiceActive(false)
        handleSendMessage("Request private sunrise yacht transfer and butler tasting menu")
      }, 2000)
    } else {
      setIsVoiceActive(false)
    }
  }

  const handleCompleteSynthesis = () => {
    const budgetTierName = BUDGET_TIERS.find((t) => t.id === selectedBudgetTier)?.name || "Imperial Bespoke"
    onSynthesize({
      source: sourceInput,
      destination: destData.name,
      budget: `$${budgetAmount.toLocaleString()} / guest (${budgetTierName})`,
      party: selectedParty,
      sanctuary: selectedSanctuary,
      landmarks: selectedLandmarks,
      gastronomy: selectedGastronomy,
    })
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen relative flex flex-col antialiased selection:bg-primary selection:text-on-primary w-full">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 pt-safe px-3 sm:px-4 flex justify-center pointer-events-none">
        <div className="relative overflow-hidden pointer-events-auto w-full max-w-md h-16 sm:h-20 flex items-center justify-between rounded-full luxury-glass px-4 sm:px-5 my-2 transition-all duration-300">
          {/* Specular glass reflection sheen */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent pointer-events-none rounded-t-full" />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              aria-label="Return to Concierge Home"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 hover:bg-card text-primary hover:text-foreground border border-border/60 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <div className="flex-shrink-0">
              <HappyTripLogo size={32} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm sm:text-base font-normal tracking-[0.16em] uppercase text-foreground">
                  HAPPYTRIP
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-pulse" />
                <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full bg-primary/15 text-primary font-semibold uppercase tracking-wider border border-primary/20">
                  Private AI
                </span>
              </div>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.18em] font-semibold text-primary uppercase">
                VOYAGE CONCIERGE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              type="button"
              aria-label="Active Concierge Profile"
              className="relative p-[2px] rounded-full bg-gradient-to-tr from-primary via-accent to-primary/60 shadow-[0_0_12px_rgba(242,202,80,0.35)] flex items-center justify-center min-w-[38px] min-h-[38px]"
            >
              <img
                alt="Concierge Purser"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdeHFtdiwk9SvJTy932LOHStMk4XM2H_atYrbieEdKtq45CY9DWzoVm1GkkkKLGgDmtG19y8VfNQQfDPZcU_k9VpvhSnt_RG8jmzH1RbGQ7n3B3ihvht77tbHwGA9qrTe8LS6ATK3QPzMT6kerBnce9zTZ3WntMHLE984v8ywFrbc_pBdX2Z8GEsD1lubU4hxuaCLs7gKPa9LGdP8SGVPpfSEceSqDJeTwBCAJjou1OthuIronGT6d"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex flex-col relative w-full pt-24 pb-12 bg-surface min-h-screen items-center">
        <div className="flex flex-col w-full max-w-md mx-auto px-3 sm:px-4">
          {/* Subtle Ambient Topographic Lighting */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Concierge Session Context Pill */}
            <div className="pt-space-xs pb-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm border border-border/40">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping absolute opacity-60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary relative" />
                  </div>
                  <span className="font-label-caps text-[10px] uppercase tracking-[0.14em] text-secondary truncate">
                    HappyTrip Bespoke Atelier • Private Line
                  </span>
                </div>
                <span className="font-label-caps text-[10px] tracking-[0.12em] text-tertiary-fixed bg-surface-container-high px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {destData.dossier}
                </span>
              </div>
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-1.5 text-secondary">
                  <span className="material-symbols-outlined text-[15px] text-primary">auto_awesome</span>
                  <span className="font-label-md text-label-md tracking-wider">
                    Voyage Curation: {destData.arcTitle}
                  </span>
                </div>
                <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {destData.dates}
                </span>
              </div>
            </div>

            {/* Chat Stream Scroll View */}
            <div className="flex flex-col gap-space-lg px-0 pt-space-sm pb-40" id="chat-stream" ref={chatStreamRef}>
              {/* User Prompt Entry */}
              <div className="flex flex-col items-end gap-1.5 ml-8 animate-fadeIn">
                <div className="bg-surface-container-high text-on-surface rounded-2xl rounded-tr-sm px-space-md py-space-sm shadow-md max-w-sm border border-border/30">
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    I want to curate a bespoke 5-day voyage to {destData.name}. Let's calibrate my preferences and itinerary anchors.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant px-1">
                  <span className="font-body-sm text-[10px] tracking-wide">10:28 AM • Sent via Concierge Prompt</span>
                  <span
                    className="material-symbols-outlined text-[13px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    done_all
                  </span>
                </div>
              </div>

              {/* AI Concierge Opening Capsule */}
              <div className="flex flex-col gap-space-md mr-1">
                {/* AI Identity Capsule */}
                <div className="flex items-center gap-2 px-1">
                  <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">diamond</span>
                  </div>
                  <span className="font-headline-sm text-[15px] text-primary tracking-wide">
                    HappyTrip AI Concierge
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
                    {destData.name} Dossier
                  </span>
                </div>

                {/* AI Opening Message */}
                <div className="bg-surface-container text-on-surface rounded-2xl rounded-tl-sm p-space-md shadow-lg flex flex-col gap-space-sm border border-primary/20">
                  <p className="font-title-editorial text-[17px] text-primary-fixed leading-snug font-medium">
                    Welcome to the HappyTrip Bespoke Calibration. Let us map your flight trajectory, calibrate your voyage investment, and tailor your private sanctuaries and culinary reservations.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Begin by confirming your departure origin and destination sanctuary below:
                  </p>
                </div>

                {/* Progressive MCQ & Interactive Flow Container */}
                <div className="flex flex-col gap-space-md" id="mcq-calibration-flow">
                  {/* STEP 1: Origin & Destination with Interactive Map */}
                  <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-md transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                          1
                        </span>
                        <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                          Flight Trajectory &amp; Destination Arc
                        </h4>
                      </div>
                      <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Interactive Map
                      </span>
                    </div>

                    {/* Source and Destination Input Fields with Swap */}
                    <div className="flex flex-col gap-2.5">
                      {/* Source Input */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="source-city-input"
                          className="font-label-caps text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-primary">
                            flight_takeoff
                          </span>
                          <span>Departure Origin (Source)</span>
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="source-city-input"
                            type="text"
                            value={sourceInput}
                            onChange={(e) => setSourceInput(e.target.value)}
                            placeholder="e.g. London (LHR), New York (JFK), Dubai (DXB)"
                            className="w-full bg-surface-container text-foreground px-3.5 py-2.5 rounded-lg border border-border/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-medium"
                          />
                        </div>
                        {/* Quick origin presets */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                          {["London (LHR)", "New York (JFK)", "Dubai (DXB)", "Singapore (SIN)", "Tokyo (HND)"].map(
                            (preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setSourceInput(preset)}
                                className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all whitespace-nowrap ${
                                  sourceInput.toLowerCase().includes(preset.split(" ")[0].toLowerCase())
                                    ? "bg-primary/20 border-primary text-primary font-semibold"
                                    : "bg-surface-container border-border/40 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {preset}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Swap Button Divider */}
                      <div className="relative flex items-center justify-center my-0.5">
                        <div className="absolute inset-x-0 h-px bg-border/40" />
                        <button
                          type="button"
                          onClick={handleSwapLocations}
                          title="Swap Departure and Destination"
                          className="relative z-10 w-8 h-8 rounded-full bg-surface-container border border-border hover:border-primary text-muted-foreground hover:text-primary flex items-center justify-center transition-all active:scale-90 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                        </button>
                      </div>

                      {/* Destination Input */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="dest-city-input"
                          className="font-label-caps text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[14px] text-primary">
                            flight_land
                          </span>
                          <span>Destination Sanctuary</span>
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="dest-city-input"
                            type="text"
                            value={destinationInput}
                            onChange={(e) => setDestinationInput(e.target.value)}
                            placeholder="e.g. Bali, Kyoto, Amalfi Coast, Paris"
                            className="w-full bg-surface-container text-foreground px-3.5 py-2.5 rounded-lg border border-border/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-medium"
                          />
                        </div>
                        {/* Quick destination presets */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                          {["Bali (DPS)", "Kyoto (KIX)", "Amalfi Coast (NAP)", "Paris (CDG)", "Swiss Alps (ZRH)"].map(
                            (preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setDestinationInput(preset.split(" (")[0])}
                                className={`text-[10px] px-2.5 py-0.5 rounded-full border transition-all whitespace-nowrap ${
                                  destinationInput.toLowerCase().includes(preset.split(" ")[0].toLowerCase())
                                    ? "bg-primary/20 border-primary text-primary font-semibold"
                                    : "bg-surface-container border-border/40 text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {preset}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Procedural Vector Map Canvas */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-surface-container border border-border/50 shadow-inner select-none">
                      {/* Top HUD Overlay */}
                      <div className="absolute top-2.5 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1.5 bg-background/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/50 text-[10px] shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-semibold text-foreground">{sourceHub.code}</span>
                          <span className="text-primary">➔</span>
                          <span className="font-semibold text-primary">{destHub.code}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-background/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/50 text-[10px] shadow-sm">
                          <span className="text-muted-foreground">Est.</span>
                          <span className="font-semibold text-foreground">{flightStats.flightTime}</span>
                          <span className="text-muted-foreground">({flightStats.distanceKm} km)</span>
                        </div>
                      </div>

                      {/* Vector Map SVG with Continents and Glowing Great Circle Arc */}
                      {(() => {
                        const midX = (sourceHub.x + destHub.x) / 2
                        const deltaX = Math.abs(destHub.x - sourceHub.x)
                        const arcElevation = Math.max(45, Math.min(130, deltaX * 0.22))
                        const ctrlY = Math.min(sourceHub.y, destHub.y) - arcElevation
                        const curvatureOffset = deltaX < 40 ? 50 : 0
                        const routeArcPath = `M ${sourceHub.x},${sourceHub.y} Q ${midX + curvatureOffset},${ctrlY} ${destHub.x},${destHub.y}`

                        return (
                          <svg
                            viewBox="0 0 960 440"
                            className="w-full h-56 sm:h-64 object-cover"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient id="mapFlightGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                                <stop offset="40%" stopColor="#f2ca50" stopOpacity="0.95" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="1" />
                              </linearGradient>
                              <filter id="flightTrajectoryGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                              <radialGradient id="hubHalo" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#f2ca50" stopOpacity="0" />
                              </radialGradient>
                            </defs>

                            {/* Deep Ocean / Surface Background */}
                            <rect width="960" height="440" fill="currentColor" className="text-surface-container" />

                            {/* Latitude / Longitude luxury grid lines */}
                            <g stroke="currentColor" className="text-border/25" strokeWidth="0.8" strokeDasharray="3 4">
                              <line x1="0" y1="110" x2="960" y2="110" />
                              <line x1="0" y1="220" x2="960" y2="220" />
                              <line x1="0" y1="330" x2="960" y2="330" />
                              <line x1="240" y1="0" x2="240" y2="440" />
                              <line x1="480" y1="0" x2="480" y2="440" />
                              <line x1="720" y1="0" x2="720" y2="440" />
                            </g>

                            {/* World Continents / Topographic silhouettes */}
                            <g fill="currentColor" className="text-card/85 dark:text-card/70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1">
                              {/* North America */}
                              <path d="M 100,75 Q 180,60 260,80 T 320,130 T 280,210 T 210,210 T 130,150 Z" />
                              {/* South America */}
                              <path d="M 235,225 Q 300,230 315,290 T 285,380 T 240,360 T 215,280 Z" />
                              {/* Europe */}
                              <path d="M 410,85 Q 490,75 520,125 T 480,180 T 430,170 T 395,120 Z" />
                              {/* Africa */}
                              <path d="M 425,185 Q 525,180 535,250 T 515,350 T 465,365 T 415,280 T 405,215 Z" />
                              {/* Asia */}
                              <path d="M 520,85 Q 700,65 820,105 T 870,210 T 780,265 T 675,245 T 575,220 T 515,145 Z" />
                              {/* Australia & Oceania */}
                              <path d="M 775,310 Q 860,300 870,365 T 815,405 T 755,370 Z" />
                            </g>

                            {/* Connecting Great Circle Flight Trajectory Arc */}
                            <path
                              d={routeArcPath}
                              fill="none"
                              stroke="url(#mapFlightGlowGrad)"
                              strokeWidth="2.8"
                              strokeDasharray="6 4"
                              filter="url(#flightTrajectoryGlow)"
                            />

                            {/* Traveling Animated Flight Pulse Indicator */}
                            <circle r="4.5" fill="#f2ca50">
                              <animateMotion path={routeArcPath} dur="3.5s" repeatCount="indefinite" />
                            </circle>
                            <circle r="11" fill="#f2ca50" opacity="0.3">
                              <animateMotion path={routeArcPath} dur="3.5s" repeatCount="indefinite" />
                            </circle>

                            {/* Waypoint Pins for all Global Hubs */}
                            {GLOBAL_HUBS.map((hub) => {
                              const isSource = sourceHub.id === hub.id || sourceInput.toLowerCase().includes(hub.name.toLowerCase())
                              const isDest = destHub.id === hub.id || destinationInput.toLowerCase().includes(hub.name.toLowerCase())

                              return (
                                <g
                                  key={hub.id}
                                  className="cursor-pointer group transition-transform hover:scale-125"
                                  onClick={() => {
                                    if (isSource) {
                                      // Toggle or no-op
                                    } else {
                                      setDestinationInput(hub.name)
                                    }
                                  }}
                                >
                                  {isSource && (
                                    <>
                                      <circle cx={hub.x} cy={hub.y} r="16" fill="#10b981" opacity="0.2" />
                                      <circle cx={hub.x} cy={hub.y} r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                                      <rect
                                        x={hub.x - 22}
                                        y={hub.y - 24}
                                        width="44"
                                        height="15"
                                        rx="4"
                                        fill="#071510"
                                        stroke="#10b981"
                                        strokeWidth="1"
                                      />
                                      <text
                                        x={hub.x}
                                        y={hub.y - 14}
                                        fill="#10b981"
                                        fontSize="9"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        fontFamily="sans-serif"
                                      >
                                        DEP: {hub.code}
                                      </text>
                                    </>
                                  )}

                                  {isDest && (
                                    <>
                                      <circle cx={hub.x} cy={hub.y} r="18" fill="#d4af37" opacity="0.25">
                                        <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                                      </circle>
                                      <circle cx={hub.x} cy={hub.y} r="6" fill="#d4af37" stroke="#ffffff" strokeWidth="1.5" />
                                      <rect
                                        x={hub.x - 24}
                                        y={hub.y - 25}
                                        width="48"
                                        height="16"
                                        rx="4"
                                        fill="#071510"
                                        stroke="#d4af37"
                                        strokeWidth="1"
                                      />
                                      <text
                                        x={hub.x}
                                        y={hub.y - 14}
                                        fill="#d4af37"
                                        fontSize="9.5"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        fontFamily="sans-serif"
                                      >
                                        ARR: {hub.code}
                                      </text>
                                    </>
                                  )}

                                  {!isSource && !isDest && (
                                    <>
                                      <circle cx={hub.x} cy={hub.y} r="3" fill="#8A9A92" opacity="0.6" />
                                      <text
                                        x={hub.x}
                                        y={hub.y + 11}
                                        fill="#8A9A92"
                                        fontSize="7.5"
                                        textAnchor="middle"
                                        fontFamily="sans-serif"
                                        opacity="0.8"
                                      >
                                        {hub.code}
                                      </text>
                                    </>
                                  )}
                                </g>
                              )
                            })}
                          </svg>
                        )
                      })()}

                      {/* Bottom Telemetry HUD Bar */}
                      <div className="bg-surface-container-high/90 backdrop-blur-md px-3 py-2 border-t border-border/40 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-foreground truncate">
                          <span className="material-symbols-outlined text-[14px] text-primary">
                            flight
                          </span>
                          <span className="truncate">{flightStats.aircraft}</span>
                        </div>
                        <span className="text-[10px] text-primary uppercase font-semibold tracking-wider whitespace-nowrap pl-2">
                          GPS Locked
                        </span>
                      </div>
                    </div>

                    {/* Step 1 Confirmation Button */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleConfirmRoute}
                        className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                      >
                        <span>Confirm Route &amp; Calibrate Budget</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* STEP 2: Budget & Investment Calibration (Appears when Step >= 2) */}
                  {currentQuestionStep >= 2 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            2
                          </span>
                          <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                            Voyage Investment &amp; Budget Tier
                          </h4>
                        </div>
                        <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
                          Calibrate Tier
                        </span>
                      </div>

                      <p className="text-[11px] text-muted-foreground">
                        Configure expenditure per guest covering private aviation, secluded sanctuary estates, and Michelin culinary pairings:
                      </p>

                      {/* 3 Luxury Tier Cards */}
                      <div className="flex flex-col gap-2 pt-1">
                        {BUDGET_TIERS.map((tier) => {
                          const isSelected = selectedBudgetTier === tier.id
                          return (
                            <button
                              key={tier.id}
                              type="button"
                              onClick={() => handleBudgetTierSelect(tier.id)}
                              className={`flex flex-col p-3 rounded-lg text-left transition-all ${
                                isSelected
                                  ? "bg-primary/10 border border-primary shadow-sm"
                                  : "bg-surface-container border border-outline-variant hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`material-symbols-outlined text-[18px] ${
                                      isSelected ? "text-primary" : "text-on-surface-variant"
                                    }`}
                                  >
                                    {tier.icon}
                                  </span>
                                  <span
                                    className={`font-body-md text-[13px] font-semibold ${
                                      isSelected ? "text-primary" : "text-on-surface"
                                    }`}
                                  >
                                    {tier.name}
                                  </span>
                                </div>
                                <span
                                  className={`text-[12px] font-bold ${
                                    isSelected ? "text-primary" : "text-foreground"
                                  }`}
                                >
                                  {tier.range}
                                </span>
                              </div>

                              <p className="text-[11px] text-muted-foreground mt-1">
                                {tier.description}
                              </p>

                              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                                {tier.features.map((feat) => (
                                  <span
                                    key={feat}
                                    className="text-[9px] px-2 py-0.5 rounded-full bg-surface-container-high text-muted-foreground border border-border/30"
                                  >
                                    {feat}
                                  </span>
                                ))}
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Interactive Budget Fine-Tuning Slider */}
                      <div className="bg-surface-container p-3 rounded-lg border border-border/40 mt-1 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground font-medium">Fine-tune Investment:</span>
                          <span className="font-display text-sm font-semibold text-primary">
                            ${budgetAmount.toLocaleString()} <span className="text-[10px] text-muted-foreground font-sans font-normal">/ guest</span>
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5000"
                          max="45000"
                          step="1000"
                          value={budgetAmount}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            setBudgetAmount(val)
                            if (val < 10000) setSelectedBudgetTier("signature")
                            else if (val <= 25000) setSelectedBudgetTier("imperial")
                            else setSelectedBudgetTier("royal")
                          }}
                          className="w-full accent-primary h-1.5 bg-card rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-muted-foreground">
                          <span>$5,000</span>
                          <span>$25,000</span>
                          <span>$45,000+</span>
                        </div>
                      </div>

                      {/* Step 2 Confirmation */}
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={handleConfirmBudget}
                          className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                        >
                          <span>Confirm Budget &amp; Next</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Travel Party & Composition (Appears when Step >= 3) */}
                  {currentQuestionStep >= 3 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            3
                          </span>
                          <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                            Travel Party &amp; Composition
                          </h4>
                        </div>
                        <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
                          Select One
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {[
                          { title: "Solo Voyage", subtitle: "Introspective sanctuary" },
                          { title: "Intimate Couple", subtitle: "Romantic cadence" },
                          { title: "Family Retreat", subtitle: "Multi-generational ease" },
                          { title: "Friends Group", subtitle: "Celebratory villa" },
                        ].map((item) => {
                          const isSelected = selectedParty === item.title
                          return (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => handlePartySelect(item.title)}
                              className={`flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                                isSelected
                                  ? "bg-primary/10 border border-primary shadow-sm"
                                  : "bg-surface-container border border-outline-variant hover:border-primary/50"
                              }`}
                            >
                              <div className="flex flex-col">
                                <span
                                  className={`font-body-md text-[13px] font-semibold ${
                                    isSelected ? "text-primary" : "text-on-surface"
                                  }`}
                                >
                                  {item.title}
                                </span>
                                <span
                                  className={`text-[11px] ${
                                    isSelected ? "text-secondary" : "text-on-surface-variant"
                                  }`}
                                >
                                  {item.subtitle}
                                </span>
                              </div>
                              <span
                                className={`material-symbols-outlined text-[16px] ${
                                  isSelected ? "text-primary" : "text-outline"
                                }`}
                                style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
                              >
                                {isSelected ? "check_circle" : "radio_button_unchecked"}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setCurrentQuestionStep(4)}
                          className="px-4 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <span>Confirm &amp; Next</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Sanctuary & Hotel Atmosphere (Appears when Step >= 4) */}
                  {currentQuestionStep >= 4 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            4
                          </span>
                          <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                            Sanctuary &amp; Hotel Atmosphere
                          </h4>
                        </div>
                        <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
                          Select Primary
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        {destData.sanctuaries.map((sanctuary) => {
                          const isSelected = selectedSanctuary === sanctuary.title
                          return (
                            <button
                              key={sanctuary.id}
                              type="button"
                              onClick={() => handleSanctuarySelect(sanctuary.title)}
                              className={`flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                                isSelected
                                  ? "bg-primary/10 border border-primary shadow-sm"
                                  : "bg-surface-container border border-outline-variant hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`material-symbols-outlined text-[20px] ${
                                    isSelected ? "text-primary" : "text-on-surface-variant"
                                  }`}
                                >
                                  {sanctuary.icon}
                                </span>
                                <div className="flex flex-col">
                                  <span
                                    className={`font-body-md text-[13px] font-semibold ${
                                      isSelected ? "text-primary" : "text-on-surface"
                                    }`}
                                  >
                                    {sanctuary.title}
                                  </span>
                                  <span
                                    className={`text-[11px] ${
                                      isSelected ? "text-secondary" : "text-on-surface-variant"
                                    }`}
                                  >
                                    {sanctuary.subtitle}
                                  </span>
                                </div>
                              </div>
                              <span
                                className={`material-symbols-outlined text-[18px] ${
                                  isSelected ? "text-primary" : "text-outline"
                                }`}
                                style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
                              >
                                {isSelected ? "check_circle" : "radio_button_unchecked"}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setCurrentQuestionStep(5)}
                          className="px-4 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <span>Confirm &amp; Next</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Sacred Landmarks & Anchors (Appears when Step >= 5) */}
                  {currentQuestionStep >= 5 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            5
                          </span>
                          <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                            Sacred Landmarks &amp; Anchors
                          </h4>
                        </div>
                        <span className="font-label-caps text-[10px] text-tertiary-fixed tracking-widest uppercase">
                          Select Multiple
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        {destData.landmarks.map((landmark) => {
                          const isSelected = selectedLandmarks.includes(landmark.title)
                          return (
                            <button
                              key={landmark.id}
                              type="button"
                              onClick={() => toggleLandmark(landmark.title)}
                              className={`flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                                isSelected
                                  ? "bg-primary/10 border border-primary shadow-sm"
                                  : "bg-surface-container border border-outline-variant hover:border-primary/50"
                              }`}
                            >
                              <div className="flex flex-col">
                                <span
                                  className={`font-body-md text-[13px] font-semibold ${
                                    isSelected ? "text-primary" : "text-on-surface"
                                  }`}
                                >
                                  {landmark.title}
                                </span>
                                <span
                                  className={`text-[11px] ${
                                    isSelected ? "text-secondary" : "text-on-surface-variant"
                                  }`}
                                >
                                  {landmark.subtitle}
                                </span>
                              </div>
                              <span
                                className={`material-symbols-outlined text-[18px] ${
                                  isSelected ? "text-primary" : "text-outline"
                                }`}
                                style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
                              >
                                {isSelected ? "check_box" : "check_box_outline_blank"}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/20">
                        <span className="text-[11px] text-muted-foreground">
                          {selectedLandmarks.length} landmark{selectedLandmarks.length !== 1 ? "s" : ""} chosen
                        </span>
                        <button
                          type="button"
                          onClick={proceedFromLandmarks}
                          className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                        >
                          <span>Confirm Landmarks</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Gastronomy & Dining (Appears when Step >= 6) */}
                  {currentQuestionStep >= 6 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            6
                          </span>
                          <h4 className="font-title-editorial text-[15px] text-on-surface font-medium">
                            Renowned Gastronomy &amp; Dining
                          </h4>
                        </div>
                        <span className="font-label-caps text-[10px] text-tertiary-fixed tracking-widest uppercase">
                          Select Highlights
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {destData.gastronomy.map((item) => {
                          const isSelected = selectedGastronomy.includes(item.title)
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleGastronomy(item.title)}
                              className={`flex flex-col justify-between p-2.5 rounded-lg text-left transition-all min-h-[76px] ${
                                isSelected
                                  ? "bg-primary/10 border border-primary shadow-sm"
                                  : "bg-surface-container border border-outline-variant hover:border-primary/50"
                              }`}
                            >
                              <div className="flex items-start justify-between w-full">
                                <span
                                  className={`font-body-md text-[13px] font-semibold ${
                                    isSelected ? "text-primary" : "text-on-surface"
                                  }`}
                                >
                                  {item.title}
                                </span>
                                <span
                                  className={`material-symbols-outlined text-[16px] ${
                                    isSelected ? "text-primary" : "text-outline"
                                  }`}
                                  style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
                                >
                                  {isSelected ? "check_box" : "check_box_outline_blank"}
                                </span>
                              </div>
                              <span
                                className={`text-[10px] ${
                                  isSelected ? "text-secondary" : "text-on-surface-variant"
                                }`}
                              >
                                {item.desc}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-border/20">
                        <span className="text-[11px] text-muted-foreground">
                          {selectedGastronomy.length} dining reservation{selectedGastronomy.length !== 1 ? "s" : ""} selected
                        </span>
                        <button
                          type="button"
                          onClick={proceedFromGastronomy}
                          className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                        >
                          <span>Confirm Gastronomy</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Primary Synthesize CTA Action Block (Appears when Step >= 7) */}
                  {currentQuestionStep >= 7 && (
                    <div className="bg-surface-container rounded-xl p-space-md shadow-lg flex flex-col items-center gap-space-sm border border-primary/30 mt-space-xs transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center gap-2 text-center">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          auto_awesome
                        </span>
                        <span className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          Calibration Complete
                        </span>
                      </div>
                      <div className="w-full bg-card/60 p-2.5 rounded-lg border border-border/40 text-[11px] flex flex-col gap-1 text-muted-foreground text-center">
                        <p className="text-foreground font-semibold">
                          Flight Trajectory: <span className="text-primary">{sourceInput}</span> ➔ <span className="text-primary">{destData.name}</span>
                        </p>
                        <p>
                          Investment Tier: <span className="text-primary font-medium">${budgetAmount.toLocaleString()} / guest ({BUDGET_TIERS.find((t) => t.id === selectedBudgetTier)?.name})</span>
                        </p>
                        <p>
                          Composition: {selectedParty} • Sanctuary: {selectedSanctuary.split("•")[0]}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCompleteSynthesis}
                        className="w-full py-3 px-space-md rounded-full bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-[14px] tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 duration-200"
                      >
                        <span>Synthesize {destData.name} Itinerary</span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          flight_takeoff
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Chat Messages Appended */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col transition-all duration-300 ${
                    msg.sender === "user" ? "items-end ml-8 gap-1.5" : "items-start mr-2 gap-space-xs"
                  }`}
                >
                  {msg.sender === "concierge" && (
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                      </div>
                      <span className="font-headline-sm text-[15px] text-primary tracking-wide">
                        HappyTrip AI Concierge
                      </span>
                      <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase text-[10px]">
                        Synthesising
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-space-md shadow-md ${
                      msg.sender === "user"
                        ? "bg-surface-container-high text-on-surface rounded-tr-sm max-w-sm"
                        : "bg-surface-container text-on-surface rounded-tl-sm border border-primary/20"
                    }`}
                  >
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      {msg.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-on-surface-variant px-1">
                    <span className="font-body-sm text-[10px] tracking-wide">{msg.time}</span>
                    {msg.sender === "user" && (
                      <span
                        className="material-symbols-outlined text-[13px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        done
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Interactive Anchor (Sticky Glassmorphic Bar) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 luxury-glass-bar pt-space-xs pb-6 flex justify-center">
        <div className="w-full max-w-md flex flex-col gap-space-sm px-3 sm:px-4">
          {/* Quick Reply Action Chips (Scrollable row) */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar">
            {destData.quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleQuickChipClick(chip)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/70 hover:bg-surface-container-highest text-on-surface text-label-md font-label-md tracking-wider transition-all duration-150 active:scale-95 shadow-sm border border-border/30"
              >
                <span className="material-symbols-outlined text-[14px] text-primary">
                  {chip.includes("Chauffeur")
                    ? "directions_car"
                    : chip.includes("Heli")
                    ? "helicopter"
                    : chip.includes("Sunset")
                    ? "wb_twilight"
                    : chip.includes("Spa")
                    ? "spa"
                    : "assignment"}
                </span>
                <span>{chip}</span>
              </button>
            ))}
          </div>

          {/* Chat Input Capsule */}
          <div className="flex items-center gap-space-xs bg-surface-container/70 rounded-full px-2 py-1.5 shadow-md border border-border/40">
            {/* Media/Attachment Trigger */}
            <button
              type="button"
              aria-label="Attach Voyage Document or Moodboard"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </button>

            {/* Text Composer */}
            <input
              type="text"
              id="concierge-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage()
              }}
              placeholder="Whisper your request or tap an option..."
              className="flex-1 bg-transparent text-on-surface placeholder:text-on-surface-variant/60 text-body-md font-body-md px-1 focus:outline-none"
            />

            {/* Voice Dictation */}
            <button
              type="button"
              aria-label="Dictate Voyage Request"
              onClick={handleVoiceToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
                isVoiceActive
                  ? "bg-primary text-on-primary animate-pulse shadow-md"
                  : "text-primary hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>

            {/* Primary Send Action Button */}
            <button
              type="button"
              aria-label="Transmit Request"
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary-fixed text-on-primary flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                arrow_upward
              </span>
            </button>
          </div>

          {/* Encryption badge */}
          <div className="flex items-center justify-center gap-2 text-on-surface-variant/70">
            <span className="material-symbols-outlined text-[12px] text-primary">lock</span>
            <span className="font-label-caps text-label-caps text-[9px] tracking-widest uppercase">
              HappyTrip Sovereign Atelier • End-to-End Encrypted
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
