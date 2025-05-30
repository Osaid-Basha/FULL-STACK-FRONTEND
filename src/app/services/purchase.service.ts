import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = 'http://localhost:8000/api/';



  constructor(private http: HttpClient) {}

    token = localStorage.getItem('token');
  private getHeaders(json = true): HttpHeaders {
    const headersConfig: any = {
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json'
    };
    if (json) {
      headersConfig['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headersConfig);
  }


  getAllPurchases(): Observable<any> {
    return this.http.get(`${this.baseUrl}purchases`, {
      headers: this.getHeaders()
    });
  }


  searchPurchases(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}purchases/${keyword}`, {
      headers: this.getHeaders()
    });
  }

}
