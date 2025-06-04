import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = 'http://localhost:8000/api'; // غيّري حسب مسارك الحقيقي

  constructor(private http: HttpClient) {}

  getAllAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agents`).pipe(
    catchError(error => {
      console.error('❌ getAllAgents API error:', error); //تحقق
      return throwError(() => error);
    })
  );
  }

  searchAgents(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/agents/search/${keyword}`).pipe(
      catchError(error => {
        console.error('❌ searchAgents API error:', error); //تحقق
        return throwError(() => error);
      })
    );
  }

  getAgentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/agents/${id}`).pipe(
      catchError(error => {
        console.error('❌ getAgentById API error:', error); // تحقق
        return throwError(() => error);
      })
    );
  }
}
