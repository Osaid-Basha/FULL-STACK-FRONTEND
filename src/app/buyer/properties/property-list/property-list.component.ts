import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  standalone: false,
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent {
  properties = [
    {
      id: 1,
      title: 'Entire villa hosted by Wayan',
      price: 17966,
      period: 'month',
      image: 'assets/img/properties/01.jpg',
      tag: 'For Sale',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      bedrooms: 3,
      bathrooms: 3,
      size: '620 sqft',
      isFavorited: false
    },
    {
      id: 2,
      title: 'Tampaksiring, Indonesia',
      price: 19953,
      period: 'month',
      image: 'assets/img/properties/02.jpg',
      tag: 'For Sale',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      bedrooms: 3,
      bathrooms: 3,
      size: '620 sqft',
      isFavorited: false
    },
    {
      id: 3,
      title: 'Pantai Nyanyi, Indonesia',
      price: 19953,
      period: 'month',
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      bedrooms: 3,
      bathrooms: 3,
      size: '620 sqft',
      isFavorited: false
    },
    {
      id: 4,
      title: 'Pantai Nyanyi, Indonesia',
      price: 19953,
      period: 'month',
      image: 'assets/img/properties/03.jpg',
      tag: 'For Sale',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
      bedrooms: 3,
      bathrooms: 3,
      size: '620 sqft',
      isFavorited: false
    }
  ];

  toggleFavorite(event: MouseEvent, property: any): void {
    event.stopPropagation(); // حتى ما يفتح رابط البطاقة
    property.isFavorited = !property.isFavorited;
  }
}
