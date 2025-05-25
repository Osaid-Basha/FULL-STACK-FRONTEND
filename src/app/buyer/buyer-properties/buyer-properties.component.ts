import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

// Define the Amenities interface with an index signature
interface Amenities {
  garden: boolean;
  securityCameras: boolean;
  laundry: boolean;
  internet: boolean;
  pool: boolean;
  videoSurveillance: boolean;
  laundryRoom: boolean;
  jacuzzi: boolean;
  [key: string]: boolean; // Allows indexing with a string
}

// Define the Property interface for better type checking
interface Property {
  id: number; // Added for easier identification
  title: string;
  location: string;
  price: number;
  date: string; // Date of transaction (purchase/rent start)
  views: number; // Could represent times visited or listed
  status: 'Bought' | 'Rented' | 'Currently Rented'; // Status specific to buyer
  image: string;
  address: string;
  city: string;
  propertyType: string;
  listingType: 'For Sale' | 'For Rent'; // Original listing type
  livingArea: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  constructionSize: number;
  landSize: number;
  shortDescription: string;
  longDescription: string;
  amenities: Amenities; // Use the Amenities interface
  images: string[]; // Assuming image paths
  endDate?: string; // For rented properties, when the rent ended
}

@Component({
  selector: 'app-buyer-properties',
  standalone: true,
  templateUrl: './buyer-properties.component.html',
  styleUrls: ['./buyer-properties.component.css'],
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ]
})
export class BuyerPropertiesComponent implements OnInit {

  // Sample data for buyer's properties
  allBuyerProperties: Property[] = [
    // Current Rented Properties
    {
      id: 101,
      title: 'Modern Apartment - City View',
      location: 'Ramallah, PS',
      price: 700, // Monthly Rent
      date: '1 Jan, 2024',
      views: 120,
      status: 'Currently Rented',
      image: 'assets/01.jpg',
      address: 'Al-Irsal Street',
      city: 'Ramallah',
      propertyType: 'Apartment',
      listingType: 'For Rent',
      livingArea: 100,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      constructionSize: 110,
      landSize: 0,
      shortDescription: 'Spacious apartment with a great city view.',
      longDescription: 'Enjoy modern living in this beautifully furnished apartment, ideal for small families or professionals. Close to amenities and public transport.',
      amenities: {
        garden: false,
        securityCameras: true,
        laundry: true,
        internet: true,
        pool: false,
        videoSurveillance: true,
        laundryRoom: true,
        jacuzzi: false
      },
      images: []
    },
    {
      id: 102,
      title: 'Commercial Office Space',
      location: 'Nablus, PS',
      price: 1200, // Monthly Rent
      date: '1 Mar, 2023',
      views: 80,
      status: 'Currently Rented',
      image: 'assets/01.jpg',
      address: 'Main Commercial Road',
      city: 'Nablus',
      propertyType: 'Office',
      listingType: 'For Rent',
      livingArea: 150,
      bedrooms: 0,
      bathrooms: 1,
      parking: 2,
      constructionSize: 160,
      landSize: 0,
      shortDescription: 'Prime office location in the city center.',
      longDescription: 'Fully equipped office space suitable for startups or small businesses. High-speed internet and secure building.',
      amenities: {
        garden: false,
        securityCameras: true,
        laundry: false,
        internet: true,
        pool: false,
        videoSurveillance: true,
        laundryRoom: false,
        jacuzzi: false
      },
      images: []
    },
    // Bought Properties
    {
      id: 201,
      title: 'Luxury Villa - Rawabi',
      location: 'Rawabi, PS',
      price: 350000,
      date: '15 Nov, 2022',
      views: 250,
      status: 'Bought',
      image: 'assets/01.jpg',
      address: 'Elite Residences',
      city: 'Rawabi',
      propertyType: 'Villa',
      listingType: 'For Sale',
      livingArea: 400,
      bedrooms: 5,
      bathrooms: 4,
      parking: 3,
      constructionSize: 450,
      landSize: 600,
      shortDescription: 'Exclusive villa with panoramic views and luxury amenities.',
      longDescription: 'A dream home in Rawabi, offering spacious living areas, a private pool, and advanced smart home features.',
      amenities: {
        garden: true,
        securityCameras: true,
        laundry: true,
        internet: true,
        pool: true,
        videoSurveillance: true,
        laundryRoom: true,
        jacuzzi: true
      },
      images: []
    },
    {
      id: 202,
      title: 'Family House - Jerusalem Suburb',
      location: 'Beit Hanina, Jerusalem, PS',
      price: 280000,
      date: '10 Aug, 2021',
      views: 180,
      status: 'Bought',
      image: 'assets/01.jpg',
      address: 'Green Valley Street',
      city: 'Jerusalem',
      propertyType: 'House',
      listingType: 'For Sale',
      livingArea: 220,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      constructionSize: 240,
      landSize: 500,
      shortDescription: 'Comfortable family house with a large garden.',
      longDescription: 'Perfect home for growing families, featuring a spacious backyard, modern kitchen, and easy access to schools and parks.',
      amenities: {
        garden: true,
        securityCameras: false,
        laundry: true,
        internet: true,
        pool: false,
        videoSurveillance: false,
        laundryRoom: true,
        jacuzzi: false
      },
      images: []
    },
    // Previously Rented Properties
    {
      id: 301,
      title: 'Student Studio - Birzeit',
      location: 'Birzeit, PS',
      price: 350, // Monthly Rent
      date: '1 Sep, 2020',
      endDate: '30 May, 2022', // End date of rent
      views: 50,
      status: 'Rented',
      image: 'assets/01.jpg',
      address: 'University Road',
      city: 'Birzeit',
      propertyType: 'Studio',
      listingType: 'For Rent',
      livingArea: 40,
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      constructionSize: 45,
      landSize: 0,
      shortDescription: 'Compact studio ideal for university students.',
      longDescription: 'Furnished studio within walking distance to Birzeit University. Includes basic amenities.',
      amenities: {
        garden: false,
        securityCameras: false,
        laundry: true,
        internet: true,
        pool: false,
        videoSurveillance: false,
        laundryRoom: false,
        jacuzzi: false
      },
      images: []
    },
    {
      id: 302,
      title: 'Holiday Chalet - Jericho',
      location: 'Jericho, PS',
      price: 500, // Weekly Rent
      date: '1 Jul, 2023',
      endDate: '31 Aug, 2023', // End date of rent
      views: 70,
      status: 'Rented',
      image: 'assets/01.jpg',
      address: 'Desert Oasis Lane',
      city: 'Jericho',
      propertyType: 'Chalet',
      listingType: 'For Rent',
      livingArea: 90,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      constructionSize: 100,
      landSize: 200,
      shortDescription: 'Relaxing chalet for summer holidays near Jericho.',
      longDescription: 'Escape the city to this cozy chalet with a small private pool and outdoor seating, perfect for a peaceful getaway.',
      amenities: {
        garden: true,
        securityCameras: false,
        laundry: true,
        internet: true,
        pool: true,
        videoSurveillance: false,
        laundryRoom: false,
        jacuzzi: false
      },
      images: []
    }
  ];

