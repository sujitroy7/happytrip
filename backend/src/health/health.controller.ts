import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';
import type { HealthCheckResult } from './health.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthCheckResult {
    return this.healthService.check();
  }
}
