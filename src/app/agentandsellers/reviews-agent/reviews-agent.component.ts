import { Component, OnInit } from '@angular/core';
import { ManagereviewService } from '../../services/managereview.service';
import AOS from 'aos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews-agent',
  templateUrl: './reviews-agent.component.html',
  styleUrls: ['./reviews-agent.component.css'],
  standalone: false
})
export class ReviewsAgentComponent implements OnInit {
  private _searchreviewagent: string = '';
  get searchreviewagent(): string {
    return this._searchreviewagent;
  }
  set searchreviewagent(value: string) {
    this._searchreviewagent = value;
  }

  reviews: any[] = [];
  Massagenew: string = '';
  selectedReviewId: number | null = null;
  bootstrap: any;

  constructor(private managereviewService: ManagereviewService) {}

currentPage: number = 1;
itemsPerPage: number = 3; // عدد العناصر لكل صفحة

get paginatedReviews(): any[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredReviews.slice(start, start + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.filteredReviews.length / this.itemsPerPage);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

  ngOnInit() {
    AOS.init();
    this.loadReviews();
    this.bootstrap = (window as any).bootstrap;
  }

  loadReviews() {
    this.managereviewService.getAgentReviews().subscribe({
      next: (res) => {
        if (res?.reviews) {
          this.reviews = res.reviews.map((review: any) => {
            const user = review.user;
            const imageUrl = 'assets/img/profile2.png'; // ثابت حالياً
            const images = ['assets/img/regions/house.png']; // ثابت حالياً

            return {
              id: review.id,
              name: `${user.first_name} ${user.last_name}`,
              date: new Date(review.created_at).toLocaleDateString(),
              rating: review.rating,
              comment: review.content,
              reply: review.replies?.[0]?.message_content || null,
              image: imageUrl,
              images
            };
          });
          console.log('✅ Loaded Reviews:', this.reviews);
        } else {
          this.reviews = [];
        }
      },
      error: (err) => {
        console.error('❌ Error loading reviews:', err);
        this.reviews = [];
      }
    });
  }

  get filteredReviews(): any[] {
    const search = this.searchreviewagent?.trim().toLowerCase();
    if (!search) return this.reviews;

    return this.reviews.filter(review =>
      review.name?.toLowerCase().includes(search) ||
      review.comment?.toLowerCase().includes(search) ||
      review.date?.toLowerCase().includes(search)
    );
  }

  highlight(text: string | undefined): string {
    if (!text || !this.searchreviewagent.trim()) return text || '';
    const regex = new RegExp(`(${this.searchreviewagent})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

  Sendmassage() {
    if (!this.selectedReviewId || !this.Massagenew.trim()) return;

    const payload = {
      review_id: this.selectedReviewId,
      message_content: this.Massagenew.trim()
    };

    this.managereviewService.sendReply(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Reply Sent!',
          text: 'Your reply has been successfully submitted.',
          confirmButtonColor: '#3085d6'
        });
        this.Massagenew = '';
        this.selectedReviewId = null;
        this.loadReviews();
        const modal = document.getElementById('exampleModal');
        if (modal) {
          const modalInstance = this.bootstrap.Modal.getInstance(modal);
          modalInstance?.hide();
        }
      },
      error: err => {
        console.error('Error sending reply:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while sending the reply!',
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