  // Amenities list for filtering and display
  allAmenities: (keyof Amenities)[] = [
    'garden',
    'securityCameras',
    'laundry',
    'internet',
    'pool',
    'videoSurveillance',
    'laundryRoom',
    'jacuzzi'
  ];

  // Filtering state for Current Properties
  currentFilteredTitle: string = '';
  currentSelectedAmenities: { [K in keyof Amenities]?: boolean } = {};
  currentPropertiesPage = 1;
  currentItemsPerPage = 3;

  // Filtering state for Previous Properties
  previousFilteredTitle: string = '';
  previousSelectedAmenities: { [K in keyof Amenities]?: boolean } = {};
  previousPropertiesPage = 1;
  previousItemsPerPage = 3;

  selectedProperty: (Property & { globalIndex?: number; type?: 'current' | 'previous' }) | null = null;
  viewedProperty: (Property & { globalIndex?: number; type?: 'current' | 'previous' }) | null = null;

  ngOnInit(): void {
    // Initialize selectedAmenities for both current and previous filters
    this.allAmenities.forEach(amenity => {
      this.currentSelectedAmenities[amenity] = false;
      this.previousSelectedAmenities[amenity] = false;
    });
  }

  // --- Getters for Current Properties ---
  get currentProperties(): Property[] {
    return this.allBuyerProperties.filter(p => p.status === 'Currently Rented');
  }

