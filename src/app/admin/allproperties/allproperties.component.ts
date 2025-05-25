import { Component } from '@angular/core';
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
  title: string;
  location: string;
  price: number;
  date: string;
  views: number;
  status: string;
  image: string;
  address: string;
  city: string;
  propertyType: string;
  listingType: string;
  livingArea: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  constructionSize: number;
  landSize: number;
  shortDescription: string;
  longDescription: string;
  amenities: Amenities; // Use the Amenities interface
  images: any[]; // You might want to define a more specific type for images
}

@Component({
  selector: 'app-allproperties',
  standalone: true,
  templateUrl: './allproperties.component.html',
  styleUrls: ['./allproperties.component.css'],
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ]
})
export class AllpropertiesComponent {
  properties: Property[] = [ // Apply the Property interface to the array
    {
      title: 'Sunset Villa',
      location: 'Al-Masayef, Ramallah, PS',
      price: 185000,
      date: '21 Feb, 2023',
      views: 543,
      status: 'Sale',
      image: 'assets/01.jpg',
      address: 'Al-Nuzha Street',
      city: 'Ramallah',
      propertyType: 'Villa',
      listingType: 'For Sale',
      livingArea: 320,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      constructionSize: 350,
      landSize: 500,
      shortDescription: 'Beautiful villa with panoramic sunset view.',
      longDescription: 'A luxurious 4-bedroom villa located in a quiet neighborhood, perfect for families. Features a private garden, rooftop terrace, and modern interior design.',
      amenities: {
        garden: true,
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
      title: 'Modern Apartment',
      location: 'City Center, Nablus, PS',
      price: 95000,
      date: '5 Mar, 2023',
      views: 302,
      status: 'Rent',
      image: 'assets/01.jpg',
      address: 'Main Boulevard',
      city: 'Nablus',
      propertyType: 'Apartment',
      listingType: 'For Rent',
      livingArea: 120,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      constructionSize: 130,
      landSize: 0,
      shortDescription: 'Centrally located modern apartment.',
      longDescription: 'Fully furnished apartment with open living space, 2 bedrooms, and close access to public transport and shops.',
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
      title: 'Green Garden House',
      location: 'Beit Safafa, Jerusalem, PS',
      price: 230000,
      date: '10 Apr, 2023',
      views: 880,
      status: 'Sale',
      image: 'assets/01.jpg',
      address: 'Olive Street',
      city: 'Jerusalem',
      propertyType: 'House',
      listingType: 'For Sale',
      livingArea: 200,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      constructionSize: 220,
      landSize: 400,
      shortDescription: 'Family house with spacious garden.',
      longDescription: 'Located in a peaceful suburb, this house features a big green garden, updated kitchen, and solar panels.',
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
    {
      title: 'Luxury Penthouse',
      location: 'Rawabi, PS',
      price: 370000,
      date: '18 May, 2023',
      views: 1121,
      status: 'Sale',
      image: 'assets/01.jpg',
      address: 'Freedom Tower',
      city: 'Rawabi',
      propertyType: 'Penthouse',
      listingType: 'For Sale',
      livingArea: 250,
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      constructionSize: 270,
      landSize: 0,
      shortDescription: 'Top-floor penthouse with skyline view.',
      longDescription: 'Luxury penthouse with floor-to-ceiling windows, smart home system, and huge balcony overlooking the city.',
      amenities: {
        garden: false,
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
      title: 'Cozy Cottage',
      location: 'Deir Ballut, Salfit, PS',
      price: 67000,
      date: '1 Jun, 2023',
      views: 198,
      status: 'Sale',
      image: 'assets/01.jpg',
      address: 'Hilltop Lane',
      city: 'Salfit',
      propertyType: 'Cottage',
      listingType: 'For Sale',
      livingArea: 95,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      constructionSize: 100,
      landSize: 200,
      shortDescription: 'Charming cottage in a quiet village.',
      longDescription: 'A perfect countryside getaway with lovely views and cozy fireplace. Ideal for small families or couples.',
      amenities: {
        garden: true,
        securityCameras: false,
        laundry: false,
        internet: false,
        pool: false,
        videoSurveillance: false,
        laundryRoom: false,
        jacuzzi: false
      },
      images: []
    },
    {
      title: 'Beachside Studio',
      location: 'Gaza Marina, Gaza, PS',
      price: 42000,
      date: '11 Jul, 2023',
      views: 332,
      status: 'Rent',
      image: 'assets/01.jpg',
      address: 'Sea Road',
      city: 'Gaza',
      propertyType: 'Studio',
      listingType: 'For Rent',
      livingArea: 60,
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      constructionSize: 60,
      landSize: 0,
      shortDescription: 'Studio apartment with sea view.',
      longDescription: 'Open-plan studio just steps from the beach. Enjoy the fresh breeze and calm vibes.',
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
      title: 'Business Loft',
      location: 'Al-Tireh, Ramallah, PS',
      price: 155000,
      date: '9 Aug, 2023',
      views: 412,
      status: 'Sale',
      image: 'assets/01.jpg',
      address: 'Business Avenue',
      city: 'Ramallah',
      propertyType: 'Loft',
      listingType: 'For Sale',
      livingArea: 180,
      bedrooms: 2,
      bathrooms: 2,
      parking: 2,
      constructionSize: 190,
      landSize: 0,
      shortDescription: 'Modern loft for professionals.',
      longDescription: 'Perfect for business people or couples, this loft has high ceilings, sleek finishes, and a great location.',
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
    }
  ];

  // Initialize the allAmenities array using keyof Amenities for type safety
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

  // New properties for filtering
  filteredTitle: string = '';
  // Use a more specific type for selectedAmenities to ensure keys are valid amenity keys
  selectedAmenities: { [K in keyof Amenities]?: boolean } = {};

  currentPage = 1;
  itemsPerPage = 2;
  selectedProperty: (Property & { index?: number }) | null = null; // Add index for local tracking

  // Getter for filtered properties based on title and amenities
  get filteredProperties(): Property[] {
    return this.properties.filter(property => {
      // Filter by title (case-insensitive)
      const matchesTitle = property.title.toLowerCase().includes(this.filteredTitle.toLowerCase());

      // Filter by amenities: ensures property has ALL selected amenities
      const matchesAmenities = this.allAmenities.every(amenityKey => {
        // If an amenity checkbox is checked (selectedAmenities[amenityKey] is true)
        // AND the property's amenities object does NOT have that amenity set to true,
        // then it doesn't match, so return false.
        // Otherwise, it matches for this amenity, so return true.
        // Type assertion `as string` is technically not needed here due to `keyof Amenities`
        // but helps if `selectedAmenities` was typed more broadly.
        return !this.selectedAmenities[amenityKey] || property.amenities[amenityKey];
      });

      return matchesTitle && matchesAmenities;
    });
  }

  // Getter for properties displayed on the current page after filtering
  get displayedProperties(): Property[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProperties.slice(start, end);
  }

  // Getter for the total number of pages based on filtered properties
  get totalDisplayedPages(): number {
    return Math.ceil(this.filteredProperties.length / this.itemsPerPage);
  }

  // Change the current page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalDisplayedPages) {
      this.currentPage = page;
    }
  }

  // Delete a property with SweetAlert2 confirmation
  async deleteProperty(index: number): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ff6b6b',
      cancelButtonColor: '#6c757d',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    });

    if (result.isConfirmed) {
      // Get the actual property object from the currently displayed page
      const propertyToDelete = this.displayedProperties[index];
      // Find its index in the original 'properties' array
      const originalIndex = this.properties.indexOf(propertyToDelete);

      if (originalIndex > -1) {
        this.properties.splice(originalIndex, 1);
      }

      await Swal.fire({
        title: 'Deleted!',
        text: 'Property has been deleted successfully.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });

      // Adjust page if current page becomes empty after deletion
      if (this.displayedProperties.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }

  // Open the update form modal for a selected property
  openUpdateForm(property: Property, index: number): void {
    // We pass the property object itself to maintain its reference,
    // and add a temporary 'index' property for internal tracking
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.selectedProperty = { ...property, index: globalIndex };
  }

  // Update a property and close the modal
  async updateProperty(): Promise<void> {
    if (!this.selectedProperty) return; // Guard clause if selectedProperty is null

    // Destructure, ensuring updatedData is of type Property
    const { index, ...updatedData } = this.selectedProperty;

    // Find the original property in the main 'properties' array by title and location
    // This is safer than relying solely on 'index' if filtering/sorting changes positions
    const originalPropertyIndex = this.properties.findIndex(p =>
      p.title === updatedData.title && p.location === updatedData.location
    );

    if (originalPropertyIndex > -1) {
      // Update the original property with the new data
      this.properties[originalPropertyIndex] = updatedData as Property;
    } else {
      // Fallback: If for some reason the original property can't be found by title/location,
      // update using the passed 'index'. This is less robust but provides a fallback.
      if (typeof index === 'number' && index >= 0 && index < this.properties.length) {
        this.properties[index] = updatedData as Property;
      }
    }

    this.selectedProperty = null; // Close the modal

    await Swal.fire({
      title: 'Updated!',
      text: 'Property updated successfully.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }

  // Handle image selection for update form
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && this.selectedProperty) {
      this.selectedProperty.images = Array.from(input.files);
    }
  }

  protected readonly Math = Math; // Allow Math object to be used in template
  viewedProperty: (Property & { index?: number }) | null = null; // Property being viewed in modal

  // Open the view property modal
  viewProperty(property: Property, index: number): void {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.viewedProperty = { ...property, index: globalIndex };
  }

  // Helper function to get display name for an amenity key
  // Explicitly cast amenityKey to `string` within the switch statement
  getAmenityDisplayName(amenityKey: keyof Amenities): string {
    // Casting to `string` resolves the TS2322 error in switch cases.
    // We know `keyof Amenities` will only yield string literals here.
    switch (amenityKey as string) {
      case 'garden': return 'Garden';
      case 'securityCameras': return 'Security Cameras';
      case 'laundry': return 'Laundry';
      case 'internet': return 'Internet';
      case 'pool': return 'Pool';
      case 'videoSurveillance': return 'Video Surveillance';
      case 'laundryRoom': return 'Laundry Room';
      case 'jacuzzi': return 'Jacuzzi';
      default:
        // This default case should ideally not be reached because amenityKey is `keyof Amenities`
        // which means it can only be one of the defined keys.
        console.warn(`Unknown amenity key: ${amenityKey}`);
        return amenityKey as string; // Ensure return type is string
    }
  }

  // Reset all filters and return to the first page
  resetFilters(): void {
    this.filteredTitle = '';
    this.selectedAmenities = {}; // Clear all amenity selections
    this.currentPage = 1; // Go back to the first page
  }
}
