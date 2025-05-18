import { Component } from '@angular/core';
 import Swal from 'sweetalert2';
@Component({
  selector: 'app-remove-admin',
  standalone: false,
  templateUrl: './remove-admin.component.html',
  styleUrl: './remove-admin.component.css'
})
export class RemoveAdminComponent {



    searchTerm: string = '';
    activeFilter: string = 'All';

    allItems = [
      { name: 'Mohammad', email: 'm@example.com', location: 'Nablus', type: 'Agent', reason: 'Repeated content' },
      { name: 'Sara', email: 'sara@example.com', location: 'Hebron', type: 'Buyer', reason: 'Inappropriate language' },
      { name: 'Ali', email: 'ali@example.com', location: 'Tulkarm', type: 'Agent', reason: 'Misleading info' }
    ];

    items = [...this.allItems];

    filterByType(type: string) {
      this.activeFilter = type;
    }

    filteredItems() {
      return this.items
        .filter(item => this.activeFilter === 'All' || item.type === this.activeFilter)
        .filter(item =>
          !this.searchTerm ||
          item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.reason.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    removeItem(item: any) {
      Swal.fire({
        title: 'Remove this item?',
        html: `<strong>${item.name}</strong> will be permanently removed.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        background: '#f9fafb',
        customClass: {
          popup: 'rounded-4 shadow border',
          title: 'fw-bold text-dark',
          htmlContainer: 'text-muted'
        }
      }).then(result => {
        if (result.isConfirmed) {
          this.items = this.items.filter(i => i !== item);
          Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'Item removed',
            showConfirmButton: false,
            timer: 2000,
            background: '#e0f7ec',
            customClass: {
              popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
            }
          });
        }
      });
    }
  }

