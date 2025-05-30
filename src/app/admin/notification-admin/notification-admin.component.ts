import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-notification-admin',
  standalone: false,
  templateUrl: './notification-admin.component.html',
  styleUrls: ['./notification-admin.component.css']
})



export class NotificationAdminComponent implements OnInit {
  notifications: any[] = [];

  selectedNotification: any = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getMyNotifications().subscribe({
      next: (res) => {
        this.notifications = res.notifications.map((n: any) => {
          let icon = 'bi-bell-fill';
          let title = 'Notification';

          switch (n.type) {
            case 'message':
              icon = 'bi-envelope-fill';
              title = 'New Message';
              break;
            case 'warning':
              icon = 'bi-tag-fill';
              title = 'Price Drop';
              break;
            case 'success':
              icon = 'bi-calendar-check-fill';
              title = 'Booking Confirmed';
              break;
            case 'danger':
              icon = 'bi-x-octagon-fill';
              title = 'Payment Failed';
              break;
            case 'reply_review':
              icon = 'bi-reply-fill';
              title = 'Review Replied';
              break;
          }

          return {
            id: n.id,
            type: n.type,
            icon,
            title,
            message: n.message_content,
            time: this.formatDate(n.created_at),
            isread: n.pivot?.is_read === 1
          };
        });
      },
      error: (err) => console.error('Error loading notifications', err)
    });
  }

  markAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) notif.isread = true;
      },
      error: err => console.error('Error marking as read:', err)
    });
  }

  removenotifaction(notification: any) {
    this.notificationService.deleteNotification(notification.id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      },
      error: err => console.error('Error deleting notification:', err)
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  openModal(notification: any) {
    this.selectedNotification = notification;
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('notificationModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }
  removenotifaction(review: any) {
    this.notifications = this.notifications.filter(r => r !== review);
  }
  isRead: boolean = false;

  markAsRead(reviewId: number) {
    const review = this.notifications.find(n => n.id === reviewId);
    if (review) {
      review.isread = true;
    }
  }

}
