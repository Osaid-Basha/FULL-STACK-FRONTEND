import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagereviewService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // ✅ Get All Reviews
  getAllReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reviews/getAllReviews`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Delete Review
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/reviews/${reviewId}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Get Reviews for Agent
  getAgentReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/agent/reviews`, {
      headers: this.getAuthHeaders()
    });
  }

  // ✅ Reply to a Review
  sendReply(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/agent/reviews/reply`, data, {
      headers: this.getAuthHeaders()
    });
  }
}
