import { Component,OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import {PropertyBuyerService} from '../../../services/property-buyer.service';
import  {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-property-grid',
  standalone: false,
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit , OnChanges {
  @Input ()filters:any;
  properties: any[] = [];

  // filters = {
  //   location: '',
  //   type: '',
  //   min_price: '',
  //   max_price: '',
  //   listing_type_id: '',
  //   keyword: ''
  // };


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
      type :5
    },
    {
      id: 2,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$100,000',
      period: '/night',
      title: ' Villa Belle Mare, Mauritius',
      address: '100 seuol street Gardens, Iron, I04',
      beds: 5,
      baths: 3,
      size: '7x10 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Beautiful property near the sea.',
      type:4
    },
    {
      id: 3,
      image: 'assets/img/properties/03.jpg',
      tag: 'For rent',
      tagColor: 'white',
      tagTextColor: 'text-primary',
      price: '$15,000',
      period: '/night',
      title: ' Townhouse Balian Beach, Indonesia',
      address: '20 school street, street 22',
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
      title: ' Apartment Balian Beach, Indonesia',
      address: '14 najah Gardens, IG4',
      beds: 2,
      baths: 1,
      size: '3x6 m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Close to schools and shops.',
      type:"2"
    },
    {
      id: 5,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$150,000',
      period: '/night',
      title: ' Villa Balian Beach, Indonesia',
      address: '101 kingdom garden, 17 street',
      beds: 6,
      baths: 3,
      size: '8x10m²',
      isFavorited: false,
      animateHeart: false,
      description: 'Perfect for small families.',
      type: 4
    }
  ];


  constructor(private propertyService: PropertyBuyerService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filters = params;
      this.onFiltersChanged(this.filters);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && this.filters) {
      this.onFiltersChanged(this.filters);
    }
  }

  onFiltersChanged(filters: any) {
    this.propertyService.searchProperties(filters).subscribe(
      (data: any) => {
        this.properties = data.length ? data : this.filterDummyData(filters);
      },
      error => {
        console.error('Error getting properties.', error);
        this.properties = this.filterDummyData(filters);
      }
    );
  }
  filterDummyData(filters: any): any[] {
    console.log('Filters received:', filters); // فقط للتجريب

    return this.dummyProperties.filter(p => {
      const address = p.address?.toLowerCase() || '';
      const title = p.title?.toLowerCase() || '';
      const description = p.description?.toLowerCase() || '';
      const tag = p.tag?.toLowerCase() || '';
      const price = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
      const locationMatch = !filters.location ||
        address.includes(filters.location.toLowerCase()) ||
        title.includes(filters.location.toLowerCase()) ||
        description.includes(filters.location.toLowerCase());
      const keywordMatch = !filters.keyword || title.includes(filters.keyword.toLowerCase()) || description.includes(filters.keyword.toLowerCase());
      const typeMatch = !filters.type || p.type?.toString().toLowerCase()===filters.type.toLowerCase();
      const listingMatch = !filters.listing_type_id || tag.toLowerCase().includes(filters.listing_type_id.toLowerCase());

      const minMatch = !filters.min_price || price >= parseInt(filters.min_price);
      const maxMatch = !filters.max_price || price <= parseInt(filters.max_price);

      return locationMatch && keywordMatch && typeMatch && listingMatch && minMatch && maxMatch;
    });
  }
  toggleFavorite(property: any): void {
    property.isFavorited = !property.isFavorited;
    property.animateHeart = true;

    // Reset heart animation after 400ms
    setTimeout(() => {
      property.animateHeart = false;
    }, 400);
  }
}
