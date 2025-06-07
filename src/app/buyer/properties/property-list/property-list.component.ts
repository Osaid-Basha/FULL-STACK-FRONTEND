import { Component, OnInit } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';
import { FavoriteService } from '../../../services/favorite.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],

})
export class PropertyListComponent implements OnInit {
  filters: any = {};
  properties: any[] = [];

  constructor(
  private propertyService: PropertyBuyerService,
  private favoriteService: FavoriteService,
  private router: Router
) {}


  ngOnInit(): void {
    this.loadAllProperties();
  }

  onFiltersChanged(filters: any): void {
    this.filters = filters;

    const hasFilters = Object.keys(this.filters || {}).length > 0;

    const request = hasFilters
      ? this.propertyService.searchProperties(this.filters)
      : this.propertyService.getAllProperties();

    request.subscribe(
      res => this.handleResponse(res),
      err => console.error('Error fetching properties:', err)
    );
  }

  loadAllProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      this.handleResponse,
      this.handleError
    );
  }

  handleResponse = (res: any) => {
    const data = Array.isArray(res) ? res : res.data || [];
    this.properties = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.images?.[0]?.imageUrl
        ? `http://127.0.0.1:8000/storage/${p.images[0].imageUrl}`
        : 'assets/img/default-property.jpg',
      tag: p.listing_type?.name?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale',
      tagColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'white' : 'primary',
      tagTextColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'text-dark' : 'text-white',
      address: p.address || p.city || 'No address',
      bedrooms: p.bedroom,
      bathrooms: p.bathroom,
      size: `${p.livingArea} m²`,
      description: p.shortDescreption || 'No description available',
      period: 'month',
      isFavorited: false
    }));
  }

  handleError = (error: any) => {
    console.error('Error fetching properties:', error);
  }

toggleFavorite(event: Event, property: any): void {
  event.stopPropagation();

  if (!property.isFavorited) {
    this.favoriteService.addFavorite(property.id).subscribe({
      next: (): void => {
        property.isFavorited = true;
      },
      error: (err: any): void => {
        console.error(' Failed to add favorite:', err);
      }
    });
  } else {
    console.log('removeFavorite');
  }
}


}

