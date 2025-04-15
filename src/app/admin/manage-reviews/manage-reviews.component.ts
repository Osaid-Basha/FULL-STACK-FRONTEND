import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  imports: [
    FormsModule,
    NgForOf,
    MatCheckbox,
    NgIf
],
  styleUrl: './manage-reviews.component.css'
})
export class ManageReviewsComponent{
  search: string = '';

  reviews = [
    {
      name: 'Menna kharma',
      email: 'mennajihad@gmail.com',
      rating: 5,
      date: '20-3-2025',
      comment: 'Perfect experience!',
      image: "assets/img/profile3.png"
    },
    {
      name: 'dareen',
      email: 'dareen@yahoo.com',
      rating: 2,
      date: '18-3-2025',
      comment: 'Agent was late and rude.!',
      hidden: false,
      flagged: false,
      image: "assets/img/profile2.png"
    },
    {
      name: 'osied basha',
      email: 'osied@live.com',
      rating: 4,
      date: '19-2-2025',
      comment: 'Good but can improve.!',
      hidden: false,
      flagged: false,
      image: "assets/371225.jpg"
    },

  ];

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  filteredReviews() {
    return this.reviews.filter(input =>
      input.name.toLowerCase().includes(this.search.toLowerCase()) ||
      input.email.toLowerCase().includes(this.search.toLowerCase()) ||
      input.comment.toLowerCase().includes(this.search.toLowerCase()) ||
      input.date.toLowerCase().includes(this.search.toLowerCase())
    );
  }
  removeReview(review: any) {
    this.reviews = this.reviews.filter(r => r !== review);
  }

  toggleVisibility(review: any) {
    review.hidden = !review.hidden;
  }
  chart: any;

  ngAfterViewInit(): void {
    new Chart("ratingChart", {
      type: 'bar',
      data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
          label: 'Number of Ratings',
          data: [3, 5, 7, 15, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]

      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#666' }
          },
          x: {
            ticks: { color: '#333' }
          }
        }
      }
    });
  }
  stats = [

    { label: 'Total Listings', value: 1230 },
    { label: 'Website Visits', value: '8.2K' },
    { label: 'Active Agents', value: 56 },
    { label: 'Avg. Rating', value: '4.7/5'}

 ];



}






