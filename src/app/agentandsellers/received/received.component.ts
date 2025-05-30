import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReceivedAgentService } from '../../services/received-agent.service';

@Component({
  standalone: false,
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css']
})
export class ReceivedComponent implements OnInit {
  allRequests: any[] = [];
  paginatedRequests: any[][] = [];
  currentPage = 0;
  itemsPerPage = 4;
  activeFilter = 'All';
  searchTerm = '';

  constructor(private receivedAgentService: ReceivedAgentService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.receivedAgentService.getAll().subscribe(res => {
      this.allRequests = res.negotiations ?? [];
      this.updatePagination();
    });
  }

  approveRequest(req: any) {
    this.receivedAgentService.accept(req.id).subscribe(() => {
      this.allRequests = this.allRequests.filter(r => r.id !== req.id);
      this.updatePagination();
      Swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'success',
        title: `${req.user.first_name} accepted`,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  rejectRequest(req: any) {
    this.receivedAgentService.reject(req.id).subscribe(() => {
      this.allRequests = this.allRequests.filter(r => r.id !== req.id);
      this.updatePagination();
      Swal.fire({
        toast: true,
        position: 'bottom',
        icon: 'error',
        title: `${req.user.first_name} rejected`,
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
        (this.activeFilter === 'Agent' && r.user.role_id === 2) ||
        (this.activeFilter === 'Buyer' && r.user.role_id === 3)
      )
      .filter(r =>
        !this.searchTerm ||
        r.user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
