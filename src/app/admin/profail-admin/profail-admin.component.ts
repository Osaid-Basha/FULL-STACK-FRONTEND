import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-profail-admin',
  standalone: false,
  templateUrl: './profail-admin.component.html',
  styleUrl: './profail-admin.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfailAdminComponent {
  profileImage: string | null = 'assets/371225.jpg';// Initial image path

  // Method to remove the image
  removeImage(): void {
    this.profileImage = null; // Set the image source to null
  }
}
