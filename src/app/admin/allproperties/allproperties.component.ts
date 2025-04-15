import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allproperties',
  standalone: false,
  templateUrl: './allproperties.component.html',
  styleUrl: './allproperties.component.css'
})
export class AllpropertiesComponent {
  properties = [
    {
      title: 'Galaxy Flat',
      location: 'Mirpur 10, Dhaka, BD',
      price: 32800,
      date: '13 Jan, 2023',
      views: 1210,
      status: 'Active',
      image: 'assets/01.jpg'
    },
    {
      title: 'White House Villa',
      location: 'Ranchview, California, USA',
      price: 42130,
      date: '09 Jan, 2023',
      views: 0,
      status: 'Pending',
      image: 'assets/01.jpg'
    }
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

  protected readonly Math = Math;
}
