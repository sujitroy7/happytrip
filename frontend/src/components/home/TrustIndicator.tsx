import { ShieldCheck } from "lucide-react"

export function TrustIndicator() {
  return (
    <footer
      className="relative z-10 w-full pb-3 sm:pb-4 text-center flex items-center justify-center space-x-2"
      aria-label="Concierge availability status"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <p className="text-[11px] sm:text-xs text-muted-foreground tracking-wide flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5 text-secondary inline" />
        <span>Private Aviation &amp; Superyacht Concierge Online</span>
      </p>
    </footer>
  )
}
