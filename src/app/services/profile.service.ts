
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    private baseUrl = environment.apiBaseUrl ;


  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(json = true): HttpHeaders {
    const token = this.getToken();
    const headersConfig: any = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };
    if (json) {
      headersConfig['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headersConfig);
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/profile`, { headers });
  }

  updateProfile(data: any): Observable<any> {
    const headers = this.getHeaders(true);
    return this.http.post(`${this.baseUrl}/profile/update`, data, { headers });
  }

  removeProfilePicture(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/profile/remove-picture`, { headers });
  }

  updateProfilePicture(data: FormData): Observable<any> {
    const headers = this.getHeaders(false);
    return this.http.post(`${this.baseUrl}/profile/update-picture`, data, { headers });
  }


}
