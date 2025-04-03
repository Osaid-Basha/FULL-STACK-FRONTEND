import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  standalone: false,
  selector: 'app-dashboard-agent',
  templateUrl: './dashboard-agent.component.html',
  styleUrls: ['./dashboard-agent.component.css']
})
export class DashboardComponent {
  selectedPeriod = 'Weekly';

  stats = [
    { label: 'All Properties', value: '1.7k+', icon: 'fa-solid fa-user' },
    { label: 'Total Pending', value: '03', icon: 'fa-regular fa-bookmark' },
    { label: 'Total Views', value: '4.8k', icon: 'fa-regular fa-eye' },
    { label: 'Total Favourites', value: '07', icon: 'fa-regular fa-heart' }
  ];

  messages = [
    { name: 'Jenny Rio.', subject: 'Work inquiry from Google.', snippet: 'Hello, This is Jenny from Google...', date: 'AUG 22' },
    { name: 'Hasan Islam.', subject: 'Product Designer Opportunities', snippet: 'Hope you doing great...', date: 'MAY 22' },
    { name: 'Jakie Chan', subject: 'Hunting Marketing Specialist', snippet: 'We offer business solution...', date: 'JULY 22' }
  ];

  barChartType: ChartType = 'bar';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [20000, 12000, 6000, 16000, 10000, 5000, 11000],
        label: 'Total View',
        backgroundColor: '#ff6b00'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    },
    plugins: {
      legend: {
        labels: {
          color: '#333'
        }
      }
    }
  };
}
