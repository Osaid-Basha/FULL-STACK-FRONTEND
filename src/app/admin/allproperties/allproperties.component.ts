import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';

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
  amenities: Amenities;
  images: any[];
}

@Component({
  selector: 'app-allproperties',
  standalone: false,
  templateUrl: './allproperties.component.html',
  styleUrls: ['./allproperties.component.css'],
  
})
export class AllpropertiesComponent implements OnInit {
  properties: Property[] = [];
  filteredTitle: string = '';
  selectedAmenities: { [K in keyof Amenities]?: boolean } = {};
  currentPage = 1;
  itemsPerPage = 5;
  selectedProperty: (Property & { index?: number }) | null = null;
  viewedProperty: (Property & { index?: number }) | null = null;
  protected readonly Math = Math;

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

  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.loadProperties();

  }

  loadProperties(): void {
  const baseUrl = 'http://localhost:8000/storage/';

  this.AdminService.getAllProperties().subscribe({
    next: (res) => {
      this.properties = res.map((p: any) => ({
        id: p.id,
        title: p.title,
        location: p.location,
        price: p.price,
        date: new Date(p.created_at).toLocaleDateString(),
        views: Math.floor(Math.random() * 1000),
        status: p.available ? 'Available' : 'Not Available',
        image: p.images[0] ? baseUrl + p.images[0].imageUrl : 'assets/placeholder.jpg',
        address: p.address,
        city: p.city,
        propertyType: p.property_type_name || 'N/A', // غيرها حسب اسم الحقل الحقيقي
        listingType: p.listing_type_name || 'N/A',
        livingArea: p.living_area || 0,
        bedrooms: p.bedroom || 0,
        bathrooms: p.bathroom || 0,
        parking: p.parking || 0,
        constructionSize: p.construction_area || 0,
        landSize: p.land_area || 0,
        shortDescription: p.shortDescreption || 'N/A',
        longDescription: p.longDescreption || 'N/A',
        amenities: this.convertAmenitiesArrayToObject(p.amenities || []),
        images: p.images || []
      }));
    },
    error: (err) => {
      console.error('Error loading properties:', err);
    }
  });
}



  convertAmenitiesArrayToObject(amenitiesArray: any[]): Amenities {
    const obj: any = {
      garden: false,
      securityCameras: false,
      laundry: false,
      internet: false,
      pool: false,
      videoSurveillance: false,
      laundryRoom: false,
      jacuzzi: false
    };

    for (const a of amenitiesArray) {
      const key = a.name.replace(/\s+/g, '').replace(/[A-Z]/g, (c: string) => c.toLowerCase());
      if (obj.hasOwnProperty(key)) {
        obj[key] = true;
      } else {
        obj[a.name] = true;
      }
    }

    return obj;
  }

  get filteredProperties(): Property[] {
    return this.properties.filter(property => {
      const matchesTitle = property.title.toLowerCase().includes(this.filteredTitle.toLowerCase());
      const matchesAmenities = this.allAmenities.every(key => {
        return !this.selectedAmenities[key] || property.amenities[key];
      });
      return matchesTitle && matchesAmenities;
    });
  }

  get displayedProperties(): Property[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProperties.slice(start, end);
  }

  get totalDisplayedPages(): number {
    return Math.ceil(this.filteredProperties.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalDisplayedPages) {
      this.currentPage = page;
    }
  }

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
    });

    if (result.isConfirmed) {
      const propertyToDelete = this.displayedProperties[index];
      const originalIndex = this.properties.indexOf(propertyToDelete);

      this.AdminService.deleteProperty(propertyToDelete.id).subscribe({
        next: () => {
          if (originalIndex > -1) {
            this.properties.splice(originalIndex, 1);
          }

          Swal.fire({
            title: 'Deleted!',
            text: 'Property has been deleted successfully.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });

          if (this.displayedProperties.length === 0 && this.currentPage > 1) {
            this.currentPage--;
          }
        },
        error: () => {
          Swal.fire('Error', 'Failed to delete property.', 'error');
        }
      });
    }
  }

  openUpdateForm(property: Property, index: number): void {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.selectedProperty = { ...property, index: globalIndex };
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && this.selectedProperty) {
      this.selectedProperty.images = Array.from(input.files);
    }
  }

  viewProperty(property: Property, index: number): void {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.viewedProperty = { ...property, index: globalIndex };
  }

  getAmenityDisplayName(key: keyof Amenities): string {
    switch (key) {
      case 'garden': return 'Garden';
      case 'securityCameras': return 'Security Cameras';
      case 'laundry': return 'Laundry';
      case 'internet': return 'Internet';
      case 'pool': return 'Pool';
      case 'videoSurveillance': return 'Video Surveillance';
      case 'laundryRoom': return 'Laundry Room';
      case 'jacuzzi': return 'Jacuzzi';
      default: return String(key);
    }
  }

  resetFilters(): void {
    this.filteredTitle = '';
    this.selectedAmenities = {};
    this.currentPage = 1;
  }
}
