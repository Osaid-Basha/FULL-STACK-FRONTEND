import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';
import{ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css'],
  standalone: false
})
export class PropertyGridComponent implements OnInit, OnChanges {
  @Input() filters: any = {};
  properties: any[] = [];

  dummyProperties = [
    {
      id: 1,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Rent',
      tagColor: 'white',
      tagTextColor: 'text-dark',
      price: '$31',
      period: '/night',
      title: 'Studio Koh Samui, Thailand',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Modern apartment with beach view.',
      type: 5
    },
    {
      id: 2,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$100,000',
      period: '/night',
      title: 'Villa Belle Mare, Mauritius',
      address: '100 Seoul Street Gardens, Iron, I04',
      beds: 5,
      baths: 3,
      size: '7x10 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Beautiful property near the sea.',
      type: 4
    },
    {
      id: 3,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Rent',
      tagColor: 'white',
      tagTextColor: 'text-primary',
      price: '$15,000',
      period: '/night',
      title: 'Townhouse Balian Beach, Indonesia',
      address: '20 School Street, Street 22',
      beds: 4,
      baths: 2,
      size: '6x7 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Peaceful area with modern finish.',
      type: 8
    },
    {
      id: 4,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$35,000',
      period: '/night',
      title: 'Apartment Balian Beach, Indonesia',
      address: '14 Najah Gardens, IG4',
      beds: 2,
      baths: 1,
      size: '3x6 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Close to schools and shops.',
      type: 2
    },
    {
      id: 5,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$150,000',
      period: '/night',
      title: 'Villa Balian Beach, Indonesia',
      address: '101 Kingdom Garden, 17 Street',
      beds: 6,
      baths: 3,
      size: '8x10 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Perfect for small families.',
      type: 4
    }
  ];

  constructor(private propertyService: PropertyBuyerService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

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
        const isValid = res?.length && res.some((p: any) => p.title && p.image);
        this.properties = isValid ? res : this.dummyProperties;
        localStorage.setItem('lastGridProperties', JSON.stringify(this.properties));

        if (fromHome) {
          this.filters = fromHome;
          this.applyFilters(this.filters);
        }
      },
      _ => {
        this.properties = this.dummyProperties;
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

// console.log('filters',this.filters);

    const result = all.filter((property: any) => {

      const locationMatch =
        !this.filters.location ||
        property.address?.toLowerCase().includes(this.filters.location.toLowerCase()) ||
        property.title?.toLowerCase().includes(this.filters.location.toLowerCase());

      const typeMatch =
        !this.filters.type || property.type === +this.filters.type;

      const listingMatch =
        !this.filters.listing_type_id ||
        (this.filters.listing_type_id === 'rent' && property.tag === 'For Rent') ||
        (this.filters.listing_type_id === 'sale' && property.tag === 'For Sale');

      const minPriceMatch =
        !this.filters.min_price || this.extractPrice(property.price) >= +this.filters.min_price;

      const maxPriceMatch =
        !this.filters.max_price || this.extractPrice(property.price) <= +this.filters.max_price;

      const keywordMatch =
        !this.filters.keyword ||
        property.title?.toLowerCase().includes(this.filters.keyword.toLowerCase()) ||
        property.description?.toLowerCase().includes(this.filters.keyword.toLowerCase()) ||
        property.address?.toLowerCase().includes(this.filters.keyword.toLowerCase());

      return locationMatch && typeMatch && listingMatch && minPriceMatch && maxPriceMatch && keywordMatch;


    });

    this.properties = result;
  }

  extractPrice(priceStr: string): number {
    const num = priceStr.replace(/[^\d]/g, '');
    return +num;
  }


  goToDetails(property: any): void {
    this.router.navigate(['properties-details', property.id],{
      state: {data: property}
    });
  }
}
