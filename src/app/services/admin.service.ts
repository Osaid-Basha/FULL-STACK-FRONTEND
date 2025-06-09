import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiBaseUrl + '/admin';

  constructor(private http: HttpClient) {}

  // 🔐 Get Auth Headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(' Token:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // 📥 Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }
 getPendingUsers(): Observable<any> {
  return this.http.get(`${this.apiUrl}/user/pending`, {
    headers: this.getAuthHeaders()
  });
}




  approveUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${id}`, {}, { headers: this.getAuthHeaders() });
  }


  rejectUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {}, { headers: this.getAuthHeaders() });
  }


  searchUsers(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${keyword}`, { headers: this.getAuthHeaders() });
  }


  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData, { headers: this.getAuthHeaders() });
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }


  getAllProperties(): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties`, { headers: this.getAuthHeaders() });
  }

  searchProperties(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/search/${keyword}`, { headers: this.getAuthHeaders() });
  }
  getPropertyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/${id}`, { headers: this.getAuthHeaders() });

  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${id}`, { headers: this.getAuthHeaders() });
  }
  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/stats`, { headers: this.getAuthHeaders() });
  }
}
