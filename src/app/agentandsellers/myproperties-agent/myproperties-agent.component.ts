import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { PropertyService } from '../../services/property.service';

// Define the Amenity interface for what we expect from the backend
interface Amenity {
  id: number;
  name: string;
}

// Define the PropertyImage interface for image objects
interface PropertyImage {
  id?: number;
  imageUrl: string;
  property_id?: number;
}

// Define the Property interface for better type checking
interface Property {
  id: number; // Add ID as it's crucial for backend operations
  title: string;
  address: string;
  city: string;
  landArea: number;
  price: number;
  bedroom: number;
  bathroom: number;
  parking: number;
  longDescreption: string;
  shortDescreption: string;
  constructionArea: number;
  livingArea: number;
  property_listing_id: number; // Changed to ID
  property_type_id: number;     // Changed to ID
  purchase_id: number;          // Added purchase_id as per backend
  user_id: number; // Add user_id
  images: PropertyImage[]; // Array of image objects
  amenities: Amenity[]; // Array of amenity objects

  // Properties used for display in the table, derived from backend data
  location?: string; // Derived from address, city
  date?: string;     // Placeholder for date
  views?: number;    // Placeholder for views
  status?: string;   // Derived from property_listing_id
  image?: string; // The "main" image for display
  propertyType?: string; // Derived from property_type_id
  listingType?: string; // Derived from property_listing_id
  constructionSize?: number; // Renamed for display consistency
  landSize?: number;         // Renamed for display consistency
  bedrooms?: number;         // Renamed for display consistency
  bathrooms?: number;        // Renamed for display consistency
}

@Component({
  selector: 'app-myproperties-agent',
  standalone: false,
  templateUrl: './myproperties-agent.component.html',
  styleUrls: ['./myproperties-agent.component.css'],

})
export class MypropertiesAgentComponent implements OnInit {
  properties: Property[] = [];

  // All possible amenities with their IDs
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

  // Helper maps for display values
  propertyTypeMap: { [key: number]: string } = {
    1: 'Apartment',
    2: 'House',
    3: 'Office'
  };

  listingTypeMap: { [key: number]: string } = {
    1: 'Rent',
    2: 'Sale'
  };

  filteredTitle: string = '';
  selectedAmenityIds: number[] = []; // Store selected amenity IDs

