import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  favorites = [
    {
      id: 101,
      image: 'assets/img/properties/01.jpg',
      type: 'For Rent',
      price: 31,
      period: 'night',
      title: 'Koh Samui, Thailand',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      area: '5x7 m²'
    },
    {
      id: 102,
      image: 'assets/img/properties/02.jpg',
      type: 'For Sale',
      price: 15000,
      period: 'night',
      title: 'Belle Mare, Mauritius',
      address: '37 Ambleside Gardens, Ilford, IG4',
      beds: 3,
      baths: 3,
      area: '5x7 m²'
    }
    // ... كمّل اللي بدك إياه
  ];

  removeFromFavorites(id: number) {
    this.favorites = this.favorites.filter(item => item.id !== id);
  }
}
