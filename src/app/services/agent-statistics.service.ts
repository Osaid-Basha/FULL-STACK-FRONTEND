import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentStatisticsService {
  private baseUrl = 'http://localhost:8000/api/';


  constructor(private http: HttpClient) {}

 private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(' Token:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${this.baseUrl}agent/statistics`, { headers: this.getAuthHeaders() });
  }

}
