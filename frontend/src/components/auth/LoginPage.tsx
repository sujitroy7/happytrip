import { useState } from "react"
import { HappyTripLogo } from "../home/HappyTripLogo"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LuxuryBadge } from "../ui/luxury-badge"
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  Fingerprint,
  ShieldCheck,
  ArrowRight,
  Loader2,
  ArrowLeft,
} from "lucide-react"

export interface LoginPageProps {
  onSuccess?: () => void
  onBack?: () => void
}

export function LoginPage({ onSuccess, onBack }: LoginPageProps) {
  const [email, setEmail] = useState("vip.client@happytrip.luxury")
  const [password, setPassword] = useState("••••••••••••")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    if (!email || !password) {
      setAuthError("Please provide your membership identifier and passkey.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onSuccess?.()
    }, 1200)
  }

  const handleBiometricAuth = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onSuccess?.()
    }, 1000)
  }

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center px-4 py-6 z-20 max-w-md mx-auto">
      {/* Top Bar: Return Navigation */}
      <div className="w-full flex items-center justify-between pt-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Return to Concierge Home"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-border/40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Concierge Home</span>
          </button>
        ) : (
          <div />
        )}

        <LuxuryBadge
          variant="glass"
          size="sm"
          icon={<Lock className="w-3 h-3 text-primary" />}
          className="text-[10px] tracking-wider"
        >
          256-Bit Vault
        </LuxuryBadge>
      </div>

      {/* Main Authentication Glass Container */}
      <div className="w-full my-auto py-6">
        <div className="relative rounded-2xl bg-card/85 backdrop-blur-2xl border border-border/60 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-7 flex flex-col gap-5 text-center overflow-hidden">
          {/* Subtle Gilded Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/15 blur-2xl rounded-full pointer-events-none"
          />

          {/* Logo & Brand Identity */}
          <div className="flex flex-col items-center gap-2">
            <HappyTripLogo size={56} />
            <h1 className="font-display text-2xl sm:text-3xl text-foreground font-normal tracking-wide mt-1">
              Sign In to Voyage Vault
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Access your bespoke itineraries, private aviation clearances, and dedicated purser line.
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs text-left">
              {authError}
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-left">
            {/* Membership / Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="client-email"
                className="font-sans text-[11px] font-semibold text-foreground uppercase tracking-wider"
              >
                Client Email or Membership ID
              </label>
              <Input
                id="client-email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@luxury.happytrip"
                required
                icon={<Mail className="w-4 h-4" />}
                className="bg-background/60"
              />
            </div>

            {/* Passkey / Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="client-passkey"
                  className="font-sans text-[11px] font-semibold text-foreground uppercase tracking-wider"
                >
                  Vault Passkey
                </label>
                <button
                  type="button"
                  onClick={() => alert("Concierge passkey assistance initiated.")}
                  className="text-[10px] text-primary hover:underline font-medium"
                >
                  Forgot passkey?
                </button>
              </div>

              <div className="relative flex items-center">
                <Input
                  id="client-passkey"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  icon={<KeyRound className="w-4 h-4" />}
                  className="bg-background/60 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Device Checkbox */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40 bg-background/80 accent-primary cursor-pointer"
                />
                <span className="text-xs text-muted-foreground">
                  Trust this secure device
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <Button
              variant="luxury"
              size="pill"
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 font-semibold text-sm h-12"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate &amp; Enter</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full border-t border-border/40" />
            <span className="absolute bg-card px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              VIP Quick Access
            </span>
          </div>

          {/* Biometric Passkey Alternative */}
          <Button
            variant="glass"
            size="pill"
            type="button"
            onClick={handleBiometricAuth}
            disabled={isLoading}
            className="w-full h-11 text-xs sm:text-sm font-medium border-border/60 hover:border-primary/40"
          >
            <Fingerprint className="w-4 h-4 text-primary mr-1.5" />
            <span>Sign In with Face ID / Passkey</span>
          </Button>
        </div>
      </div>

      {/* Security & Concierge Guarantee Footer */}
      <footer className="w-full text-center pb-2 flex flex-col items-center gap-1.5 text-muted-foreground">
        <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Private Purser Clearance • End-to-End Encrypted</span>
        </div>
        <p className="text-[11px] text-muted-foreground/80">
          Need assistance with your private membership? Dedicated concierge desk online 24/7.
        </p>
      </footer>
    </div>
  )
}
