import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerStatisticsService {
    private baseUrl = environment.apiBaseUrl ;


  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  getGeneralStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/general/stats`, {
      headers: this.getAuthHeaders()
    });
  }
}
