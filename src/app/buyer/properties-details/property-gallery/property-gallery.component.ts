import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.component.html',
  styleUrls: ['./property-gallery.component.css']
})
export class PropertyGalleryComponent implements OnChanges {
  @Input() property: any;

  galleryImages: string[] = [];
  videoUrl: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.prepareGallery();
    }
  }

  prepareGallery(): void {
    const images = this.property?.images ?? [];

    this.galleryImages = images.map((img: any) =>
      img.imageUrl
        ? `http://localhost:8000/storage/${img.imageUrl}`
        : 'assets/img/no-image.jpg'
    );

    this.videoUrl = this.property?.videoUrl || null;
  }
}
