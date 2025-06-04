import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css'],
  standalone: false
})
export class PropertyGridComponent implements OnInit, OnChanges {
  @Input() filters: any = {};
  properties: any[] = [];

  constructor(
    private propertyService: PropertyBuyerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fromHome = history.state?.filters;
    const cachedProps = JSON.parse(localStorage.getItem('lastGridProperties') || 'null');

    if (cachedProps) {
      this.properties = cachedProps;
      this.route.queryParams.subscribe((params) => {
        const hasParams = Object.keys(params).length > 0;
        if (hasParams) {
          this.filters = params;
          this.applyFilters(this.filters);
        } else if (fromHome) {
          this.filters = fromHome;
          this.applyFilters(this.filters);
        }
      });
    } else {
      this.loadInitialProperties(fromHome);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && this.filters) {
      this.applyFilters(this.filters);
    }
  }

  loadInitialProperties(fromHome?: any): void {
  this.propertyService.getAllProperties().subscribe(
    (res: any) => {
     const data = res;

      const transformed = data.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.images?.[0]?.imageUrl
          ? `http://localhost:8000/storage/${p.images[0].imageUrl}`
          : 'assets/img/default-property.jpg',
        tag: p.listing_type?.name?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale',
        tagColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'white' : 'primary',
        tagTextColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'text-dark' : 'text-white',
        address: p.address || p.city || 'No address',
        beds: p.bedroom,
        baths: p.bathroom,
        size: `${p.livingArea} m²`,
        description: p.shortDescreption || 'No description available',
        type: p.property_type?.id || 0,
        propertyTypeName: p.property_type?.type || '',
        isFavorited: false // ✅ spelling was wrong in your code (was: isFavorited)
      }));

      this.properties = transformed;
      localStorage.setItem('lastGridProperties', JSON.stringify(this.properties));

      if (fromHome) {
        this.filters = fromHome;
        this.applyFilters(this.filters);
      }
    },
    error => {
      console.error('Error loading properties:', error);
      this.properties = [];
      localStorage.setItem('lastGridProperties', JSON.stringify(this.properties));
      if (fromHome) {
        this.filters = fromHome;
        this.applyFilters(this.filters);
      }
    }
  );
}

  onFiltersChanged(filters: any): void {
    this.filters = filters;
    this.applyFilters(this.filters);
  }

  applyFilters(filters: any): void {
    const all = JSON.parse(localStorage.getItem('lastGridProperties') || '[]');

    const result = all.filter((property: any) => {
      const locationMatch =
        !filters.location ||
        property.address?.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.title?.toLowerCase().includes(filters.location.toLowerCase());

      const typeMatch =
        !filters.type || property.type === +filters.type;

      const listingMatch =
        !filters.listing_type_id ||
        (filters.listing_type_id === 'rent' && property.tag === 'For Rent') ||
        (filters.listing_type_id === 'sale' && property.tag === 'For Sale');

      const minPriceMatch =
        !filters.min_price || this.extractPrice(property.price) >= +filters.min_price;

      const maxPriceMatch =
        !filters.max_price || this.extractPrice(property.price) <= +filters.max_price;

      const keywordMatch =
        !filters.keyword ||
        property.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        property.description?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        property.address?.toLowerCase().includes(filters.keyword.toLowerCase());

      return locationMatch && typeMatch && listingMatch && minPriceMatch && maxPriceMatch && keywordMatch;
    });

    this.properties = result;
  }

  extractPrice(priceStr: string): number {
    const num = priceStr.replace(/[^\d]/g, '');
    return +num;
  }

  goToDetails(property: any): void {
    this.router.navigate(['properties-details', property.id], {
      state: { data: property }
    });
  }
}
