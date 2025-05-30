import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import * as AOS from 'aos';
import {AgentStatisticsService} from '../../services/agent-statistics.service';

@Component({
  selector: 'app-dashboard-agent',
  standalone: false,
  templateUrl: './dashboard-agent.component.html',
  styleUrls: ['./dashboard-agent.component.css']
})
export class DashboardAgentComponent implements OnInit {


  selectedPeriod = 'Weekly';


  stats = [
    { label: 'All Properties', value: '1.7k+', icon: 'fa-solid fa-user' },
    { label: 'Sold Properties', value: '03', icon: 'fa-regular fa-bookmark' },
    { label: 'Rented Properties', value: '4.8k', icon: 'fa-regular fa-eye' },
    { label: 'Remaining Properties', value: '07', icon: 'fa-regular fa-heart' }
  ];
  constructor(private statisticsService: AgentStatisticsService) {}

  loadStatistics(): void {
      this.statisticsService.getStatistics().subscribe({
        next: (data) => {
          console.log('Data from API:', data);
          this.stats = [
            { label: 'All Properties', value: data.totalCount.toLocaleString(), icon: 'fa-solid fa-user' },
            { label: 'Sold Properties', value: data.soldCount.toLocaleString(), icon: 'fa-regular fa-bookmark' },
            { label: 'Rented Properties', value: data.rentedCount.toLocaleString(), icon: 'fa-regular fa-eye' },
            { label: 'Remaining Properties', value: data.availableCount.toLocaleString(), icon: 'fa-regular fa-heart' }
          ];
          AOS.init();
        },
        error: (error) => {
          console.error('Failed to retrieve statistics:', error);
        }
      });
  }



  messages = [
    {
      name: 'Jenny Rio.',
      subject: 'Work inquiry from Google.',
      snippet: 'Hello, This is Jenny from Google. We’d like to invite you...',
      date: 'AUG 22'
    },
    {
      name: 'Hasan Islam.',
      subject: 'Product Designer Opportunities',
      snippet: 'Hope you doing great. We have an opening for...',
      date: 'MAY 22'
    },
    {
      name: 'Jakie Chan',
      subject: 'Hunting Marketing Specialist',
      snippet: 'We offer business solutions for marketing specialists...',
      date: 'JULY 22'
    }
  ];

  barChartType: ChartType = 'bar';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [20000, 12000, 6000, 16000, 10000, 5000, 11000],
        label: 'Total View',
        backgroundColor: '#ff6b00',
        borderRadius: 8
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: '#555',
          font: { size: 13 }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#555',
          stepSize: 5000,
          callback: (value) => `$${value}`
        },
        grid: {
          color: '#eee'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  };


  ngOnInit(): void {
    this.loadStatistics();
    AOS.init({
      duration: 800,
      once: true
    });
  }
}
