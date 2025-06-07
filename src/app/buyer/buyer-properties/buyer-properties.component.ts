import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { PurchaseService } from '../../services/purchase.service';
import {RouterLink} from '@angular/router';


interface Amenities {
  garden: boolean;
  securityCameras: boolean;
  laundry: boolean;
  internet: boolean;
  pool: boolean;
  videoSurveillance: boolean;
  laundryRoom: boolean;
  jacuzzi: boolean;
  [key: string]: boolean;
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  date: string;
  views: number;
  status: 'Bought' | 'Rented' | 'Currently Rented' | 'Pending Offer';
  image: string;
  address: string;
  city: string;
  propertyType: string;
  listingType: 'For Sale' | 'For Rent';
  livingArea: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  constructionSize: number;
  landSize: number;
  shortDescription: string;
  longDescription: string;
  amenities: Amenities;
  images: string[];
  endDate?: string;
  buying_id: number;

}

@Component({
  selector: 'app-buyer-properties',
  templateUrl: './buyer-properties.component.html',
  styleUrls: ['./buyer-properties.component.css'],
  standalone: false,


})
export class BuyerPropertiesComponent implements OnInit {
  allBuyerProperties: Property[] = [];

  allAmenities: (keyof Amenities)[] = [
    'garden', 'securityCameras', 'laundry', 'internet',
    'pool', 'videoSurveillance', 'laundryRoom', 'jacuzzi'
  ];

  currentFilteredTitle = '';
  currentSelectedAmenities: { [K in keyof Amenities]?: boolean } = {};
  currentPropertiesPage = 1;
  currentItemsPerPage = 3;

  previousFilteredTitle = '';
  previousSelectedAmenities: { [K in keyof Amenities]?: boolean } = {};
  previousPropertiesPage = 1;
  previousItemsPerPage = 3;

