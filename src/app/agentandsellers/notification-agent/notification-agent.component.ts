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
      id:1,
      type: 'info',
      icon: 'bi-envelope-fill',
      title: 'New Inquiry',
      message: 'User ahmad@gmail.com sent a message about "Apartment #A12".',
      time: 'Just now',
      isread:false
    },
    {
      id:2,
      type: 'warning',
      icon: 'bi-tag-fill',
      title: 'Price Drop',
      message: '“Luxury Villa” price dropped by 10%.',
      time: '10 mins ago',
      isread:false
    },
    {
      id:3,
      type: 'success',
      icon: 'bi-calendar-check-fill',
      title: 'Booking Confirmed',
      message: 'Booking for Apartment #12B is confirmed by Nour Khaled.',
      time: '1 hour ago',
      isread:false
    },
    {
      id:4,
      type: 'danger',
      icon: 'bi-x-octagon-fill',
      title: 'Payment Failed',
      message: 'Transaction for property #2013 failed. Please check payment gateway.',
      time: '2 hours ago',
      isread:false
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
  isRead: boolean = false;

  markAsRead(reviewId: number) {
    const review = this.notifications.find(n => n.id === reviewId);
    if (review) {
      review.isread = true;
    }
  }



}
