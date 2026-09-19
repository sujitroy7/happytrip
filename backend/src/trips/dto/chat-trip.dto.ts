import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class ChatTripDto {
  @ApiPropertyOptional({
    description: 'Existing trip session ID if continuing a session',
    example: '66d0ef093a18349faec63701',
  })
  @IsOptional()
  @IsString()
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'User message or answer in conversation',
    example: 'We are looking for budget backpacking for 2 weeks in Vietnam.',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: 'Key-value mapping of answered slots/questions',
    example: { destination: 'Vietnam', durationDays: 14 },
  })
  @IsOptional()
  @IsObject()
  answers?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Slot fields skipped by the user',
    example: ['budget'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skippedFields?: string[];

  @ApiPropertyOptional({
    description: 'Unique client key to ensure request idempotency and prevent duplicate processing',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}

