import { Component, OnInit } from '@angular/core';
import { ManagereviewService } from '../../services/managereview.service';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';
import AOS from 'aos';

@Component({

  standalone: false,
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {
  search: string = '';
  currentPage = 1;
  cardsPerPage = 3;

  reviews: any[] = [];
  filtered: any[] = [];

  constructor(private reviewService: ManagereviewService) {}

  ngOnInit() {
    AOS.init({ duration: 600, once: true });
    this.getAllReviews();
  }

  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe((res: any) => {
      this.reviews = res.reviews ?? [];
      this.filtered = [...this.reviews];
      
    });
  }

  filterReviews(): void {
    const term = this.search.toLowerCase();
    this.filtered = this.reviews.filter(r =>
      `${r.user.first_name} ${r.user.last_name}`.toLowerCase().includes(term) ||
      r.user.email.toLowerCase().includes(term) ||
      r.title.toLowerCase().includes(term) ||
      r.content.toLowerCase().includes(term) ||
      r.created_at.toLowerCase().includes(term)
    );
  }

  paginateReviews(): any[] {
    const start = (this.currentPage - 1) * this.cardsPerPage;
    return this.filtered.slice(start, start + this.cardsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  deletecardreview(review: any) {
  Swal.fire({
    title: `Are you sure?`,
    html: `<strong>"${review.title}"</strong> will be permanently deleted.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#d1d5db',
    background: '#f9fafb',
  }).then((result) => {
    if (result.isConfirmed) {
      this.reviewService.deleteReview(review.id).subscribe({
        next: () => {
          this.reviews = this.reviews.filter(r => r.id !== review.id);
          this.filtered = this.filtered.filter(r => r.id !== review.id);
          Swal.fire({
            title: 'Deleted!',
            text: `"${review.title}" has been removed from the server.`,
            icon: 'success',
            timer: 1800,
            showConfirmButton: false,
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: `Failed to delete "${review.title}". Please try again.`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    }
  });
}


  renderChart(): void {
    const ratingCounts = [0, 0, 0, 0, 0];
    this.reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++;
    });

    new Chart("ratingChart", {
      type: 'bar',
      data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
          label: 'Ratings',
          data: ratingCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }





}
