import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

// واجهات البيانات
interface UserProfile {
  location?: string;
  current_position?: string;
}

interface User {
  id: number;
  first_name: string;
  email: string;
  role_id: number;
  profile?: UserProfile;
}

interface Item {
  id: number;
  name: string;
  email: string;
  location: string;
  type: string;
  reason: string;
}

@Component({
  standalone: false,
    selector: 'app-remove-admin',
  templateUrl: './remove-admin.component.html',
  styleUrls: ['./remove-admin.component.css']
})
export class RemoveAdminComponent implements OnInit {

  searchTerm: string = '';
  activeFilter: string = 'All';

  items: Item[] = [];
  paginatedItems: Item[][] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchUsers();
  }


  fetchUsers() {
    this.adminService.getAllUsers().subscribe(
      (response) => {
        const usersArray: User[] = response.users ?? [];

        this.items = usersArray.map((user: User): Item => ({
          id: user.id,
          name: user.first_name,
          email: user.email,
          location: user.profile?.location ?? 'Unknown',
          type: user.role_id === 2 ? 'Agent' : user.role_id === 3 ? 'Buyer' : 'Unknown',
          reason: 'No reason provided',
        }));

        this.updatePagination();
      },
      error => {
        console.error(' Error fetching users:', error);
      }
    );
  }

filterByType(type: string) {
  this.activeFilter = type;
  this.updatePagination();
}



  filteredItems(): Item[] {
    return this.items
      .filter(item => this.activeFilter === 'All' || item.type === this.activeFilter)
      .filter(item =>
        !this.searchTerm ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  // ✅ تقسيم البيانات إلى صفحات
  updatePagination() {
    const filtered = this.filteredItems();
    this.paginatedItems = [];
    for (let i = 0; i < filtered.length; i += this.itemsPerPage) {
      this.paginatedItems.push(filtered.slice(i, i + this.itemsPerPage));
    }
    this.currentPage = 0;
  }

  goToPage(index: number) {
    this.currentPage = index;
  }

  previousPage() {
    if (this.currentPage > 0) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.paginatedItems.length - 1) this.currentPage++;
  }


  removeItem(item: Item) {
    Swal.fire({
      title: 'Remove this user?',
      html: `<strong>${item.name}</strong> will be permanently deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
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
        this.adminService.deleteUser(item.id).subscribe(() => {
          this.items = this.items.filter(i => i.id !== item.id);
          this.updatePagination();
          Swal.fire({
            toast: true,
            position: 'bottom',
            icon: 'success',
            title: 'User deleted',
            showConfirmButton: false,
            timer: 2000,
            background: '#e0f7ec',
            customClass: {
              popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
            }
          });
        });
      }
    });
  }
}
