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


removeFromFavorites(propertyId: number) {
    this.favoriteService.deleteFavorite(propertyId).subscribe(() => {
      this.favorites = this.favorites.filter(fav => fav.property_id !== propertyId);
    });
  }


}
