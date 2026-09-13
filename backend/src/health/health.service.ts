import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import type { Connection } from 'mongoose';

export interface HealthCheckResult {
  status: 'ok' | 'error';
  database: 'connected' | 'disconnected' | 'connecting' | 'disconnecting';
}

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  check(): HealthCheckResult {
    const readyState = this.connection.readyState;
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const stateMap: Record<number, HealthCheckResult['database']> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const dbState = stateMap[readyState] ?? 'disconnected';

    return {
      status: 'ok',
      database: dbState,
    };
  }
}
