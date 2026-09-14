import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class BudgetInfo {
  @Prop({ type: Number, default: null })
  min: number | null;

  @Prop({ type: Number, default: null })
  max: number | null;

  @Prop({ type: String, default: 'INR' })
  currency: string;

  @Prop({ type: String, default: null })
  tier: string | null;
}

export const BudgetInfoSchema = SchemaFactory.createForClass(BudgetInfo);

@Schema({ _id: false })
export class TripState {
  @Prop({ type: String, default: null })
  origin: string | null;

  @Prop({ type: String, default: null })
  destination: string | null;

  @Prop({ type: String, default: null })
  start_date: string | null;

  @Prop({ type: Number, default: null })
  duration_days: number | null;

  @Prop({ type: String, default: null })
  traveler_type: string | null;

  @Prop({ type: Number, default: null })
  traveler_count: number | null;

  @Prop({ type: BudgetInfoSchema, default: null })
  budget: BudgetInfo | null;

  @Prop({ type: String, default: null })
  food_preference: string | null;

  @Prop({ type: String, default: null })
  transport_preference: string | null;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ type: String, default: null })
  accommodation_preference: string | null;
}

export const TripStateSchema = SchemaFactory.createForClass(TripState);
