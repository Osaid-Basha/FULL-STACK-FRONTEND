import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-manage-reviews',
  standalone: false,
  templateUrl: './manage-reviews.component.html',
  styleUrl: './manage-reviews.component.css'
})
export class ManageReviewsComponent {
  searchTerm: string = '';

  reviews = [
    { name: 'Ahmad N.', email: 'ahmad@gmail.com', rating: 5, date: '2025-03-20', comment: 'Perfect experience!', hidden: false, flagged: false },
    { name: 'Lina R.', email: 'lina@yahoo.com', rating: 2, date: '2025-03-18', comment: 'Agent was late and rude.', hidden: false, flagged: false },
    { name: 'Khaled M.', email: 'khaled@live.com', rating: 4, date: '2025-03-17', comment: 'Good but can improve.', hidden: false, flagged: false },
  ];

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  filteredReviews() {
    return this.reviews.filter(r =>
      r.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  removeReview(review: any) {
    this.reviews = this.reviews.filter(r => r !== review);
  }

  toggleVisibility(review: any) {
    review.hidden = !review.hidden;
  }
  ngAfterViewInit(): void {
    new Chart("ratingChart", {
      type: 'bar',
      data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
          label: 'Number of Ratings',
          data: [3, 5, 7, 15, 25],
          backgroundColor: '#0d6efd'
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
}
