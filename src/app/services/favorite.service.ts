import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
   private apiUrl = environment.apiBaseUrl + '/buyer/favorites';



  constructor(private http: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(' Token:', token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });
  }

  // جلب جميع العقارات المفضلة
  getFavorites(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // إضافة عقار للمفضلة
  addFavorite(propertyId: number): Observable<any> {
    return this.http.post(this.apiUrl, { property_id: propertyId }, { headers: this.getAuthHeaders() });
  }

  // حذف عقار من المفضلة
  deleteFavorite(propertyId: number): Observable<any> {
    const url = `${this.apiUrl}?property_id=${propertyId}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }
}
