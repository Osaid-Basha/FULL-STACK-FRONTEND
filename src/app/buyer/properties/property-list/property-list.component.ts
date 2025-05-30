import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  standalone: false
})
export class PropertyListComponent implements OnInit, OnChanges {
  @Input() filters: any;
  properties: any[] = [];

  dummyProperties = [
    {
      id: 1,
      title: 'Villa Entire villa hosted by Wayan',
      price: '$17966',
      period: 'month',
      image: 'assets/img/properties/01.jpg',
      tag: 'For Sale',
      location: 'San Francisco',
      description: 'Spacious villa with sea view.',
      bedrooms: 5,
      bathrooms: 3,
      size: '720 sqft',
      type: 4,
      isFavorited: false
    },
    {
      id: 2,
      title: 'Penthouse Tampaksiring, Indonesia',
      price: '$19953',
      period: 'month',
      image: 'assets/img/properties/02.jpg',
      tag: 'For Sale',
      location: 'San Francisco',
      description: 'Luxurious penthouse in the heart of the city.',
      bedrooms: 2,
      bathrooms: 2,
      size: '600 sqft',
      type: 7,
      isFavorited: false
    },
    {
      id: 3,
      title: 'Duplex Pantai Nyanyi, Indonesia',
      price: '$19953',
      period: 'month',
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      location: 'San Francisco',
      description: 'Elegant duplex near the beach.',
      bedrooms: 4,
      bathrooms: 3,
      size: '620 sqft',
      type: 6,
      isFavorited: false
    },
    {
      id: 4,
      title: 'Houses Pantai Nyanyi, Palestine',
      price: '$10000',
      period: 'month',
      image: 'assets/img/properties/03.jpg',
      tag: 'For rent',
      location: 'Nablus',
      description: 'Family house with modern design.',
      bedrooms: 3,
      bathrooms: 2,
      size: '620 sqft',
      type: 3,
      isFavorited: false
    }
  ];


  constructor(private propertyService: PropertyBuyerService) {}

  ngOnInit() {
    this.propertyService.getAllProperties().subscribe(
      (data: any) => {
        this.properties = data.length ? data : this.dummyProperties;
      },
      error => {
        this.properties = this.dummyProperties;
        console.error('Error getting properties.', error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && this.filters) {
      this.applyFilters(this.filters);
    }
  }

  // 🟢 هذه الدالة تستقبل الفلتر من الهيدر
  onFiltersChanged(filters: any) {
    this.filters = filters;
    this.applyFilters(filters);
  }

  // 🟢 فلترة الداتا
  applyFilters(filters: any) {
    this.propertyService.searchProperties(filters).subscribe(
      (data: any) => {
        this.properties = data.length ? data : this.filterDummyData(filters);
      },
      error => {
        this.properties = this.filterDummyData(filters);
      }
    );
  }

  filterDummyData(filters: any): any[] {
    return this.dummyProperties.filter(p => {
      const location = p.location?.toLowerCase() || '';
      const title = p.title?.toLowerCase() || '';
      const description = p.description?.toLowerCase() || '';
      const tag = p.tag?.toLowerCase() || '';
      const price = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;

      const locationMatch = !filters.location ||
        location.includes(filters.location.toLowerCase()) ||
        title.includes(filters.location.toLowerCase()) ||
        description.includes(filters.location.toLowerCase());

      const keywordMatch = !filters.keyword || title.includes(filters.keyword.toLowerCase()) || description.includes(filters.keyword.toLowerCase());

      const typeMatch = !filters.type || p.type?.toString().toLowerCase() === filters.type.toLowerCase();

      const listingMatch = !filters.listing_type_id || tag.includes(filters.listing_type_id.toLowerCase());

      const minMatch = !filters.min_price || price >= parseInt(filters.min_price);
      const maxMatch = !filters.max_price || price <= parseInt(filters.max_price);

      return locationMatch && keywordMatch && typeMatch && listingMatch && minMatch && maxMatch;
    });
  }


  toggleFavorite(event: MouseEvent, property: any): void {
    event.stopPropagation();
    property.isFavorited = !property.isFavorited;
  }
}
