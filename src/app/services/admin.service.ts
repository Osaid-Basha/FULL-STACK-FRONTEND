import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8000/api/admin';

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



  // ✅ Approve user
  approveUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${id}`, {}, { headers: this.getAuthHeaders() });
  }

  // ❌ Reject user
  rejectUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {}, { headers: this.getAuthHeaders() });
  }

  // 🔍 Search users
  searchUsers(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/${keyword}`, { headers: this.getAuthHeaders() });
  }

  // ➕ Add new user
  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData, { headers: this.getAuthHeaders() });
  }

  // 🗑️ Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // 🏠 Get all properties
  getAllProperties(): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties`, { headers: this.getAuthHeaders() });
  }

  // 🔍 Search properties
  searchProperties(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/search/${keyword}`, { headers: this.getAuthHeaders() });
  }
  getPropertyById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/properties/${id}`, { headers: this.getAuthHeaders() });

  }
  // 🗑️ Delete property
  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/properties/${id}`, { headers: this.getAuthHeaders() });
  }
  getStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/stats`, { headers: this.getAuthHeaders() });
  }
}
