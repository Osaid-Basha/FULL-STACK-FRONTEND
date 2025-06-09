import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    private baseUrl = environment.apiBaseUrl ;


  constructor(private http: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(' Token:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  getMyNotifications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`, {
      headers: this.getAuthHeaders()
    });
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/notifications/${notificationId}/read`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/notifications/${notificationId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
