import { Component } from '@angular/core';

@Component({
  selector: 'app-related-properties',
  standalone: false,
  templateUrl: './related-properties.component.html',
  styleUrl: './related-properties.component.css'
})
export class RelatedPropertiesComponent {
  moreProperties = [
    {
      image: 'assets/img/properties/01.jpg',
      type: 'For Rent',
      price: '$31',
      priceUnit: '/night',
      location: 'Koh Samui, Thailand',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      link: 'property-details.html'
    },
    {
      image: 'assets/img/properties/02.jpg',
      type: 'For Sale',
      price: '$15,000',
      priceUnit: '/night',
      location: 'Belle Mare, Mauritius',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      link: 'property-details.html'
    },
    {
      image: 'assets/img/properties/03.jpg',
      type: 'For Sale',
      price: '$15,000',
      priceUnit: '/night',
      location: 'Balian Beach, Indonesia',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      link: 'property-details.html'
    },
    {
      image: 'assets/img/properties/04.jpg',
      type: 'For Rent',
      price: '$1,295,000',
      priceUnit: '/ year',
      location: 'Pantai Nyanyi, Indonesia',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      link: 'property-details.html'
    }
  ];

}
