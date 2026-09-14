import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { TripState, TripStateSchema } from './trip-state.schema.js';

export type TripSessionDocument = HydratedDocument<TripSession>;

export type TripSessionStatus = 'collecting_info' | 'ready' | 'planning' | 'completed';

@Schema({ _id: false, timestamps: { createdAt: true, updatedAt: false } })
export class ChatMessage {
  @Prop({ type: String, required: true, enum: ['user', 'assistant', 'system'] })
  role: 'user' | 'assistant' | 'system';

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: () => new Date() })
  timestamp: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

@Schema({ timestamps: true })
export class TripSession {
  @Prop({
    type: String,
    enum: ['collecting_info', 'ready', 'planning', 'completed'],
    default: 'collecting_info',
  })
  status: TripSessionStatus;

  @Prop({ type: TripStateSchema, default: () => ({}) })
  state: TripState;

  @Prop({ type: [String], default: [] })
  skipped_fields: string[];

  @Prop({ type: [ChatMessageSchema], default: [] })
  messages: ChatMessage[];
}

export const TripSessionSchema = SchemaFactory.createForClass(TripSession);
