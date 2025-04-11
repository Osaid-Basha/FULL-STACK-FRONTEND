import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import Swal from 'sweetalert2';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexResponsive
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class  DashboardAdminComponent implements AfterViewInit {

  stats = [
    { label: 'Total Listings', value: 1230 },
    { label: 'Website Visits', value: '8.2K' },
    { label: 'Active Agents', value: 56 },
    { label: 'Avg. Rating', value: '4.7/5' }
  ];

  requests = [
    { email: 'ahmad@gmail.com', message: 'I want to visit the Nablus property.' },
    { email: 'ahmad@gmail.com', message: 'I want to visit the Nablus property.' }
  ];
  pendingUsers = [
    { name: 'Ahmad Salem', email: 'ahmad@gmail.com', type: 'Agent', date: 'Apr 1, 2025' },
    { name: 'Rasha Ali', email: 'rasha@email.com', type: 'Seller', date: 'Mar 30, 2025' },
    { name: 'Lina Hasan', email: 'lina@agentmail.com', type: 'Agent', date: 'Mar 20, 2025' },
    { name: 'Mohamed M.', email: 'mohamed@yahoo.com', type: 'Seller', date: 'Mar 10, 2025' },
    { name: 'Mahmoud A.', email: 'mahmoud@hotmail.com', type: 'Agent', date: 'Feb 25, 2025' },
  ];


  listings = [
    { title: 'Modern Villa', agent: 'Ayman', status: 'Active' },
    { title: 'Luxury Apartment', agent: 'Sara', status: 'Pending' },
    { title: 'Cozy Cottage', agent: 'Ali', status: 'Sold' },
    { title: 'Beach House', agent: 'Maya', status: 'Active' },
    { title: 'Mountain Cabin', agent: 'Omar', status: 'Pending' },
  ];

  ngAfterViewInit(): void {
    // Line Chart
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

    // Bar Chart
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
