import { Component, OnInit } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  standalone:false,
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit {
  filters: any = {};
  properties: any[] = [];

  constructor(
  private propertyService: PropertyBuyerService,
  private favoriteService: FavoriteService
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
      err => console.error('Error loading properties:', err)
    );
  }

  loadAllProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      res => this.handleResponse(res),
      err => console.error('Error loading properties:', err)
    );
  }

  handleResponse(res: any): void {
    const data = Array.isArray(res) ? res : res.data || [];
    this.properties = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: `$${p.price}`,
      image: p.images?.[0]?.imageUrl
        ? `http://127.0.0.1:8000/storage/${p.images[0].imageUrl}`
        : 'assets/img/default-property.jpg',
      tag: p.listing_type?.name?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale',
      tagColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'white' : 'primary',
      tagTextColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'text-dark' : 'text-white',
      address: p.address || p.city || 'No address',
      size: `${p.livingArea} m²`,
      description: p.shortDescreption || 'No description available',
      beds: p.bedroom,
      baths: p.bathroom,
      period: 'month',
      isFavorited: false
    }));
  }

  toggleFavorite(event: Event, property: any): void {
  event.stopPropagation();

  if (!property.isFavorited) {
    this.favoriteService.addFavorite(property.id).subscribe({
      next: () => {
        property.isFavorited = true;
        console.log('Favorite added:', property);

      },
      error: (err) => {
        console.error(' Error adding favorite:', err);
      }
    });
  } else {
    console.log('removeFavorite)');
  }
}

}
