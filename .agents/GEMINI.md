# HappyTrip — Project Rules

## Project Identity

HappyTrip is an AI-powered luxury travel planning application that turns natural-language requests into rich, structured, personalized travel itineraries.

## Architecture

- **Monorepo:** Two independent apps under one repository root
  - `frontend/` — React + Vite + TypeScript + Tailwind CSS v4
  - `backend/` — NestJS + TypeScript + Mongoose + MongoDB
- **API:** REST with `/api` global prefix
- **Auth:** JWT (planned)
- **Database:** MongoDB via Mongoose ODM

## Stack Versions & Key Dependencies

### Backend (`backend/`)
- NestJS 12, TypeScript 6, Mongoose 9, Vitest 4
- Config validation: Joi
- Linting: oxlint
- Testing: Vitest + Supertest
- Module pattern: `Module → Controller → Service → Repository/Schema`

### Frontend (`frontend/`)
- React 19, Vite 8, TypeScript 6, Tailwind CSS v4
- Linting: oxlint
- Fonts: Playfair Display (serif headlines), Plus Jakarta Sans (sans-serif body)
- Design theme: "Élysée Noir" — dark luxury mode

## Environment

- Backend runs on `http://localhost:3000` (API prefix: `/api`)
- Frontend runs on `http://localhost:5173`
- MongoDB: `mongodb://localhost:27017/happytrip`
- Environment variables: `.env` files in each app directory (never committed)

## Coding Conventions

### General
- Use TypeScript strict mode. Avoid `any`.
- Use ESM (`"type": "module"` in both apps). Use `.js` extensions in NestJS imports.
- Prefer `interface` for object shapes, `type` for unions/intersections.
- Use meaningful, descriptive names. No abbreviations unless universally understood.
- Keep functions small and focused. One responsibility per function.

### File Naming
- Backend: `kebab-case` for files (e.g., `trip.service.ts`, `create-trip.dto.ts`)
- Frontend: `PascalCase` for components (e.g., `TripCard.tsx`), `camelCase` for utilities
- Tests: `*.spec.ts` (unit), `*.e2e-spec.ts` (integration)

### Imports
- Backend: Always use `.js` extension in relative imports (ESM requirement)
- Group imports: external libs → internal modules → relative files

### Error Handling
- Never silently swallow errors
- Backend: Use NestJS exception filters and built-in HTTP exceptions
- Frontend: Always handle loading, error, and empty states in components

### Security
- Never hardcode secrets, API keys, or credentials
- All external input must be validated (DTOs with class-validator or Joi)
- Use environment variables via ConfigService (backend) or `import.meta.env` (frontend)

## Design System — Semantic Luxury Architecture

The frontend uses a centralized, semantic design system inspired by **shadcn/ui**:
`Design Tokens → UI Primitives → Reusable Components → Feature Components → Pages`

### Semantic Tokens
| Token | Role in Dark ("Élysée Noir") | Role in Light (Warm Alabaster) |
|-------|------------------------------|--------------------------------|
| `--primary` | `#D4AF37` (Primary Gold) | `#A8841B` (Regal Gold) |
| `--primary-foreground` | `#071510` (Obsidian) | `#FFFFFF` (Pure White) |
| `--secondary` | `#0F2E23` (Deep Emerald) | `#E8ECE9` (Mist Emerald) |
| `--background` | `#071510` (Deep Obsidian) | `#F9F8F5` (Warm Alabaster) |
| `--foreground` | `#E8E8E8` (Light Text) | `#112019` (Dark Forest) |
| `--card` | `#0A1F18` (Dark Surface) | `#FFFFFF` (Pure White Card) |
| `--muted` | `#0D2B20` (Surface) | `#EFECE6` (Warm Muted) |
| `--muted-foreground`| `#8A9A92` (Sage Caption) | `#5C6B64` (Deep Muted) |
| `--border` | `rgba(212, 175, 55, 0.15)` | `rgba(168, 132, 27, 0.2)` |
| `--ring` | `#D4AF37` | `#A8841B` |

### Rules
- Never hardcode raw colors (e.g. `bg-[#071510]`). Always consume semantic classes (e.g. `bg-background`, `text-foreground`, `text-primary`, `bg-card`).
- Build reusable UI primitives in `components/ui/` (`Button`, `Card`, `Badge`, `Input`) before building feature components.
- Always explain changes first using `WHAT / WHY / HOW / FILES` before writing non-trivial code.

## Git Conventions

Use conventional commits:
- `feat(scope):` — new feature
- `fix(scope):` — bug fix
- `refactor(scope):` — code restructuring
- `test(scope):` — adding/updating tests
- `docs(scope):` — documentation
- `chore(scope):` — tooling, config, deps

Scopes: `auth`, `trip`, `user`, `ui`, `api`, `db`, `config`
