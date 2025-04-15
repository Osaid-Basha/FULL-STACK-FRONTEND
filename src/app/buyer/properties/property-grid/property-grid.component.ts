import { Component } from '@angular/core';

@Component({
  selector: 'app-property-grid',
  standalone: false,
  templateUrl: './property-grid.component.html',
  styleUrl: './property-grid.component.css'
})
export class PropertyGridComponent {
  properties = [
    {
      id: 1,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Rent',
      tagColor: 'white',
      tagTextColor: 'text-dark',
      price: '$31',
      period: '/night',
      title: 'Koh Samui, Thailand',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false
    },
    {
      id: 2,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$15,000',
      period: '/night',
      title: 'Belle Mare, Mauritius',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false
    },
    {
      id: 3,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$15,000',
      period: '/night',
      title: 'Balian Beach, Indonesia',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false
    },
    {
      id: 4,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$15,000',
      period: '/night',
      title: 'Balian Beach, Indonesia',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false
    },
    {
      id: 5,
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      tagColor: 'primary',
      tagTextColor: 'text-white',
      price: '$15,000',
      period: '/night',
      title: 'Balian Beach, Indonesia',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      size: '5x7 m²',
      isFavorited: false,
      animateHeart: false
    }
  ];

  toggleFavorite(property: any): void {
    property.isFavorited = !property.isFavorited;
    property.animateHeart = true;
    setTimeout(() => property.animateHeart = false, 400);
  }
}
