import { useTheme } from "../../lib/theme-context"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle({
  className = "",
  size = "md",
}: {
  className?: string
  size?: "sm" | "md"
}) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  const buttonSizeClasses =
    size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={`Switch to ${isDark ? "Light (Warm Alabaster)" : "Dark (Élysée Noir)"} Mode`}
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 bg-card/80 hover:bg-card text-foreground border border-border/60 shadow-sm ${buttonSizeClasses} ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-primary transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-primary transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  )
}
