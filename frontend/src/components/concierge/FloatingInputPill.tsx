import * as React from "react"
import { useState } from "react"
import { Mic } from "lucide-react"
import { cn } from "../../lib/utils"

export interface FloatingInputPillProps {
  placeholder?: string
  onSubmit?: (val: string) => void
  onVoiceClick?: () => void
  className?: string
}

export function FloatingInputPill({
  placeholder = "Tell me anything else... dietary, sunset vibe",
  onSubmit,
  onVoiceClick,
  className,
}: FloatingInputPillProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSubmit?.(value.trim())
      setValue("")
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-22 sm:bottom-24 left-0 w-full px-3 sm:px-4 z-40 flex justify-center pointer-events-none",
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className="pointer-events-auto w-full max-w-md bg-card/90 backdrop-blur-2xl border border-border/60 rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.75)] p-1.5 flex items-center gap-2"
      >
        {/* Voice Dictation Button */}
        <button
          type="button"
          onClick={onVoiceClick}
          aria-label="Dictate preferences with voice"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-background/60 hover:bg-background/90 text-muted-foreground hover:text-primary transition-all duration-200 flex items-center justify-center active:scale-95"
        >
          <Mic className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Text Intake Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/70 font-sans text-sm focus:outline-none px-2 min-w-0"
        />

        {/* Golden Spark / Synthesize Action Button */}
        <button
          type="submit"
          aria-label="Synthesize and update itinerary"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary via-accent to-primary flex items-center justify-center text-primary-foreground font-bold shadow-[0_0_18px_rgba(242,202,80,0.45)] hover:shadow-[0_0_22px_rgba(242,202,80,0.65)] active:scale-95 transition-all duration-150"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-primary-foreground"
          >
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          </svg>
        </button>
      </form>
    </div>
  )
}
