---
name: feature-workflow
description: >-
  Use this skill when implementing a full-stack feature end-to-end.
  Activate when the task spans both backend and frontend, such as adding
  a new page with API integration, or building a complete CRUD flow.
---

# Full-Stack Feature Workflow — HappyTrip

## End-to-End Feature Implementation Order

When building a feature that spans backend and frontend, follow this order:

### Phase 1 — Database (if needed)
1. Design the schema (entities, relationships, indexes)
2. Create the Mongoose schema file
3. Register schema in the feature module

### Phase 2 — Backend API
1. Create the feature module, controller, and service
2. Define DTOs for request validation
3. Implement service methods (business logic)
4. Wire controller routes to service methods
5. Register module in `app.module.ts`
6. Test with API client or Supertest

### Phase 3 — Frontend Types
1. Define shared TypeScript interfaces in `frontend/src/types/`
2. These should match the API response shapes

### Phase 4 — Frontend API Layer
1. Create API service functions in `frontend/src/services/`
2. Use `fetch` with the base URL from env
3. Handle errors consistently

### Phase 5 — Frontend UI
1. Create page component in `frontend/src/pages/`
2. Create reusable sub-components in `frontend/src/components/`
3. Wire up hooks for state management
4. Handle loading, error, and empty states
5. Apply Élysée Noir design system

### Phase 6 — Integration
1. Add route to React Router
2. Test full flow: UI → API → DB → Response → UI update
3. Handle edge cases

### Phase 7 — Polish
1. Add animations and transitions
2. Review mobile responsiveness
3. Add keyboard navigation and accessibility
4. Review error states

## Verification Checklist

After implementing a feature, verify:

- [ ] Backend compiles: `cd backend && npm run build`
- [ ] Backend tests pass: `cd backend && npm test`
- [ ] Frontend compiles: `cd frontend && npm run build`
- [ ] API responds correctly (test with curl or browser)
- [ ] All UI states handled (loading, error, empty, success)
- [ ] Mobile layout looks correct
- [ ] No TypeScript `any` types
- [ ] No hardcoded secrets or URLs
- [ ] Input validation on both backend and frontend