  get filteredCurrentProperties(): Property[] {
    return this.currentProperties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.currentFilteredTitle.toLowerCase());
      const matchesAmenities = this.allAmenities.every(amenityKey => {
        return !this.currentSelectedAmenities[amenityKey] || property.amenities[amenityKey];
      });
      return matchesTitle && matchesAmenities;
    });
  }

  get displayedCurrentProperties(): Property[] {
    const start = (this.currentPropertiesPage - 1) * this.currentItemsPerPage;
    const end = start + this.currentItemsPerPage;
    return this.filteredCurrentProperties.slice(start, end);
  }

  get totalCurrentPages(): number {
    return Math.ceil(this.filteredCurrentProperties.length / this.currentItemsPerPage);
  }

  // --- Getters for Previous Properties ---
  get previousProperties(): Property[] {
    return this.allBuyerProperties.filter(p => p.status === 'Bought' || p.status === 'Rented');
  }

  get filteredPreviousProperties(): Property[] {
    return this.previousProperties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.previousFilteredTitle.toLowerCase());
      const matchesAmenities = this.allAmenities.every(amenityKey => {
        return !this.previousSelectedAmenities[amenityKey] || property.amenities[amenityKey];
      });
      return matchesTitle && matchesAmenities;
    });
  }

  get displayedPreviousProperties(): Property[] {
    const start = (this.previousPropertiesPage - 1) * this.previousItemsPerPage;
    const end = start + this.previousItemsPerPage;
    return this.filteredPreviousProperties.slice(start, end);
  }

  get totalPreviousPages(): number {
    return Math.ceil(this.filteredPreviousProperties.length / this.previousItemsPerPage);
  }

  // --- Pagination Logic ---
  changeCurrentPage(page: number): void {
    if (page >= 1 && page <= this.totalCurrentPages) {
      this.currentPropertiesPage = page;
    }
  }

  changePreviousPage(page: number): void {
    if (page >= 1 && page <= this.totalPreviousPages) {
      this.previousPropertiesPage = page;
    }
  }

  // --- Action Buttons Logic (Simplified for Buyer) ---
  // A buyer might not 'delete' or 'update' properties in the same way an agent does.
  // These are placeholders for potential future actions or just view/release.

  async releaseProperty(property: Property): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will mark the property as no longer currently rented.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, release it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#6c757d',
      showClass: { popup: 'animate__animated animate__zoomIn' },
      hideClass: { popup: 'animate__animated animate__zoomOut' }
    });

    if (result.isConfirmed) {
      const propToUpdate = this.allBuyerProperties.find(p => p.id === property.id);
      if (propToUpdate) {
        propToUpdate.status = 'Rented'; // Change status to 'Rented' (previous)
        propToUpdate.endDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); // Set end date
      }

      await Swal.fire({
        title: 'Released!',
        text: 'Property has been moved to previous rentals.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' }
      });
      // Reset page if current page becomes empty after action
      if (this.displayedCurrentProperties.length === 0 && this.currentPropertiesPage > 1) {
        this.currentPropertiesPage--;
      }
    }
  }

  // This might open a form to provide feedback or extend rental
  openBuyerActionForm(property: Property, type: 'current' | 'previous'): void {
    this.selectedProperty = { ...property, type: type };
    // In a real app, you'd populate a form here
    Swal.fire('Action for ' + property.title, 'Here you can add functionality like "Extend Rental" or "Leave Feedback".', 'info');
    this.selectedProperty = null; // Close immediately for this example
  }

  // This is a placeholder for actual viewing logic
  viewProperty(property: Property, type: 'current' | 'previous'): void {
    this.viewedProperty = { ...property, type: type };
  }

  // Helper function to get display name for an amenity key
  getAmenityDisplayName(amenityKey: keyof Amenities): string {
    switch (amenityKey as string) {
      case 'garden': return 'Garden';
      case 'securityCameras': return 'Security Cameras';
      case 'laundry': return 'Laundry';
      case 'internet': return 'Internet';
      case 'pool': return 'Pool';
      case 'videoSurveillance': return 'Video Surveillance';
      case 'laundryRoom': return 'Laundry Room';
      case 'jacuzzi': return 'Jacuzzi';
      default: return amenityKey as string;
    }
  }

  // Reset filters for Current Properties
  resetCurrentFilters(): void {
    this.currentFilteredTitle = '';
    this.allAmenities.forEach(amenity => {
      this.currentSelectedAmenities[amenity] = false;
    });
    this.currentPropertiesPage = 1;
  }

  // Reset filters for Previous Properties
  resetPreviousFilters(): void {
    this.previousFilteredTitle = '';
    this.allAmenities.forEach(amenity => {
      this.previousSelectedAmenities[amenity] = false;
    });
    this.previousPropertiesPage = 1;
  }

  protected readonly Math = Math;
}
