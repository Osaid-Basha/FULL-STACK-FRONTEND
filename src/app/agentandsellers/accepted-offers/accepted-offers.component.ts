import { Component, OnInit } from '@angular/core';
import { ReceivedAgentService } from '../../services/received-agent.service';
import Swal from 'sweetalert2';

@Component({
  standalone:false,
  selector: 'app-accepted-offers',
  templateUrl: './accepted-offers.component.html',
  styleUrls: ['./accepted-offers.component.css']
})
export class AcceptedOffersComponent implements OnInit {
  acceptedRequests: any[] = [];
  paginatedRequests: any[][] = [];
  currentPage = 0;
  itemsPerPage = 4;

  constructor(private receivedAgentService: ReceivedAgentService) {}

  ngOnInit(): void {
    this.loadAcceptedRequests();
  }

  loadAcceptedRequests() {
    this.receivedAgentService.getAll().subscribe(res => {
      this.acceptedRequests = (res.negotiations ?? []).filter((r: any) => r.status === 'accepted');
      this.updatePagination();
    });
  }

  updatePagination() {
    this.paginatedRequests = [];
    for (let i = 0; i < this.acceptedRequests.length; i += this.itemsPerPage) {
      this.paginatedRequests.push(this.acceptedRequests.slice(i, i + this.itemsPerPage));
    }
    this.currentPage = 0;
  }
confirmPurchase(req: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to confirm this purchase. This action is final.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Confirm it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#6c757d',
  }).then(result => {
    if (result.isConfirmed) {
      this.receivedAgentService.confirm(req.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Confirmed!',
            text: 'The purchase has been successfully confirmed.',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'bottom-end'
          });
          this.acceptedRequests = this.acceptedRequests.filter(r => r.id !== req.id);
          this.updatePagination();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Something went wrong. Please try again later.'
          });
        }
      });
    }
  });
}

  rejectRequest(req: any) {
    this.receivedAgentService.reject(req.id).subscribe(() => {
      this.acceptedRequests = this.acceptedRequests.filter(r => r.id !== req.id);
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
}
