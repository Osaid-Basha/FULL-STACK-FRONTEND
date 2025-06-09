import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyBuyerService {
   private api = environment.apiBaseUrl + '/buyer';


  constructor(private http: HttpClient) {}

  private getHeaders(json = true): HttpHeaders {

    const headersConfig: any = {
      'Accept': 'application/json'
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        headersConfig['Authorization'] = 'Bearer ' + token;
      }
    }
    if (json) {
      headersConfig['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headersConfig);
  }


  getAllProperties() {
    return this.http.get(`${this.api}/properties`, {
    headers: this.getHeaders()
  });
}


searchProperties(filters: any) {
  let params = new HttpParams();

  if (filters.location) params = params.set('location', filters.location);
  if (filters.type) params = params.set('type', filters.type);
  if (filters.min_price) params = params.set('min_price', filters.min_price);
  if (filters.max_price) params = params.set('max_price', filters.max_price);
  if (filters.listing_type_id) params = params.set('listing_type_id', filters.listing_type_id);
  if (filters.keyword) params = params.set('keyword', filters.keyword);

  return this.http.get(`${this.api}/properties/search`, {
    params,
    headers: this.getHeaders()
  });
}



getPropertyDetails(id: number) {
  return this.http.get(`${this.api}/properties/${id}`, {
    headers: this.getHeaders()
  });
}

}
