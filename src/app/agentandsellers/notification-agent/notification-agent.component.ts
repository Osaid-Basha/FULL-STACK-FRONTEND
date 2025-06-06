import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, NgClass, NgForOf } from '@angular/common';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-notification-agent',
  standalone: false,

  templateUrl: './notification-agent.component.html',
  styleUrls: ['./notification-agent.component.css']
})

export class NotificationAgentComponent implements OnInit {
  notifications: any[] = [];

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
        // نربط الداتا مع الدزاين الحالي (type + icon + title)
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
              title = 'Warning';
              break;
            case 'success':
              icon = 'bi-calendar-check-fill';
              title = 'Success';
              break;
            case 'danger':
              icon = 'bi-x-octagon-fill';
              title = 'Error';
              break;
            case 'reply_review':
              icon = 'bi-reply-fill';
              title = 'Review Replied';
              break;
          }

          return {
            id: n.id,
            type: n.type,
            icon: icon,
            title: title,
            message: n.message_content,
            time: this.formatDate(n.created_at),
            isread: n.pivot?.is_read === 1
          };
        });
      },
      error: (err) => console.error('Error loading notifications', err)
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
  isRead: boolean = false;

  markAsRead(reviewId: number) {
    const review = this.notifications.find(n => n.id === reviewId);
    if (review) {
      review.isread = true;
    }
  }



}
