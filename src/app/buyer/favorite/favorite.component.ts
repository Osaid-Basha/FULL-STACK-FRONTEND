import {Component, OnInit} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {FavoriteService} from '../../services/favorite.service';


@Component({
  selector: 'app-favorite',
  standalone: false,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FavoriteComponent implements OnInit{
  // favorites = [
  //   {
  //     id: 101,
  //     image: 'assets/img/properties/01.jpg',
  //     type: 'For Rent',
  //     price: 31,
  //     period: 'night',
  //     title: 'Koh Samui, Thailand',
  //     address: '37 Ambleside Gardens, Ilford, IG4',
  //     beds: 3,
  //     baths: 3,
  //     area: '5x7 m²'
  //   },
  //   {
  //     id: 102,
  //     image: 'assets/img/properties/02.jpg',
  //     type: 'For Sale',
  //     price: 15000,
  //     period: 'night',
  //     title: 'Belle Mare, Mauritius',
  //     address: '37 Ambleside Gardens, Ilford, IG4',
  //     beds: 3,
  //     baths: 3,
  //     area: '5x7 m²'
  //   }
  //   // ... كمّل اللي بدك إياه
  // ];
  favorites: any[] = [];

  constructor(private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (response) => {
        this.favorites = response.data || response;  // خزن البيانات في favorites
      },
      error: (error) => {
        console.error('Failed to load favorites:', error);
      }
    });
  }

  removeFromFavorites(id: number) {
    this.favoriteService.deleteFavorite(id).subscribe(() => {
      // حذف العقار من المصفوفة محليًا بعد نجاح الحذف من السيرفر
      this.favorites = this.favorites.filter(item => item.id !== id);
    });
  }


}
