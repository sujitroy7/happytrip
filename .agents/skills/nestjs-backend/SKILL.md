---
name: nestjs-backend
description: >-
  Use this skill when working on backend code in the NestJS application.
  Activate when creating or modifying controllers, services, modules, DTOs,
  guards, interceptors, middleware, pipes, or any file under backend/src/.
---

# NestJS Backend Engineering — HappyTrip

## Think Like a Backend Engineer

When working on backend code, think in terms of:
1. **Request lifecycle:** How does a request flow through the NestJS pipeline?
2. **Data integrity:** Is input validated? Are edge cases handled?
3. **Security:** Is the endpoint properly protected? Is data sanitized?
4. **Performance:** Are database queries efficient? Are there N+1 issues?
5. **Testability:** Can this service be unit tested with mocked dependencies?

## NestJS Module Pattern

Every feature follows this structure:

```
backend/src/<feature>/
├── <feature>.module.ts         # Module declaration
├── <feature>.controller.ts     # HTTP layer (thin — delegates to service)
├── <feature>.service.ts        # Business logic
├── <feature>.schema.ts         # Mongoose schema & TypeScript interface
├── dto/
│   ├── create-<feature>.dto.ts # Input validation for creation
│   └── update-<feature>.dto.ts # Input validation for updates
└── <feature>.controller.spec.ts # Unit tests
```

## Key Principles

### Controllers
- **Thin controllers.** Only handle HTTP concerns: parse request, call service, return response.
- Use decorators: `@Get()`, `@Post()`, `@Patch()`, `@Delete()`, `@Param()`, `@Query()`, `@Body()`.
- Always apply validation pipe for DTOs.
- Return appropriate HTTP status codes via `@HttpCode()` or exceptions.

### Services
- **All business logic lives here.** Controllers should never contain business logic.
- Inject dependencies via constructor injection.
- Throw NestJS HTTP exceptions (`NotFoundException`, `BadRequestException`, etc.) for error cases.
- Keep methods focused — one responsibility per method.

### DTOs (Data Transfer Objects)
- DTOs define the **shape of external input** — NOT the database shape.
- Use `class-validator` decorators for validation.
- DTOs are NOT entities. They may omit fields, combine fields, or transform fields.
- Create separate DTOs for create vs update operations.

### Schemas (Mongoose)
- Define schemas using `@nestjs/mongoose` decorators (`@Schema`, `@Prop`).
- Export both the schema class and the generated Mongoose schema.
- Define a TypeScript interface or use the schema class for typing.
- Add indexes where queries will filter/sort frequently.

### Guards & Interceptors
- **Guards** decide if a request should proceed (auth, roles). Apply with `@UseGuards()`.
- **Interceptors** transform responses or add cross-cutting behavior (logging, caching).
- Prefer decorator composition over middleware for route-specific behavior.

### Error Handling
- Use NestJS built-in exceptions: `NotFoundException`, `BadRequestException`,
  `UnauthorizedException`, `ForbiddenException`, `ConflictException`.
- For custom errors, extend `HttpException`.
- Never return raw error objects to the client.

## API Response Consistency

All API responses should follow a consistent structure:

```typescript
// Success (single item)
{ data: { ... } }

// Success (list)
{ data: [...], meta: { total, page, limit } }

// Error (handled by NestJS exception filter)
{ statusCode: 404, message: "Trip not found", error: "Not Found" }
```

## Testing

- Unit test services by mocking their dependencies.
- Use `@nestjs/testing` `Test.createTestingModule()` for test setup.
- Test the behavior, not the implementation.
- Cover: happy path, edge cases, error cases, validation failures.

## ESM Import Rule

Always use `.js` extension in relative imports:
```typescript
// ✅ Correct
import { TripService } from './trip.service.js';

// ❌ Wrong
import { TripService } from './trip.service';
```
