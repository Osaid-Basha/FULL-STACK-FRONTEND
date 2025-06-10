import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'http://localhost:8000/api/agent/properties';

  private token = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) {}

  private getHeaders(contentType: 'json' | 'formdata' = 'json') {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    if (contentType === 'json') {
      // فقط لطلبات JSON، نضيف Content-Type: application/json
      headers = headers.set('Content-Type', 'application/json');
    }
    // ملاحظة مهمة: لطلبات FormData، لا تحدد Content-Type هنا.
    // HttpClient سيقوم بتعيين 'multipart/form-data' تلقائيًا مع الـ boundary.
    return headers;
  }

  getAllProperties(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders('json') });
  }

  addProperty(data: FormData): Observable<any> {
    // استخدم 'formdata' لضمان عدم إضافة Content-Type: application/json
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders('formdata') });
  }

  viewProperty(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders('json') });
  }

  updateProperty(id: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders('formdata') });
  }


  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders('json') });
  }
}
