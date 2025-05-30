import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { PropertyService } from '../../services/property.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // استيراد DomSanitizer

// تعريف واجهة لكائن الصورة الذي سيتم تخزينه مؤقتًا
interface TempImage {
  file: File;
  previewUrl: SafeUrl; // URL آمنة للعرض
}

// Define the Amenity interface for what we expect from the backend
interface Amenity {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-property',
  standalone: false,
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],

  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        animate('0.9s ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateY(10px)', offset: 0.7 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class AddPropertyComponent implements OnInit {
  newProperty: any = {
    title: '',
    address: '',
    city: '',
    property_type_id: null,
    property_listing_id: null,
    price: null,
    landArea: null,
    bedroom: null,
    bathroom: null,
    parking: null,
    constructionArea: null,
    livingArea: null,
    shortDescreption: '',
    longDescreption: '',
    purchase_id: 1
  };

  selectedAmenities: number[] = [];
  selectedImages: TempImage[] = [];

  allAmenities: Amenity[] = [
    { id: 1, name: 'Garden' },
    { id: 2, name: 'Security Cameras' },
    { id: 3, name: 'Laundry' },
    { id: 4, name: 'Internet' },
    { id: 5, name: 'Pool' },
    { id: 6, name: 'Video Surveillance' },
    { id: 7, name: 'Laundry Room' },
    { id: 8, name: 'Jacuzzi' }
  ];

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  onAmenityChange(amenityId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedAmenities.push(amenityId);
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(id => id !== amenityId);
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = [];
      Array.from(input.files).forEach(file => {
        const previewUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        this.selectedImages.push({ file, previewUrl });
      });
    }
  }

  async submitProperty(): Promise<void> {
    if (!this.newProperty.title || !this.newProperty.address || !this.newProperty.city || !this.selectedImages.length) {
      await Swal.fire('Error', 'Please fill all required fields and upload at least one image.', 'error');
      return;
    }

    const formData = new FormData();

    for (const key in this.newProperty) {
      if (this.newProperty.hasOwnProperty(key) && this.newProperty[key] !== null) {
        formData.append(key, this.newProperty[key].toString());
      }
    }

    this.selectedAmenities.forEach(amenityId => {
      formData.append('amenities[]', amenityId.toString());
    });

    this.selectedImages.forEach(tempImage => {
      formData.append('images[]', tempImage.file);
    });

    this.propertyService.addProperty(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Property added successfully and submitted for approval.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        this.resetForm();
      },
      error: (err) => {
        console.error('Error adding property:', err);
        Swal.fire('Error', 'Failed to add property. ' + (err.error?.message || 'Please try again.'), 'error');
      }
    });
  }

  resetForm(): void {
    this.newProperty = {
      title: '', address: '', city: '', property_type_id: null,
      property_listing_id: null, price: null, landArea: null, bedroom: null,
      bathroom: null, parking: null, constructionArea: null, livingArea: null,
      shortDescreption: '', longDescreption: '', purchase_id: 1
    };
    this.selectedAmenities = [];
    this.selectedImages = [];
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