  currentPage = 1;
  itemsPerPage = 2;
  selectedProperty: Property | null = null;
  viewedProperty: Property | null = null;
  newImages: File[] = []; // For new images to be uploaded on update

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getAllAgentProperties();
  }

  // Method to fetch all properties
  getAllAgentProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data: Property[]) => {
        // Map backend data to frontend display model
        this.properties = data.map(prop => ({
          ...prop,
          location: `${prop.address}, ${prop.city}`,
          date: new Date().toLocaleDateString(), // Placeholder: Use actual date from backend if available
          views: Math.floor(Math.random() * 1000), // Placeholder: Use actual views from backend if available
          status: this.listingTypeMap[prop.property_listing_id],
          // Ensure image path is correct, assuming 'property_images' is the folder name in public storage
          image: prop.images && prop.images.length > 0 ? `http://127.0.0.1:8000/storage/${prop.images[0].imageUrl}` : 'assets/placeholder.jpg', // Use first image or a local default
          propertyType: this.propertyTypeMap[prop.property_type_id],
          listingType: this.listingTypeMap[prop.property_listing_id],
          constructionSize: prop.constructionArea,
          landSize: prop.landArea,
          bedrooms: prop.bedroom,
          bathrooms: prop.bathroom,
          // Ensure amenities array is initialized for display
          amenities: prop.amenities || []
        }));
        console.log("Mapped Properties:", this.properties);
      },
      error: (err) => {
        console.error("Error fetching properties:", err);
        Swal.fire('Error', 'Failed to load properties.', 'error');
      }
    });
  }

  // Getter for filtered properties based on title and amenities
  get filteredProperties(): Property[] {
    return this.properties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.filteredTitle.toLowerCase());
      const matchesAmenities = this.selectedAmenityIds.length === 0 ||
        this.selectedAmenityIds.every(id => property.amenities.some(amenity => amenity.id === id));
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
  async deleteProperty(propertyId: number): Promise<void> {
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
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: () => {
          Swal.fire({
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
          this.getAllAgentProperties(); // Refresh the list
        },
        error: (err) => {
          console.error('Error deleting property:', err);
          Swal.fire('Error', 'Failed to delete property.', 'error');
        }
      });
    }
  }

  // Open the update form modal for a selected property
  openUpdateForm(property: Property): void {
    // Deep copy the property to avoid modifying original data before saving
    this.selectedProperty = JSON.parse(JSON.stringify(property));
    // Transform image paths for display in the update form
    if (this.selectedProperty && this.selectedProperty.images) { // <--- Added null check here
      this.selectedProperty.images = this.selectedProperty.images.map(img => ({
        ...img,
        imageUrl: `http://127.0.0.1:8000/storage/${img.imageUrl}`
      }));
    }
    // Reset newImages array
    this.newImages = [];
  }

  // Update a property and close the modal
  async updateProperty(): Promise<void> {
    if (!this.selectedProperty) {
      await Swal.fire('Error', 'No property selected for update.', 'error');
      return;
    }

    const propertyId = this.selectedProperty.id;

    // Create a FormData object for sending multipart data (including files)
    const formData = new FormData();

    // Append all property fields to formData
    formData.append('title', this.selectedProperty.title);
    formData.append('address', this.selectedProperty.address);
    formData.append('city', this.selectedProperty.city);
    formData.append('landArea', this.selectedProperty.landArea.toString());
    formData.append('price', this.selectedProperty.price.toString());
    formData.append('bedroom', this.selectedProperty.bedroom.toString());
    formData.append('bathroom', this.selectedProperty.bathroom.toString());
    formData.append('parking', this.selectedProperty.parking.toString());
    formData.append('longDescreption', this.selectedProperty.longDescreption);
    formData.append('shortDescreption', this.selectedProperty.shortDescreption);
    formData.append('constructionArea', this.selectedProperty.constructionArea.toString());
    formData.append('livingArea', this.selectedProperty.livingArea.toString());
    formData.append('property_listing_id', this.selectedProperty.property_listing_id.toString());
    formData.append('property_type_id', this.selectedProperty.property_type_id.toString());
    formData.append('purchase_id', this.selectedProperty.purchase_id.toString()); // Assuming purchase_id is managed

    // Append new images files
    this.newImages.forEach(file => {
      formData.append('images[]', file); // Use 'images[]' for multiple files
    });

    // Append amenities IDs
    if (this.selectedProperty.amenities && this.selectedProperty.amenities.length > 0) {
      this.selectedProperty.amenities.forEach(amenity => {
        formData.append('amenities[]', amenity.id.toString()); // Use 'amenities[]' for multiple IDs
      });
    }

    // Laravel expects _method: 'PUT' for PUT requests with FormData
    formData.append('_method', 'PUT');

    this.propertyService.updateProperty(propertyId, formData).subscribe({
      next: () => {
        this.selectedProperty = null; // Close the modal
        Swal.fire({
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
        this.getAllAgentProperties(); // Refresh the list
      },
      error: (err) => {
        console.error('Error updating property:', err);
        Swal.fire('Error', 'Failed to update property. ' + (err.error?.message || ''), 'error');
      }
    });
  }

  // Handle image selection for update form
  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newImages = Array.from(input.files);
    }
  }

  // Open the view property modal
  viewProperty(property: Property): void {
    // Fetch detailed property information if needed, or use the existing object
    this.propertyService.viewProperty(property.id).subscribe({
      next: (data: Property) => {
        this.viewedProperty = {
          ...data,
          location: `${data.address}, ${data.city}`,
          status: this.listingTypeMap[data.property_listing_id],
          image: data.images && data.images.length > 0 ? `http://127.0.0.1:8000/storage/${data.images[0].imageUrl}` : 'assets/placeholder.jpg',
          propertyType: this.propertyTypeMap[data.property_type_id],
          listingType: this.listingTypeMap[data.property_listing_id],
          constructionSize: data.constructionArea,
          landSize: data.landArea,
          bedrooms: data.bedroom,
          bathrooms: data.bathroom,
          // Ensure amenities array is initialized for display
          amenities: data.amenities || []
        };
        // Transform image paths for display in the view modal
        if (this.viewedProperty && this.viewedProperty.images) { // <--- Added null check here
          this.viewedProperty.images = this.viewedProperty.images.map(img => ({
            ...img,
            imageUrl: `http://127.0.0.1:8000/storage/${img.imageUrl}`
          }));
        }
      },
      error: (err) => {
        console.error('Error viewing property:', err);
        Swal.fire('Error', 'Failed to fetch property details.', 'error');
      }
    });
  }

  // Helper function to get display name for an amenity key
  getAmenityDisplayName(amenity: Amenity): string {
    return amenity.name;
  }

  // Check if an amenity is selected in the update form
  isAmenitySelected(amenity: Amenity): boolean {
    if (!this.selectedProperty || !this.selectedProperty.amenities) {
      return false;
    }
    return this.selectedProperty.amenities.some(a => a.id === amenity.id);
  }

  // Toggle amenity selection in the update form
  toggleAmenity(amenity: Amenity, event: Event): void {
    if (!this.selectedProperty) return;

    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Add amenity if not already present
      if (!this.selectedProperty.amenities.some(a => a.id === amenity.id)) {
        this.selectedProperty.amenities.push(amenity);
      }
    } else {
      // Remove amenity
      this.selectedProperty.amenities = this.selectedProperty.amenities.filter(a => a.id !== amenity.id);
    }
  }

  // This is a placeholder for a hypothetical 'Add Property' form submission
  // You would call this from your add property component/form
  async addNewProperty(formData: FormData): Promise<void> {
    this.propertyService.addProperty(formData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Property added successfully!', 'success');
        this.getAllAgentProperties(); // Refresh the list
        // Optionally close modal or clear form
      },
      error: (err) => {
        console.error('Error adding property:', err);
        Swal.fire('Error', 'Failed to add property. ' + (err.error?.message || ''), 'error');
      }
    });
  }

  protected readonly Math = Math; // Allow Math object to be used in template
}
