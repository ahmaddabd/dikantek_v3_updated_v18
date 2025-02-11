import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async sendNotification(storeId: number, userId: number, type: string, message: string) {
    const notification = this.notificationsRepository.create({ store: { id: storeId }, user: { id: userId }, type, message });
    return this.notificationsRepository.save(notification);
  }

  async getNotificationsForUser(userId: number) {
    return this.notificationsRepository.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
  }

  async markAsRead(notificationId: number) {
    const notification = await this.notificationsRepository.findOne({ where: { id: notificationId } });
    if (notification) {
      notification.isRead = true;
      return this.notificationsRepository.save(notification);
    }
  }
}
