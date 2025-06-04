import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-property-gallery',
  standalone: false,
  templateUrl: './property-gallery.component.html',
  styleUrl: './property-gallery.component.css'
})
export class PropertyGalleryComponent {
  @Input() property: any;

  get galleryImages(): string[] {
    return this.property?.galleryImages || [
      'assets/img/property-details/01.jpg',
      'assets/img/property-details/02.jpg',
      'assets/img/property-details/03.jpg'
    ];
  }

  get videoUrl(): string {

    return this.property?.VideoUrl || ''
    'http://www.youtube.com/watch?v=0O2aH4XLbto';

  }
}
