import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type IdempotencyRecordDocument = HydratedDocument<IdempotencyRecord>;

export type IdempotencyStatus = 'in_progress' | 'completed';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class IdempotencyRecord {
  @Prop({ type: String, required: true, unique: true, index: true })
  key: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({
    type: String,
    required: true,
    enum: ['in_progress', 'completed'],
    default: 'in_progress',
  })
  status: IdempotencyStatus;

  @Prop({ type: Object })
  response?: Record<string, any>;

  @Prop({ type: Date, default: Date.now, expires: 86400 })
  createdAt?: Date;
}

export const IdempotencyRecordSchema = SchemaFactory.createForClass(IdempotencyRecord);
