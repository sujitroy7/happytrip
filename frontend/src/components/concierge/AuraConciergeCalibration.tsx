import { useState, useRef, useEffect } from "react"

export interface CalibratedVoyageData {
  destination: string
  party: string
  sanctuary: string
  landmarks: string[]
  gastronomy: string[]
}

interface AuraConciergeCalibrationProps {
  destination?: string
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

export function AuraConciergeCalibration({
  destination = "Bali",
  onBack,
  onSynthesize,
}: AuraConciergeCalibrationProps) {
  const destData = getDestinationData(destination)

  // One-by-one question progression states
  // Step 1: Party
  // Step 2: Sanctuary
  // Step 3: Sacred Landmarks (multi-select)
  // Step 4: Gastronomy (multi-select)
  // Step 5: Synthesize CTA
  const [currentQuestionStep, setCurrentQuestionStep] = useState<number>(1)

  // Selected values
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

  const handlePartySelect = (party: string) => {
    setSelectedParty(party)
    if (currentQuestionStep < 2) {
      setCurrentQuestionStep(2)
    }
  }

  const handleSanctuarySelect = (sanctuaryTitle: string) => {
    setSelectedSanctuary(sanctuaryTitle)
    if (currentQuestionStep < 3) {
      setCurrentQuestionStep(3)
    }
  }

  const toggleLandmark = (title: string) => {
    setSelectedLandmarks((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const proceedFromLandmarks = () => {
    if (currentQuestionStep < 4) {
      setCurrentQuestionStep(4)
    }
  }

  const toggleGastronomy = (title: string) => {
    setSelectedGastronomy((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    )
  }

  const proceedFromGastronomy = () => {
    if (currentQuestionStep < 5) {
      setCurrentQuestionStep(5)
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
        time: "Just now • AURA Voyage Concierge",
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
    onSynthesize({
      destination: destData.name,
      party: selectedParty,
      sanctuary: selectedSanctuary,
      landmarks: selectedLandmarks,
      gastronomy: selectedGastronomy,
    })
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen relative flex flex-col antialiased selection:bg-primary selection:text-on-primary w-full">
      {/* Top Fixed Header */}
      <header className="fixed top-0 w-full z-50 pt-safe px-margin">
        <div className="h-20 flex items-center justify-between rounded-full bg-surface-container/70 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.55)] px-space-md my-space-xs border border-primary/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Return to Concierge Home"
              onClick={onBack}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-surface-container-high/60 text-primary hover:text-on-surface transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(212,175,55,0.15)]"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute opacity-75" />
                <div className="w-2 h-2 rounded-full bg-primary relative" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm font-semibold tracking-widest text-on-surface">
                    AURA
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-caps uppercase tracking-wider border border-primary/20">
                    Private AI
                  </span>
                </div>
                <span className="font-label-caps text-[10px] tracking-[0.16em] text-secondary uppercase">
                  Voyage Intelligence • Active
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              aria-label="Active Concierge Profile"
              className="relative p-0.5 rounded-full bg-gradient-to-tr from-primary-container via-primary to-surface-bright flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <img
                alt="Concierge Purser"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdeHFtdiwk9SvJTy932LOHStMk4XM2H_atYrbieEdKtq45CY9DWzoVm1GkkkKLGgDmtG19y8VfNQQfDPZcU_k9VpvhSnt_RG8jmzH1RbGQ7n3B3ihvht77tbHwGA9qrTe8LS6ATK3QPzMT6kerBnce9zTZ3WntMHLE984v8ywFrbc_pBdX2Z8GEsD1lubU4hxuaCLs7gKPa9LGdP8SGVPpfSEceSqDJeTwBCAJjou1OthuIronGT6d"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex flex-col relative w-full pt-24 pb-12 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/* Subtle Ambient Topographic Lighting */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Concierge Session Context Pill */}
            <div className="px-margin pt-space-xs pb-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-full shadow-sm border border-border/40">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping absolute opacity-60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary relative" />
                  </div>
                  <span className="font-label-caps text-[10px] uppercase tracking-[0.14em] text-secondary truncate">
                    AURA Bespoke Atelier • Private Line
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
            <div className="flex flex-col gap-space-lg px-margin pt-space-sm pb-40" id="chat-stream" ref={chatStreamRef}>
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
                    AURA Voyage Concierge
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
                    {destData.name} Dossier
                  </span>
                </div>

                {/* AI Opening Message */}
                <div className="bg-surface-container text-on-surface rounded-2xl rounded-tl-sm p-space-md shadow-lg flex flex-col gap-space-sm border border-primary/20">
                  <p className="font-title-editorial text-[17px] text-primary-fixed leading-snug font-medium">
                    Welcome to the {destData.name} Arc Calibration. Let us calibrate the four essential pillars of your voyage so I can synthesize an exquisite, private itinerary.
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Please select your preferred configuration across travel party, sanctuary atmosphere, sacred landmarks, and heirloom gastronomy:
                  </p>
                </div>

                {/* MCQ Flow Container (Progressive One-by-One Questions) */}
                <div className="flex flex-col gap-space-md" id="mcq-calibration-flow">
                  {/* QUESTION 1: Travel Party / Type */}
                  <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                          1
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

                    {currentQuestionStep === 1 && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setCurrentQuestionStep(2)}
                          className="px-4 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <span>Confirm &amp; Next</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* QUESTION 2: Sanctuary & Hotel Atmosphere (Appears when Step >= 2) */}
                  {currentQuestionStep >= 2 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            2
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

                      {currentQuestionStep === 2 && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => setCurrentQuestionStep(3)}
                            className="px-4 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 text-xs font-semibold flex items-center gap-1 transition-all"
                          >
                            <span>Confirm &amp; Next</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* QUESTION 3: Sacred Landmarks & Anchors (Appears when Step >= 3) */}
                  {currentQuestionStep >= 3 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            3
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

                  {/* QUESTION 4: Gastronomy & Dining (Appears when Step >= 4) */}
                  {currentQuestionStep >= 4 && (
                    <div className="bg-surface-container-low rounded-xl p-space-md border border-primary/20 shadow-md flex flex-col gap-space-sm transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center text-[12px] font-semibold">
                            4
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

                  {/* Primary Synthesize CTA Action Block (Appears when Step >= 5) */}
                  {currentQuestionStep >= 5 && (
                    <div className="bg-surface-container rounded-xl p-space-md shadow-lg flex flex-col items-center gap-space-sm border border-primary/30 mt-space-xs transition-all duration-500 animate-fadeIn">
                      <div className="flex items-center gap-2 text-center">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          auto_awesome
                        </span>
                        <span className="font-headline-sm text-[15px] text-on-surface font-semibold">
                          Calibration Complete
                        </span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant text-center leading-relaxed">
                        4 bespoke anchors locked for {destData.name}. AURA will generate your 5-day personalized cadence with private logistics.
                      </p>
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
                        AURA Voyage Concierge
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
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-2xl px-margin pt-space-xs pb-6 flex flex-col gap-space-sm shadow-[0_-12px_32px_rgba(0,0,0,0.6)] border-t border-border/30">
        {/* Quick Reply Action Chips (Scrollable row) */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar -mx-margin px-margin">
          {destData.quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleQuickChipClick(chip)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md font-label-md tracking-wider transition-all duration-150 active:scale-95 shadow-sm border border-border/30"
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
        <div className="flex items-center gap-space-xs bg-surface-container rounded-full px-2 py-1.5 shadow-md border border-border/40">
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
            End-to-End Encrypted Purser Atelier
          </span>
        </div>
      </footer>
    </div>
  )
}
