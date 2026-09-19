import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  IdempotencyRecord,
  type IdempotencyRecordDocument,
} from '../schemas/idempotency-record.schema.js';

export interface IdempotencyCheckResult {
  isCached: boolean;
  response?: Record<string, any>;
}

@Injectable()
export class IdempotencyService {
  constructor(
    @InjectModel(IdempotencyRecord.name)
    private readonly idempotencyModel: Model<IdempotencyRecordDocument>,
  ) {}

  /**
   * Attempts to lock/register an idempotency key.
   * If already completed, returns cached response.
   * If currently in progress, throws ConflictException.
   * If new, registers key with 'in_progress' status.
   */
  async lockOrGet(key: string, target: string): Promise<IdempotencyCheckResult> {
    const existing = await this.idempotencyModel.findOne({ key }).exec();

    if (existing) {
      if (existing.status === 'completed') {
        return { isCached: true, response: existing.response };
      }
      throw new ConflictException(
        'A request with this idempotency key is currently in progress. Please retry shortly.',
      );
    }

    try {
      await this.idempotencyModel.create({
        key,
        target,
        status: 'in_progress',
      });
      return { isCached: false };
    } catch (error: any) {
      // Handle race condition where another request created the record concurrently
      if (error?.code === 11000) {
        const raceExisting = await this.idempotencyModel.findOne({ key }).exec();
        if (raceExisting?.status === 'completed') {
          return { isCached: true, response: raceExisting.response };
        }
        throw new ConflictException(
          'A request with this idempotency key is currently in progress. Please retry shortly.',
        );
      }
      throw error;
    }
  }

  /**
   * Saves the completed response for the idempotency key.
   */
  async complete(key: string, response: Record<string, any>): Promise<void> {
    await this.idempotencyModel
      .updateOne(
        { key },
        {
          $set: {
            status: 'completed',
            response,
          },
        },
      )
      .exec();
  }

  /**
   * Releases/removes key on failure to allow subsequent retries.
   */
  async fail(key: string): Promise<void> {
    await this.idempotencyModel.deleteOne({ key }).exec();
  }
}