  selectedProperty: (Property & { type?: 'current' | 'previous' }) | null = null;
  viewedProperty: (Property & { type?: 'current' | 'previous' }) | null = null;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {

    this.allAmenities.forEach(amenity => {
      this.currentSelectedAmenities[amenity] = false;
      this.previousSelectedAmenities[amenity] = false;
    });

    this.loadBuyerProperties();
  }

loadBuyerProperties(): void {
  this.purchaseService.getMyNegotiations().subscribe({
    next: (response) => {
      console.log('✅ API response:', response);

      const offers = response.my_sent_offers || [];

     this.allBuyerProperties = offers.map((offer: any) => {
  const property = offer.property || {};
  const offerStatus = offer.status;

  let mappedStatus: Property['status'] = 'Pending Offer';
  if (offerStatus === 'accepted') mappedStatus = 'Currently Rented';
  else if (offerStatus === 'rejected') mappedStatus = 'Rented';

  return {
    id: property.id,
    buying_id: offer.id,  // ⭐ أضف هذا السطر
    title: property.title || 'Untitled Property',
    address: property.address || '',
    city: property.city || '',
    location: `${property.address || ''}, ${property.city || ''}`,
    price: parseFloat(offer.proposed_price) || parseFloat(property.price) || 0,
    date: offer.created_at || '',
    status: mappedStatus,
    views: 0,
    image: 'assets/placeholder.jpg',
    propertyType: property.property_type_id || 'N/A',
    listingType: property.listing_type || 'For Sale',
    livingArea: property.livingArea || 0,
    bedrooms: property.bedroom || 0,
    bathrooms: property.bathroom || 0,
    parking: property.parking || 0,
    constructionSize: property.constructionArea || 0,
    landSize: property.landArea || 0,
    shortDescription: property.shortDescreption || '',
    longDescription: property.longDescreption || '',
    amenities: {
      garden: false,
      securityCameras: false,
      laundry: false,
      internet: false,
      pool: false,
      videoSurveillance: false,
      laundryRoom: false,
      jacuzzi: false
    },
    images: [],
  };
});
    },

    error: (err) => {
      console.error('❌ Failed to fetch offers:', err);
    }
  });
}



openReviewForm(property: Property): void {
  Swal.fire({
    title: '<div style="display:flex;align-items:center;gap:8px;"><i class="bi bi-stars" style="color:#f59e0b;font-size:1.5rem;"></i> <span style="font-size:1.4rem;font-weight:600;color:#333;">Leave Your Review</span></div>',
    html: `
      <style>
        .star-rating i {
          font-size: 2rem;
          color: #ccc;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .star-rating i.active {
          color: #facc15;
        }
        .swal2-input, .swal2-textarea {
          border-radius: 12px;
          padding: 10px;
          font-family: 'Segoe UI';
        }
      </style>

      <input id="swal-title" class="swal2-input" placeholder="e.g. Amazing experience!">
      <textarea id="swal-content" class="swal2-textarea" placeholder="Write your feedback..." rows="4"></textarea>

      <label style="display:block;font-weight:600;margin:10px 0 6px;">Your Rating:</label>
      <div id="swal-stars" class="star-rating">
        ${[1,2,3,4,5].map(i => `<i class="bi bi-star-fill" data-value="${i}"></i>`).join('')}
      </div>
      <input type="hidden" id="swal-rating" value="0">
    `,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'rounded-5 shadow-lg border-0',
      confirmButton: 'btn btn-warning px-5 rounded-pill fw-bold',
      cancelButton: 'btn btn-secondary px-4 rounded-pill'
    },
    didOpen: () => {
      const stars = document.querySelectorAll('#swal-stars i');
      stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
          const val = parseInt(star.getAttribute('data-value')!);
          stars.forEach((s, i) => {
            s.classList.toggle('active', i < val);
          });
        });

        star.addEventListener('click', () => {
          const val = parseInt(star.getAttribute('data-value')!);
          (document.getElementById('swal-rating') as HTMLInputElement).value = val.toString();
          stars.forEach((s, i) => {
            s.classList.toggle('active', i < val);
          });
        });
      });
    },
    preConfirm: () => {
      const title = (document.getElementById('swal-title') as HTMLInputElement).value.trim();
      const content = (document.getElementById('swal-content') as HTMLTextAreaElement).value.trim();
      const rating = parseInt((document.getElementById('swal-rating') as HTMLInputElement).value, 10);

      if (!title || !content || rating < 1 || rating > 5) {
        Swal.showValidationMessage('Please enter a title, comment, and select a rating.');
        return;
      }

      return { title, content, rating };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const reviewData = {
        title: result.value.title,
        content: result.value.content,
        rating: result.value.rating,
        buying_id: property.buying_id

      };

      this.purchaseService.submitReview(reviewData).subscribe({
        next: () => Swal.fire('✅ Done!', 'Thanks for your review.', 'success'),
        error: () => Swal.fire('❌ Failed', 'Something went wrong.', 'error')
      });
    }
  });
}







 get currentProperties(): Property[] {
  return this.allBuyerProperties.filter(p => p.status === 'Currently Rented');
}


  get filteredCurrentProperties(): Property[] {
    return this.currentProperties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.currentFilteredTitle.toLowerCase());
      const matchesAmenities = this.allAmenities.every(amenity =>
        !this.currentSelectedAmenities[amenity] || property.amenities[amenity]
      );
      return matchesTitle && matchesAmenities;
    });
  }

  get displayedCurrentProperties(): Property[] {
    const start = (this.currentPropertiesPage - 1) * this.currentItemsPerPage;
    return this.filteredCurrentProperties.slice(start, start + this.currentItemsPerPage);
  }

  get totalCurrentPages(): number {
    return Math.ceil(this.filteredCurrentProperties.length / this.currentItemsPerPage);
  }

  get previousProperties(): Property[] {
  return this.allBuyerProperties.filter(p => p.status === 'Pending Offer');
}



  get filteredPreviousProperties(): Property[] {
    return this.previousProperties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.previousFilteredTitle.toLowerCase());
      const matchesAmenities = this.allAmenities.every(amenity =>
        !this.previousSelectedAmenities[amenity] || property.amenities[amenity]
      );
      return matchesTitle && matchesAmenities;
    });
  }

  get displayedPreviousProperties(): Property[] {
    const start = (this.previousPropertiesPage - 1) * this.previousItemsPerPage;
    return this.filteredPreviousProperties.slice(start, start + this.previousItemsPerPage);
  }

  get totalPreviousPages(): number {
    return Math.ceil(this.filteredPreviousProperties.length / this.previousItemsPerPage);
  }

  changeCurrentPage(page: number): void {
    if (page >= 1 && page <= this.totalCurrentPages) this.currentPropertiesPage = page;
  }

  changePreviousPage(page: number): void {
    if (page >= 1 && page <= this.totalPreviousPages) this.previousPropertiesPage = page;
  }

  async releaseProperty(property: Property): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will mark the property as no longer currently rented.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const prop = this.allBuyerProperties.find(p => p.id === property.id);
      if (prop) {
        prop.status = 'Rented';
        prop.endDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        });
      }

      await Swal.fire('Released!', 'Property has been moved to previous rentals.', 'success');
      if (this.displayedCurrentProperties.length === 0 && this.currentPropertiesPage > 1) {
        this.currentPropertiesPage--;
      }
    }
  }

  openBuyerActionForm(property: Property, type: 'current' | 'previous'): void {
    this.selectedProperty = { ...property, type };
    Swal.fire('Action', 'Here you can add functionality like "Extend Rental" or "Leave Feedback".', 'info');
    this.selectedProperty = null;
  }

  viewProperty(property: Property, type: 'current' | 'previous'): void {
    this.viewedProperty = { ...property, type };
  }

  getAmenityDisplayName(amenity: keyof Amenities): string {
    const names: { [K in keyof Amenities]: string } = {
      garden: 'Garden',
      securityCameras: 'Security Cameras',
      laundry: 'Laundry',
      internet: 'Internet',
      pool: 'Pool',
      videoSurveillance: 'Video Surveillance',
      laundryRoom: 'Laundry Room',
      jacuzzi: 'Jacuzzi'
    };
    return names[amenity] ?? amenity;
  }

  resetCurrentFilters(): void {
    this.currentFilteredTitle = '';
    this.allAmenities.forEach(a => this.currentSelectedAmenities[a] = false);
    this.currentPropertiesPage = 1;
  }

  resetPreviousFilters(): void {
    this.previousFilteredTitle = '';
    this.allAmenities.forEach(a => this.previousSelectedAmenities[a] = false);
    this.previousPropertiesPage = 1;
  }

  protected readonly Math = Math;
}


