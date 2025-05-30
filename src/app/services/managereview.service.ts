import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagereviewService {

  private baseUrl = 'http://localhost:8000/api';
   token ='2|wajPs7RUxcyO1x4ETDpOX3rCEsYVqE5TuZovmcfye57484d5';

  constructor(private http: HttpClient) {}

  //  Get All Reviews
 getAllReviews(): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/reviews/getAllReviews`, {
    headers: { Authorization: `Bearer ${this.token}` }
  });
}

  // Delete Review
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
  // Update Review

   getAgentReviews(): Observable<any> {
  return this.http.get(`${this.baseUrl}/agent/reviews`, {
    headers: { Authorization: `Bearer ${this.token}` }
  });
}

sendReply(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/agent/reviews/reply`, data, {
    headers: { Authorization: `Bearer ${this.token}` }
  });
}


}
