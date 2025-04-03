import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

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
  ];


  listings = [
    { title: 'Modern Villa', agent: 'Ayman', status: 'Active' }
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
}
