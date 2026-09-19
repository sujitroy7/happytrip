import { Injectable, Logger } from '@nestjs/common';
import type { EnqueuedPlanJob } from './trips.types.js';

@Injectable()
export class TripsQueueService {
  private readonly logger = new Logger(TripsQueueService.name);
  public static readonly PLANNING_QUEUE = 'trip.planning.queue';

  /**
   * Enqueues a trip planning job to the RabbitMQ queue (currently mocked).
   */
  async enqueuePlanJob(sessionId: string, payload: Record<string, any>): Promise<EnqueuedPlanJob> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const job: EnqueuedPlanJob = {
      jobId,
      queue: TripsQueueService.PLANNING_QUEUE,
      status: 'queued',
      enqueuedAt: new Date().toISOString(),
      sessionId,
      payload,
    };

    // Simulated RabbitMQ publication
    this.logger.log(
      `[RabbitMQ Mock] Published job ${jobId} to queue "${TripsQueueService.PLANNING_QUEUE}" for session ${sessionId}`,
    );

    return job;
  }
}
