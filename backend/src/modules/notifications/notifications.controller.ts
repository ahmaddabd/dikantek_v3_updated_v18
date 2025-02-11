import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getUserNotifications(@Req() req) {
    return this.notificationsService.getNotificationsForUser(req.user.id);
  }

  @Post('read/:id')
  async markAsRead(@Param('id') id: number) {
    return this.notificationsService.markAsRead(id);
  }
}
