import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TripsService } from './trips.service.js';
import { ChatTripDto } from './dto/chat-trip.dto.js';
import type { ChatTripResponse } from './trips.types.js';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('chat')
  async chat(@Body() dto: ChatTripDto): Promise<ChatTripResponse> {
    return this.tripsService.handleChat(dto);
  }

  @Get(':id')
  async getSession(@Param('id') id: string) {
    return this.tripsService.getSession(id);
  }
}
