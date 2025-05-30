import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://127.0.0.1:8081/api/agent/properties';


  private token = '6|GaW3FMEWCDCByfAMYuZwZuWtier0KWcgUoknydmya5982844';

  constructor(private http: HttpClient) {}

  private getHeaders(contentType: 'json' | 'formdata' = 'json') {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    // If sending FormData, do NOT set 'Content-Type': 'application/json'
    // The browser will automatically set 'Content-Type': 'multipart/form-data'
    // along with the boundary, which is required for file uploads.
    if (contentType === 'json') {
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  getAllProperties(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders('json') });
  }

  // Changed data type to FormData for file uploads
  addProperty(data: FormData): Observable<any> {
    // When sending FormData, Angular's HttpClient will automatically set the
    // Content-Type header to 'multipart/form-data' with the correct boundary.
    // So, we don't need to manually set 'Content-Type' here, in fact, doing so
    // can break the request.
    return this.http.post(this.apiUrl, data, { headers: this.getHeaders('formdata') });
  }

  viewProperty(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders('json') });
  }

  // Changed data type to FormData for file uploads and other data in PUT requests
  // Use POST method with _method: 'PUT' for Laravel FormData PUT requests
  updateProperty(id: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders('formdata') });
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders('json') });
  }
}
