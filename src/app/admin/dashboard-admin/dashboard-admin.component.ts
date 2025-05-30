import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements AfterViewInit {

  stats = [
    { label: 'Total User', value: 0 },
    { label: 'Total Review', value: 0 },
    { label: 'Total Agents', value: 0 },
    { label: 'Avg. Rating', value: '0.0/5' }
  ];

  pendingUsers: any[] = [];
  listings: any[] = [];
totalProperties: number = 0;
totalPropertiesGoalMessage: string = '';
totalPropertiesProgress: number = 0;

  constructor(private adminService: AdminService) {}

  ngAfterViewInit(): void {
    this.loadStatistics();
    this.loadPendingUsers();


    this.renderCharts();
  }

  loadStatistics(): void {
  this.adminService.getStatistics().subscribe({
    next: (res) => {
      this.stats = [
        { label: 'Total User', value: res.total_users },
        { label: 'Total Review', value: res.total_reviews },
        { label: 'Total Agents', value: res.total_agents },
        { label: 'Avg. Rating', value: `${parseFloat(res.average_rating).toFixed(1)}/5` }
      ];

      this.totalProperties = res.total_properties;
      const goal = 5000; 
      const remaining = goal - this.totalProperties;

    },
    error: (err) => {
      console.error('Error loading statistics:', err);
    }
  });
}


  loadPendingUsers(): void {
    this.adminService.getPendingUsers().subscribe({
      next: (res) => {
        this.pendingUsers = res;
      },
      error: (err) => {
        console.error('Error loading pending users:', err);
      }
    });
  }



  renderCharts(): void {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Listings',
          data: [120, 200, 300, 400],
          borderColor: '#0078D7',
          fill: false,
          tension: 0.4
        }]
      }
    });

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Ali', 'Yousef', 'Hana', 'Sami'],
        datasets: [{
          label: 'Rating',
          backgroundColor: '#28a745',
          data: [4.8, 4.6, 4.7, 4.5]
        }]
      }
    });
  }

  deleteListing(listing: any) {
    Swal.fire({
      title: `Are you sure?`,
      html: `<strong>"${listing.title}"</strong> will be permanently deleted.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d1d5db',
      background: '#f9fafb',
      customClass: {
        popup: 'rounded-4 shadow-lg border',
        title: 'fw-bold text-dark',
        htmlContainer: 'text-muted'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.listings = this.listings.filter(l => l !== listing);
        Swal.fire({
          title: 'Deleted!',
          text: `"${listing.title}" has been removed.`,
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
          background: '#f9fafb',
          customClass: {
            popup: 'rounded-4 shadow border',
            title: 'fw-bold text-dark'
          }
        });
      }
    });
  }

  approveUser(user: any) {
    this.pendingUsers = this.pendingUsers.filter(u => u !== user);
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'success',
      title: `${user.name} approved`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#e0f7ec',
      customClass: {
        popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
      }
    });
  }

  rejectUser(user: any) {
    this.pendingUsers = this.pendingUsers.filter(u => u !== user);
    Swal.fire({
      toast: true,
      position: 'bottom',
      icon: 'error',
      title: `${user.name} rejected`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#ffe0e0',
      customClass: {
        popup: 'rounded-3 shadow text-dark px-4 py-3 fw-bold fs-6'
      }
    });
  }
}
