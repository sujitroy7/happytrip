import { useState } from "react"
import { ConciergeHeader } from "./components/layout/ConciergeHeader"
import { BottomNav, type NavTab } from "./components/layout/BottomNav"
import { CuratedVoyageHome } from "./components/home/CuratedVoyageHome"
import { CuratedItineraryView } from "./components/trips/CuratedItineraryView"
import { ConciergeCalibrator } from "./components/concierge/ConciergeCalibrator"
import { AuraConciergeCalibration } from "./components/concierge/AuraConciergeCalibration"
import { FloatingInputPill } from "./components/concierge/FloatingInputPill"
import { AtmosphericHero } from "./components/home/AtmosphericHero"
import { LoginPage } from "./components/auth/LoginPage"
import { LuxuryRouteMap } from "./components/map/LuxuryRouteMap"
import { ExploreDestinations } from "./components/explore/ExploreDestinations"
import { LogOut, KeyRound } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("home")
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [isCalibratingAura, setIsCalibratingAura] = useState(false)
  const [destination, setDestination] = useState("Bali")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleTripSelect = () => {
    setActiveTab("trips")
    setIsCalibrating(false)
    setIsCalibratingAura(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab)
    if (tab === "trips") {
      setIsCalibrating(false)
    }
    if (tab === "profile" && !isAuthenticated) {
      setShowAuthModal(true)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setShowAuthModal(false)
    setActiveTab("profile")
  }

  // If AURA Concierge Calibration flow is active, render the dedicated luxury chat interface
  if (isCalibratingAura) {
    return (
      <AuraConciergeCalibration
        destination={destination}
        onBack={() => {
          setIsCalibratingAura(false)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onSynthesize={(calibratedData) => {
          setDestination(calibratedData.destination)
          setIsCalibratingAura(false)
          setActiveTab("trips")
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    )
  }

  // If Auth Modal is active, render the dedicated Login Page
  if (showAuthModal) {
    return (
      <div className="relative min-h-[100dvh] w-full bg-background text-foreground flex flex-col items-center selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
        <AtmosphericHero />
        <LoginPage
          onSuccess={handleLoginSuccess}
          onBack={() => setShowAuthModal(false)}
        />
      </div>
    )
  }

  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground flex flex-col items-center selection:bg-primary selection:text-primary-foreground">
      {/* Ambient Atmospheric Background */}
      <AtmosphericHero />

      {/* Top Header with HappyTrip Logo and Gilded Profile Ring */}
      <ConciergeHeader
        brandName="HAPPYTRIP"
        subTitle="VOYAGE CONCIERGE"
        onProfileClick={() => {
          if (!isAuthenticated) {
            setShowAuthModal(true)
          } else {
            handleTabChange("profile")
          }
        }}
      />

      {/* Dynamic Views (Scrollable with Hidden Scrollbars) */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center">
        {/* 1. HOME TAB */}
        {activeTab === "home" && (
          <CuratedVoyageHome
            onTripSelect={(tripId) => {
              setDestination(tripId === "kyoto" ? "Kyoto" : tripId === "amalfi" ? "Amalfi Coast" : "Bali")
              handleTripSelect()
            }}
            onStartCalibration={(dest) => {
              setDestination(dest)
              setIsCalibratingAura(true)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        )}

        {/* 2. TRIPS TAB */}
        {activeTab === "trips" && (
          <>
            {isCalibrating ? (
              <>
                <ConciergeCalibrator />
                <FloatingInputPill
                  placeholder="Tell me anything else... dietary, sunset vibe"
                  onSubmit={() => setIsCalibrating(false)}
                />
              </>
            ) : (
              <CuratedItineraryView
                destination={destination}
                onCustomizeClick={() => setIsCalibratingAura(true)}
              />
            )}
          </>
        )}

        {/* 3. EXPLORE TAB */}
        {activeTab === "explore" && (
          <ExploreDestinations
            onDraftClick={() => handleTabChange("trips")}
            onMapClick={() => handleTabChange("map")}
          />
        )}

        {/* 4. MAP TAB */}
        {activeTab === "map" && <LuxuryRouteMap />}

        {/* 5. PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="w-full max-w-md mx-auto px-4 pt-28 pb-32 flex flex-col items-center text-center">
            <div className="p-6 rounded-2xl bg-card/85 border border-border/60 shadow-xl backdrop-blur-md w-full flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-primary via-accent to-primary/60 shadow-lg">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdeHFtdiwk9SvJTy932LOHStMk4XM2H_atYrbieEdKtq45CY9DWzoVm1GkkkKLGgDmtG19y8VfNQQfDPZcU_k9VpvhSnt_RG8jmzH1RbGQ7n3B3ihvht77tbHwGA9qrTe8LS6ATK3QPzMT6kerBnce9zTZ3WntMHLE984v8ywFrbc_pBdX2Z8GEsD1lubU4hxuaCLs7gKPa9LGdP8SGVPpfSEceSqDJeTwBCAJjou1OthuIronGT6d"
                  alt="Member Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-primary">
                  Private Client Vault
                </span>
                <h2 className="font-display text-2xl text-foreground mt-1">
                  Lady Genevieve Vance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Tier 1 Sovereign Member • VIP Concierge Active
                </p>
              </div>

              <div className="w-full p-3 rounded-xl bg-background/60 border border-border/40 text-left text-xs flex flex-col gap-2">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Vault ID:</span>
                  <span className="text-foreground font-mono">HT-8829-VIP</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Clearance:</span>
                  <span className="text-secondary font-semibold">Fast-Track Aviation</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Assigned Purser:</span>
                  <span className="text-primary font-medium">Julian de Saint-Germain</span>
                </div>
              </div>

              <div className="flex gap-2 w-full pt-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="flex-1 py-2.5 px-3 rounded-full bg-card hover:bg-card/80 border border-border/60 text-foreground text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5 text-primary" />
                  <span>Switch Account</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticated(false)
                    setShowAuthModal(true)
                  }}
                  className="py-2.5 px-4 rounded-full bg-destructive/15 hover:bg-destructive/25 text-destructive text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
