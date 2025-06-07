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
  status: 'Bought' | 'Rented' | 'Currently Rented';
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
}

@Component({
  selector: 'app-buyer-properties',
  templateUrl: './buyer-properties.component.html',
  styleUrls: ['./buyer-properties.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    FormsModule
  ],

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
    this.purchaseService.getAllPurchases().subscribe({
      next: (response) => {
        console.log('✅ API response:', response);
        // تأكد إن البيانات موجودة في response.purchases أو حسب هيكلية API
        this.allBuyerProperties = Array.isArray(response) ? response : response.purchases || [];
      },
      error: (err) => {
        console.error('❌ Failed to fetch purchases:', err);
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
    return this.allBuyerProperties.filter(p => p.status === 'Bought' || p.status === 'Rented');
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


