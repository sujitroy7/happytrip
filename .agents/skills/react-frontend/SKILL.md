---
name: react-frontend
description: >-
  Use this skill when working on frontend code in the React application.
  Activate when creating or modifying React components, hooks, pages, layouts,
  styles, API integration, or any file under frontend/src/.
---

# React Frontend Engineering — HappyTrip

## Think Like a Frontend Engineer

When working on frontend code, think in terms of:
1. **User experience:** Does this feel responsive, polished, and intuitive?
2. **Component responsibility:** Is this component doing too much?
3. **State management:** Is state local, shared, or server-derived?
4. **Loading/error/empty states:** Are all UI states handled gracefully?
5. **Accessibility:** Can keyboard and screen reader users navigate this?
6. **Performance:** Are there unnecessary re-renders? Heavy computations in render?

## Design System — Élysée Noir

This app uses a **dark luxury theme**. All components must respect these tokens:

### Colors (CSS Custom Properties)
```css
--color-primary-gold: #D4AF37;
--color-champagne: #E5C365;
--color-emerald-deep: #0F2E23;
--color-obsidian: #071510;
--color-surface-dark: #0A1F18;
--color-text-light: #E8E8E8;
--color-text-muted: #8A9A92;
```

### Typography
- **Headlines:** `'Playfair Display', serif` — elegant, some italic accents
- **Body / UI:** `'Plus Jakarta Sans', sans-serif` — clean geometric
- **Labels / Badges:** `'Plus Jakarta Sans'` — uppercase, letter-spaced

### Component Styles
- **Primary Button:** Pill shape, solid `#D4AF37` bg, dark text, font-weight bold
- **Secondary Button:** Dark translucent pill, gold or light border
- **Cards:** Deep emerald bg (`#0F2E23`), rounded corners (12-16px), subtle border
- **Chips/Tags:** Rounded pills with icons, gold when active with checkmark
- **Input Fields:** Dark pill inputs with subtle border, icon placement

## Folder Structure

```
frontend/src/
├── components/          # Shared reusable components
│   ├── ui/              # Design system primitives (Button, Card, Input, Chip)
│   └── layout/          # Layout components (BottomNav, Header)
├── pages/               # Route-level page components
│   ├── Welcome/
│   ├── TripDiscovery/
│   ├── Home/
│   └── Itinerary/
├── hooks/               # Custom React hooks
├── services/            # API communication layer
├── types/               # Shared TypeScript types/interfaces
├── data/                # Mock data for development
├── assets/              # Static assets (images, icons)
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles & design tokens
```

## Component Principles

### Separation of Concerns
```
UI (presentation) → State (hooks) → API (services) → Types
```

- **UI Components** render JSX. They receive props and emit events.
- **Hooks** manage state, side effects, and business logic.
- **Services** handle HTTP requests to the backend API.
- **Types** define shared interfaces used across layers.

### Component Sizing
- If a component exceeds ~150 lines, consider splitting.
- Extract repeated patterns into reusable components.
- Each component should have ONE clear responsibility.

### Props
- Always define prop types with TypeScript `interface`.
- Use descriptive prop names. Avoid boolean props without context.
- Destructure props in function signature.

### State Management
- **Local state:** `useState` for component-specific UI state (open/closed, selected tab).
- **Server state:** Fetch from API, store in component or lift up as needed.
- **Derived state:** Compute from existing state, don't duplicate.

## React Patterns

### Functional Components Only
```tsx
// ✅ Always use function components
function TripCard({ trip }: TripCardProps) { ... }

// ❌ Never use class components
class TripCard extends React.Component { ... }
```

### Custom Hooks for Logic
```tsx
// Extract complex logic into hooks
function useTripForm() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<TripPreferences>(defaults);
  // ... logic
  return { step, preferences, nextStep, prevStep, updatePreference };
}
```

### API Layer
```tsx
// services/trip.api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchTrips(): Promise<Trip[]> { ... }
export async function createTrip(data: CreateTripDto): Promise<Trip> { ... }
```

## Mobile-First Responsive Design

This app is **mobile-first**. Build for mobile viewport (~375px) first, then scale up.

```css
/* Mobile first (default) */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) { .container { padding: 2rem; } }

/* Desktop */
@media (min-width: 1024px) { .container { max-width: 480px; margin: 0 auto; } }
```

For desktop, the app should be centered in a phone-like container (max ~480px width)
unless the screen is designed for full-width layouts.

## Tailwind CSS v4

This project uses Tailwind CSS v4 with the Vite plugin. Use utility classes directly.
For the Élysée Noir design system, define custom theme tokens in `index.css` using
`@theme` or CSS custom properties.

## Accessibility Checklist

- All interactive elements must be focusable and keyboard-navigable
- Images need `alt` text
- Form inputs need associated labels
- Color contrast must meet WCAG AA (4.5:1 for text)
- Use semantic HTML elements (`nav`, `main`, `section`, `article`, `button`)
