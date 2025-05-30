import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8000/api';
  private token = 'Bearer 3|6zJFqLHiKMcJaS7XysS9iLaxWgahU8GoNzheHfHcbcca9211';

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    });
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/${notificationId}/read`, {}, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    });
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notifications/${notificationId}`, {
      headers: new HttpHeaders({
        Authorization: this.token
      })
    });
  }
}
