import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitiateTripDto {
  @ApiProperty({
    description: 'Natural language prompt from user detailing trip intention',
    example: 'Plan a 5-day trip to Tokyo for 2 people with a moderate budget focusing on food and culture.',
  })
  @IsString()
  @IsNotEmpty()
  prompt!: string;
}

