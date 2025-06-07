// services/received-agent.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceivedAgentService {
  private apiUrl = 'http://127.0.0.1:8000/api/agent';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/negotiations`, {
      headers: this.getAuthHeaders()
    });
  }

  accept(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/negotiations/${id}/accept`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  reject(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/negotiations/${id}/reject`, {}, {
      headers: this.getAuthHeaders()
    });
  }
  confirm(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/buying-requests/confirm/${id}`, {}, {
      headers: this.getAuthHeaders()
    });
  }
}
