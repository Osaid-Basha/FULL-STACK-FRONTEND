import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  selector: 'app-user-requests-admin',
  templateUrl: './user-requests-admin.component.html',
  styleUrls: ['./user-requests-admin.component.css']
})
export class UserRequestsAdminComponent implements OnInit {

  allRequests: any[] = [];
  paginatedRequests: any[][] = [];
  currentPage: number = 0;
  itemsPerPage: number = 4;
  activeFilter: string = 'All';
  searchTerm: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchPendingUsers();
  }

  fetchPendingUsers() {
    this.adminService.getPendingUsers().subscribe(response => {
      this.allRequests = response.pending_users ?? [];
      this.updatePagination();
    });
  }

  approveRequest(req: any) {
    this.adminService.approveUser(req.id).subscribe(() => {
      this.allRequests = this.allRequests.filter(r => r.id !== req.id);
      this.updatePagination();
      Swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'success',
        title: `${req.first_name} approved`,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  rejectRequest(req: any) {
    this.adminService.rejectUser(req.id).subscribe(() => {
      this.allRequests = this.allRequests.filter(r => r.id !== req.id);
      this.updatePagination();
      Swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'error',
        title: `${req.first_name} rejected`,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  filterRequests(type: string) {
    this.activeFilter = type;
    this.updatePagination();
  }

  updatePagination() {
    const filtered = this.filteredRequests();
    this.paginatedRequests = [];
    for (let i = 0; i < filtered.length; i += this.itemsPerPage) {
      this.paginatedRequests.push(filtered.slice(i, i + this.itemsPerPage));
    }
    this.currentPage = 0;
  }

  filteredRequests(): any[] {
    return this.allRequests
      .filter(r =>
        this.activeFilter === 'All' ||
        (this.activeFilter === 'Agent' && r.role_id === 2) ||
        (this.activeFilter === 'Buyer' && r.role_id === 3)
      )
      .filter(r =>
        !this.searchTerm ||
        r.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  goToPage(index: number) {
    this.currentPage = index;
  }

  previousPage() {
    if (this.currentPage > 0) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.paginatedRequests.length - 1) this.currentPage++;
  }
}
