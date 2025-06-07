import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8000/api/buyer';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(' Token:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  getAllAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agents`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ getAllAgents API error:', error);
        return throwError(() => error);
      })
    );
  }

  searchAgents(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agents/search/${keyword}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ searchAgents API error:', error);
        return throwError(() => error);
      })
    );
  }

  getAgentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agents/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('❌ getAgentById API error:', error);
        return throwError(() => error);
      })
    );
  }
  proposeNegotiation(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/negotiations/propose`, payload, {
    headers: this.getAuthHeaders()
  });
}

}
