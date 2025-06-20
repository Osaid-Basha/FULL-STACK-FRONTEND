import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =   environment.apiBaseUrl ;
;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
  const trustedToken = localStorage.getItem('trusted_token') || '';

  const headers = new HttpHeaders({
    'X-Trusted-Device': trustedToken
  });

  return this.http.post(`${this.apiUrl}/login`, data, { headers });
}


  logout(): Observable<any> {
  

  return this.http.post(`${this.apiUrl}/logout`, {}, {
    headers: this.getAuthHeaders()
  });
}



  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }


  verify2FA(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify2FA`, data);
  }


  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetPassword`, data);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resend2FACode(userId: number) {
  return this.http.post(`${this.apiUrl}/resend-2fa`, { user_id: userId });
}

private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }
}
