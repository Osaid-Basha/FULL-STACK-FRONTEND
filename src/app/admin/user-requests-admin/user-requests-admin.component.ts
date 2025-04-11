import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-requests-admin',
  standalone: false,
  templateUrl: './user-requests-admin.component.html',
  styleUrl: './user-requests-admin.component.css'
})
export class UserRequestsAdminComponent {
  allRequests = [
    { name: 'Mohammad N.', email: 'm@example.com', type: 'Buyer', location: 'Nablus' },
    { name: 'Lina H.', email: 'lina@example.com', type: 'Agent', location: 'Tulkarm' },
    { name: 'Ali Z.', email: 'ali@example.com', type: 'Buyer', location: 'Hebron' },
    { name: 'Sara S.', email: 'sara@example.com', type: 'Agent', location: 'Jenin' }
  ];

  requests = [...this.allRequests];
  activeFilter: string = 'All';

  approveRequest(req: any) {
    this.requests = this.requests.filter(r => r !== req);
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'success',
      title: `${req.name} approved`,
      showConfirmButton: false,
      timer: 2000,
      background: '#e0f7ec',
      customClass: {
        popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
      }
    });
  }

  rejectRequest(req: any) {
    this.requests = this.requests.filter(r => r !== req);
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'error',
      title: `${req.name} rejected`,
      showConfirmButton: false,
      timer: 2000,
      background: '#ffe0e0',
      customClass: {
        popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
      }
    });
  }

  filterRequests(type: string) {
    this.activeFilter = type;
    if (type === 'All') {
      this.requests = [...this.allRequests];
    } else {
      this.requests = this.allRequests.filter(r =>
        r.type.toLowerCase() === type.toLowerCase()
      );
    }

}
}


