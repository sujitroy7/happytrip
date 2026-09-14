import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class ChatTripDto {
  @IsOptional()
  @IsString()
  sessionId?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsObject()
  answers?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skippedFields?: string[];
}
