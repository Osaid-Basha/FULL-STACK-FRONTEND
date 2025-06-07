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



  getAllPurchases(): Observable<any> {
    return this.http.get(`${this.baseUrl}buyer/purchases`, {
      headers: this.getHeaders()
    });
  }


  searchPurchases(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}buyer/purchases/${keyword}`, {
      headers: this.getHeaders()
    });
  }

}
