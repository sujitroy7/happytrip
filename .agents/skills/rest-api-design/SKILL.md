---
name: rest-api-design
description: >-
  Use this skill when designing, creating, or modifying REST API endpoints.
  Activate when defining new routes, request/response shapes, error handling,
  pagination, or API authentication flows.
---

# REST API Design — HappyTrip

## Think Like an API Designer

When creating or modifying an API endpoint, think in terms of:
1. **Consumer clarity:** Can a frontend developer understand this endpoint without reading the code?
2. **Consistency:** Does this follow the same patterns as other endpoints?
3. **Error transparency:** Are errors meaningful and actionable?
4. **Security:** Is auth required? Is input validated? Are secrets exposed?
5. **Idempotency:** Can this be safely retried?

## Endpoint Design Checklist

Before creating any endpoint, document:

```
Endpoint:    POST /api/trips
Method:      POST
Auth:        Required (JWT Bearer)
Request:     { title, destination, startDate, endDate, preferences }
Response:    201 { data: Trip }
Errors:      400 (validation), 401 (unauthenticated)
```

## URL Conventions

```
GET    /api/trips              → List trips (with pagination)
GET    /api/trips/:id          → Get single trip
POST   /api/trips              → Create trip
PATCH  /api/trips/:id          → Partial update trip
DELETE /api/trips/:id          → Delete trip
GET    /api/trips/:id/itinerary → Get nested resource
```

### Rules
- Use **plural nouns** for resources: `/trips`, `/users` (not `/trip`, `/user`)
- Use **kebab-case** for multi-word resources: `/trip-preferences`
- Nest routes for clear relationships: `/trips/:id/activities`
- Never use verbs in URLs: ❌ `/api/getTrips` ✅ `/api/trips`
- Global prefix `/api` is set in `main.ts` — don't repeat it in controllers

## HTTP Methods

| Method | Purpose | Idempotent | Request Body |
|--------|---------|------------|-------------|
| GET | Read resource(s) | Yes | No |
| POST | Create resource | No | Yes |
| PATCH | Partial update | Yes | Yes (partial) |
| PUT | Full replace | Yes | Yes (full) |
| DELETE | Remove resource | Yes | No |

Prefer `PATCH` over `PUT` for updates — clients send only changed fields.

## HTTP Status Codes

| Code | When |
|------|------|
| 200 | Successful GET, PATCH, PUT |
| 201 | Successful POST (resource created) |
| 204 | Successful DELETE (no content) |
| 400 | Malformed request / validation error |
| 401 | Missing or invalid authentication |
| 403 | Authenticated but not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate resource) |
| 422 | Business rule violation |
| 500 | Unexpected server error |

## Response Envelope

### Success — Single Resource
```json
{
  "data": {
    "id": "...",
    "title": "Bali Escape",
    "status": "draft"
  }
}
```

### Success — Collection with Pagination
```json
{
  "data": [...],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

### Error
```json
{
  "statusCode": 404,
  "message": "Trip not found",
  "error": "Not Found"
}
```

## Pagination

Default pagination parameters:
- `?page=1&limit=10` — offset-based pagination
- Maximum `limit`: 100
- Default `limit`: 10

```typescript
@Get()
async findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
) { ... }
```

## Input Validation

- **Always validate** request body, query params, and URL params.
- Use DTOs with `class-validator` for body validation.
- Use `ParseIntPipe`, `ParseUUIDPipe`, etc. for param validation.
- Apply `ValidationPipe` globally or per-route.

## Authentication Pattern

```
Public routes:    No guard           → GET /api/health
Protected routes: @UseGuards(JwtAuthGuard) → GET /api/trips
Auth routes:      No guard           → POST /api/auth/login, /api/auth/register
```

## Rate Limiting

Apply rate limiting on:
- Authentication endpoints (login, register) — stricter limits
- Public endpoints — moderate limits
- Authenticated endpoints — relaxed limits
