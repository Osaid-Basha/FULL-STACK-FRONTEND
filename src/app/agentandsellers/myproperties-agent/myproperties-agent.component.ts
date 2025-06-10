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
  imageUrl: string; // This will store the relative path from the backend
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
  images: PropertyImage[]; // Array of image objects (will contain relative paths from backend)
  amenities: Amenity[]; // Array of amenity objects

  // Properties used for display in the table, derived from backend data
  location?: string; // Derived from address, city
  date?: string;     // Placeholder for date
  views?: number;    // Placeholder for views
  status?: string;   // Derived from property_listing_id
  image?: string; // The "main" image for display (will be full URL) - Renamed from displayImage to match your HTML
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
  // imports: [FormsModule, NgClass, NgForOf, NgIf] // Uncomment if this is a standalone component
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
  itemsPerPage = 4;
  selectedProperty: Property | null = null;
  viewedProperty: Property | null = null;
  newImages: File[] = []; // For new images to be uploaded on update

  // Base URL for property images - Use this consistently
  private readonly IMAGE_BASE_URL = 'http://127.0.0.1:8000/storage/';

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.getAllAgentProperties();
  }

  /**
   * Constructs a full URL for an image based on its path from the backend.
   * It handles cases where the backend might send a full URL or a relative path.
   * @param imagePathFromBackend The image path received from the backend (e.g., 'property_images/my_image.jpg' OR 'http://localhost:8000/storage/property_images/my_image.jpg').
   * @returns The full URL for the image.
   */
  getFullImageUrl(imagePathFromBackend: string): string {
    // If the path from backend already starts with http/https, it's a full URL. Use it directly.
    if (imagePathFromBackend.startsWith('http://') || imagePathFromBackend.startsWith('https://')) {
      return imagePathFromBackend;
    }
    // Otherwise, it's a relative path. Prepend the base URL.
    return `${this.IMAGE_BASE_URL}${imagePathFromBackend}`;
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
          // ✅ استخدم getFullImageUrl هنا لضمان رابط صحيح
          image: prop.images && prop.images.length > 0 ? this.getFullImageUrl(prop.images[0].imageUrl) : 'assets/placeholder.jpg',
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

    // ✅ استخدم getFullImageUrl هنا لضمان رابط صحيح لعرض الصور الحالية في النموذج
    if (this.selectedProperty && this.selectedProperty.images) {
      this.selectedProperty.images = this.selectedProperty.images.map(img => ({
        ...img,
        imageUrl: this.getFullImageUrl(img.imageUrl)
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

    formData.append('title', this.selectedProperty.title || '');
    formData.append('address', this.selectedProperty.address || '');
    formData.append('city', this.selectedProperty.city || '');
    formData.append('landArea', (this.selectedProperty.landArea ?? 0).toString());
    formData.append('price', (this.selectedProperty.price ?? 0).toString());
    formData.append('bedroom', (this.selectedProperty.bedroom ?? 0).toString());
    formData.append('bathroom', (this.selectedProperty.bathroom ?? 0).toString());
    formData.append('parking', (this.selectedProperty.parking ?? 0).toString());
    formData.append('longDescreption', this.selectedProperty.longDescreption || '');
    formData.append('shortDescreption', this.selectedProperty.shortDescreption || '');
    formData.append('constructionArea', (this.selectedProperty.constructionArea ?? 0).toString());
    formData.append('livingArea', (this.selectedProperty.livingArea ?? 0).toString());

    // تأكد من أن property_listing_id و property_type_id و purchase_id و user_id موجودين
    formData.append('property_listing_id', (this.selectedProperty.property_listing_id ?? 1).toString());
    formData.append('property_type_id', (this.selectedProperty.property_type_id ?? 1).toString());

    formData.append('user_id', (this.selectedProperty.user_id ?? 0).toString());



    if (this.newImages.length > 0) {
      this.newImages.forEach(file => {
        formData.append('images[]', file);
      });
    } else if (this.selectedProperty.images && this.selectedProperty.images.length > 0) {
      this.selectedProperty.images.forEach(img => {

        let relativePath = img.imageUrl;
        if (relativePath.startsWith(this.IMAGE_BASE_URL)) {
          relativePath = relativePath.substring(this.IMAGE_BASE_URL.length);
        }
        formData.append('images[]', relativePath);
      });
    } else if (this.selectedProperty.images && this.selectedProperty.images.length === 0) {

      formData.append('images[]', '');
    }



    // Append amenities IDs
    if (this.selectedProperty.amenities && this.selectedProperty.amenities.length > 0) {
      this.selectedProperty.amenities.forEach(amenity => {
        formData.append('amenities[]', amenity.id.toString());
      });
    }

    // Laravel expects _method: 'PUT' for PUT requests with FormData
    formData.append('_method', 'PUT');

    // Debugging logs - يمكنك إزالتها بعد حل المشكلة
    console.log("Selected Property for Update:", this.selectedProperty);
    console.log("FormData entries before sending:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


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
        console.error('Full error object:', err); // لعرض تفاصيل الخطأ كاملة
        Swal.fire('Error', 'Failed to update property. ' + (err.error?.message || 'Please check console for more details.'), 'error');
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
          // ✅ استخدم getFullImageUrl هنا لضمان رابط صحيح
          image: data.images && data.images.length > 0 ? this.getFullImageUrl(data.images[0].imageUrl) : 'assets/placeholder.jpg',
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
        // ✅ استخدم getFullImageUrl هنا لضمان رابط صحيح
        if (this.viewedProperty && this.viewedProperty.images) {
          this.viewedProperty.images = this.viewedProperty.images.map(img => ({
            ...img,
            imageUrl: this.getFullImageUrl(img.imageUrl)
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
