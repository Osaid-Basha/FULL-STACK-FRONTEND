import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgClass, NgForOf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-notification-admin',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './notification-agent.component.html',
  styleUrls: ['./notification-agent.component.css']
})
export class NotificationAgentComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  notifications = [
    {
      type: 'info',
      icon: 'bi-envelope-fill',
      title: 'New advertisement',
      message: 'User ahmad@gmail.com sent a message about "Apartment #A12".',
      time: 'Just now',

    },
    {
      type: 'warning',
      icon: 'bi-tag-fill',
      title: 'Price Drop',
      message: 'Wafa adham replay your massage.',
      time: '10 mins ago',

    },
    {
      type: 'success',
      icon: 'bi-calendar-check-fill',
      title: 'Booking Confirmed',
      message: 'Booking for Apartment #12B is confirmed by Nour Khaled.',
      time: '1 hour ago',

    },
    {
      type: 'danger',
      icon: 'bi-x-octagon-fill',
      title: 'Payment Failed',
      message: 'Transaction for property #2013 failed. Please check payment gateway.',
      time: '2 hours ago',

    }
  ];

  selectedNotification: any = null;

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

}
