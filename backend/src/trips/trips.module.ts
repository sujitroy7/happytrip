import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripSession, TripSessionSchema } from './schemas/trip-session.schema.js';
import { TripsController } from './trips.controller.js';
import { TripsService } from './trips.service.js';
import { GeminiModule } from '../gemini/gemini.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TripSession.name, schema: TripSessionSchema },
    ]),
    GeminiModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
