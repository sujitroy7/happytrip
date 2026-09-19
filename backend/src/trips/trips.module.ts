import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripSession, TripSessionSchema } from './schemas/trip-session.schema.js';
import { TripsController } from './trips.controller.js';
import { TripsService } from './trips.service.js';
import { TripsQueueService } from './trips-queue.service.js';
import { GeminiModule } from '../gemini/gemini.module.js';
import { IdempotencyModule } from '../common/idempotency.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TripSession.name, schema: TripSessionSchema },
    ]),
    GeminiModule,
    IdempotencyModule,
  ],
  controllers: [TripsController],
  providers: [TripsService, TripsQueueService],
  exports: [TripsService, TripsQueueService],
})
export class TripsModule {}

