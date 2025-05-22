import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-profail-buyer',
  standalone: false,
  templateUrl: './profail-buyer.component.html',
  styleUrl: './profail-buyer.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfailBuyerComponent {
  profileImage: string | null = 'assets/371225.jpg';// Initial image path

  // Method to remove the image
  removeImage(): void {
    this.profileImage = null; // Set the image source to null
  }

}
