import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyBuyerService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // الهيدر مع التوكن (مهم جدًا)
  private getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer 1|Q05rTYV8r3ijwFmpLb05wV0kfeSlmHBSXlDstsCEfe56be0c'
    });
  }

  // 1. جلب جميع العقارات
  getAllProperties() {
    return this.http.get(`${this.api}/properties`, {
    headers: this.getHeaders()
  });
}

// 2. البحث عن العقارات باستخدام فلتر
searchProperties(filters: any) {
  let params = new HttpParams();

  if (filters.location) params = params.set('location', filters.location);
  if (filters.type) params = params.set('type', filters.type);
  if (filters.min_price) params = params.set('min_price', filters.min_price);
  if (filters.max_price) params = params.set('max_price', filters.max_price);
  if (filters.listing_type_id) params = params.set('listing_type_id', filters.listing_type_id);
  if (filters.keyword) params = params.set('keyword', filters.keyword);

  return this.http.get(`${this.api}/properties/search`,{
    params,
    headers: this.getHeaders()
  });
}

// 3. عرض تفاصيل عقار
getPropertyDetails(id: number) {
  return this.http.get(`${this.api}/properties/${id}`, {
    headers: this.getHeaders()
  });
}
}
