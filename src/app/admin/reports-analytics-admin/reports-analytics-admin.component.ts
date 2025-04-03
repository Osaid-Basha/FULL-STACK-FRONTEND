import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  standalone:false,
  selector: 'app-reports-analytics-admin',
  templateUrl: './reports-analytics-admin.component.html',
  styleUrls: ['./reports-analytics-admin.component.css']
})
export class ReportsAnalyticsAdminComponent {
  stats = [
    { label: 'Total Properties', value: '1,230', icon: 'bi bi-house-door-fill' },
    { label: 'Site Visits', value: '8.4k', icon: 'bi bi-globe2' },
    { label: 'Messages Sent', value: '980', icon: 'bi bi-envelope-fill' },
    { label: 'Avg. Rating', value: '4.7 / 5', icon: 'bi bi-star-fill' },
  ];

  topAgents = [
    { name: 'Ali Khalid', listings: 32, sales: 14, rating: 5 },
    { name: 'Nour Ahmad', listings: 28, sales: 12, rating: 4 },
    { name: 'Rami Zaid', listings: 25, sales: 10, rating: 4 },
  ];


  salesChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  salesChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [120, 190, 300, 250, 400, 500],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13,110,253,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };


  viewsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  viewsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Views',
        data: [500, 700, 600, 800, 900, 1000, 1100],
        backgroundColor: '#198754'
      }
    ]
  };
  getStars(count: number): number[] {
    return Array(count).fill(0);
  }

}
