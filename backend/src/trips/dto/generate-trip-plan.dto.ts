import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class GenerateTripPlanDto {
  @ApiPropertyOptional({
    description: 'Dynamic questionnaire answers mapped by field ID',
    example: {
      destination: 'Tokyo, Japan',
      durationDays: 5,
      budget: 'moderate',
      travelersCount: 2,
    },
  })
  @IsOptional()
  @IsObject()
  answers?: Record<string, any>;
}

