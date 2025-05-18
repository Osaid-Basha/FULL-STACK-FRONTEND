import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myproperties-agent',
  standalone: true,
  templateUrl: './myproperties-agent.component.html',
  styleUrls: ['./myproperties-agent.component.css'],
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    NgIf
  ]
})
export class MypropertiesAgentComponent {
  properties = [
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

  // Initialize the allAmenities array
  allAmenities: string[] = [
    'Garden',
    'Security Cameras',
    'Laundry',
    'Internet',
    'Pool',
    'Video Surveillance',
    'Laundry Room',
    'Jacuzzi'
  ];

  currentPage = 1;
  itemsPerPage = 2;
  selectedProperty: any = null;

  get pagedProperties() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.properties.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.properties.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  async deleteProperty(index: number) {
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
      const realIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      this.properties.splice(realIndex, 1);

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
    }
  }

  openUpdateForm(property: any, index: number) {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.selectedProperty = { ...property, index: globalIndex };
  }

  async updateProperty() {
    const { index, ...updatedData } = this.selectedProperty;
    this.properties[index] = updatedData;
    this.selectedProperty = null;

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

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedProperty.images = Array.from(input.files);
    }
  }

  protected readonly Math = Math;
  viewedProperty: any = null;

  viewProperty(property: any, index: number) {
    const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
    this.viewedProperty = { ...property, index: globalIndex };
  }

}
