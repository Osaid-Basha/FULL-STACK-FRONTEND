import { Component } from '@angular/core';

@Component({
  selector: 'app-property-grid',
  standalone: false,
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css'] // انتبه انها styleUrls وليس styleUrl
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
      animateHeart: false,
      description: 'Modern apartment with beach view.'
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
      animateHeart: false,
      description: 'Beautiful property near the sea.'
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
      animateHeart: false,
      description: 'Peaceful area with modern finish.'
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
      animateHeart: false,
      description: 'Close to schools and shops.'
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
      animateHeart: false,
      description: 'Perfect for small families.'
    }
  ];

  toggleFavorite(property: any): void {
    property.isFavorited = !property.isFavorited;
    property.animateHeart = true;

    // Reset heart animation after 400ms
    setTimeout(() => {
      property.animateHeart = false;
    }, 400);
  }
}
