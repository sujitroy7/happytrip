---
name: mongodb-schema
description: >-
  Use this skill when designing, creating, or modifying MongoDB schemas,
  database models, indexes, or data relationships. Activate when working
  with Mongoose schemas, database migrations, or data modeling decisions.
---

# MongoDB & Mongoose Schema Design — HappyTrip

## Think Like a Database Engineer

When designing or modifying schemas, think in terms of:
1. **Query patterns:** What queries will run against this collection? Design for reads.
2. **Data relationships:** Embed vs reference? How often is related data accessed together?
3. **Data integrity:** Which fields are required? What are valid ranges/formats?
4. **Performance:** Will this field be queried/sorted frequently? Does it need an index?
5. **Growth:** How will this collection scale? What's the document size trajectory?

## MongoDB Design Principles for HappyTrip

### Embedding vs Referencing

| Embed when... | Reference when... |
|---------------|-------------------|
| Data is always accessed together | Data is accessed independently |
| Relationship is 1:1 or 1:few | Relationship is 1:many or many:many |
| Child data is small and bounded | Child data is large or unbounded |
| Child data doesn't change often | Child data is updated frequently and independently |

**HappyTrip examples:**
- ✅ **Embed:** Itinerary activities within a Trip (always loaded together, bounded per day)
- ✅ **Embed:** User preferences within User (1:1, always read with user)
- ❌ **Reference:** User in Trip (many trips per user, users accessed independently)

### Schema Pattern with NestJS + Mongoose

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TripDocument = HydratedDocument<Trip>;

@Schema({
  timestamps: true,         // Adds createdAt, updatedAt automatically
  collection: 'trips',      // Explicit collection name
})
export class Trip {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ type: String, enum: ['draft', 'confirmed', 'completed'], default: 'draft' })
  status: string;

  @Prop({ type: [ActivitySchema] })  // Embedded subdocument array
  activities: Activity[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);

// Add indexes AFTER schema creation
TripSchema.index({ userId: 1, status: 1 });
TripSchema.index({ createdAt: -1 });
```

## Index Strategy

### When to Add an Index
- Fields used in `find()` queries as filter conditions
- Fields used in `sort()` operations
- Fields used in `$lookup` joins (reference fields)
- Unique constraints (e.g., email)

### When NOT to Index
- Fields rarely queried
- Fields with very low cardinality (e.g., boolean flags on small collections)
- Write-heavy fields where index maintenance outweighs read benefit

### Index Types for HappyTrip
```
users:
  - { email: 1 }          unique — login lookups
  - { createdAt: -1 }     sorting by join date

trips:
  - { userId: 1, status: 1 }  compound — "my trips" filtered by status
  - { userId: 1, createdAt: -1 }  compound — "my recent trips"
  - { destination: 'text' }  text — search by destination name
```

## Field Design Checklist

For every new field, decide:

| Question | Options |
|----------|---------|
| Required or optional? | `required: true` vs nullable |
| Default value? | `default: 'draft'` |
| Constrained values? | `enum: [...]` |
| Max length? | `maxlength: 500` for strings |
| Trimmed? | `trim: true` for user-input strings |
| Indexed? | Only if queried/sorted frequently |
| Type safety? | Use TypeScript type + Mongoose type |

## Timestamps

Always enable `{ timestamps: true }` on schemas. This automatically adds:
- `createdAt: Date` — set on document creation
- `updatedAt: Date` — updated on every save

Never manually manage these fields.

## Soft Deletes

For important data (users, trips), prefer **soft deletes** over hard deletes:

```typescript
@Prop({ type: Date, default: null })
deletedAt: Date | null;
```

Add `deletedAt: null` to all queries to exclude soft-deleted documents.

## Document Size

MongoDB has a **16MB document size limit**. For HappyTrip:
- A trip with 7 days × 6 activities = 42 embedded activities is fine
- Don't embed unbounded arrays (e.g., all user chat messages)
- If a subdocument array could grow unboundedly, use a separate collection

## Destructive Changes Warning

Before making any of these changes, explicitly warn:
- Dropping a collection
- Removing a field from existing documents
- Changing a field type
- Removing an index that queries depend on
- Changing unique constraints
