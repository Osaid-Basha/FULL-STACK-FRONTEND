import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://127.0.0.1:8000/api/';



  constructor(private http: HttpClient) {}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
  }




  getMyNegotiations(): Observable<any> {
    return this.http.get(`${this.baseUrl}buyer/negotiations/purchases`, {
      headers: this.getHeaders()
    });
  }

submitReview(data: {
  title: string;
  content: string;
  rating: number;
  buying_id: number;
}): Observable<any> {
  return this.http.post(`${this.baseUrl}buyer/reviews`, data, {
    headers: this.getHeaders()
  });
}

  searchPurchases(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}buyer/purchases/${keyword}`, {
      headers: this.getHeaders()
    });
  }

}
