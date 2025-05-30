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
  searchreviewagent: string = '';
  reviews: any[] = [];
  currentPage = 1;
  cardsPerPage = 2;
  Massagenew: string = '';
 bootstrap: any;



selectedReviewId: number | null = null;

  constructor(private managereviewService: ManagereviewService) {}

  ngOnInit() {
  AOS.init();
  this.loadReviews();
  // Assign Bootstrap from global window object if loaded via CDN
  this.bootstrap = (window as any).bootstrap;
}
  loadReviews() {
    this.managereviewService.getAgentReviews().subscribe(
      (res) => {
        if (res?.reviews) {
          this.reviews = res.reviews.map((review: any) => ({
            id: review.id,
            name: `${review.user.first_name} ${review.user.last_name}`,
            date: new Date(review.created_at).toLocaleDateString(),
            rating: review.rating,
            comment: review.content,
            image: 'assets/img/profile2.png', // تقدر تربطه بديناميك لو عندك صورة في البيانات
            images: ['assets/img/regions/house.png', 'assets/img/regions/house.png'] // أو ممكن تربطها بالـ buying_request.property لو حبيت
          }));
        }
      },
      (err) => {
        console.error('Error loading reviews', err);
      }
    );
  }

  get filteredReviews() {
    return this.reviews.filter(review =>
      review.name.toLowerCase().includes(this.searchreviewagent.toLowerCase()) ||
      review.comment.toLowerCase().includes(this.searchreviewagent.toLowerCase()) ||
      review.date.toLowerCase().includes(this.searchreviewagent.toLowerCase())
    );
  }

  paginateReviews(data: any[]) {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return data.slice(startIndex, startIndex + this.cardsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  Sendmassage() {
  if (!this.selectedReviewId || !this.Massagenew.trim()) return;

  const payload = {
    review_id: this.selectedReviewId,
    message_content: this.Massagenew.trim()
  };

  this.managereviewService.sendReply(payload).subscribe({
    next: res => {
      // 1. رسالة نجاح جميلة
      Swal.fire({
        icon: 'success',
        title: 'Replay Sent!',
        text: 'Your reply has been successfully submitted.',
        confirmButtonColor: '#3085d6'
      });

      // 2. تنظيف الحقول
      this.Massagenew = '';
      this.selectedReviewId = null;

      // 3. إعادة تحميل الريفيوز
      this.loadReviews();

      // 4. إغلاق المودال
      const modal = document.getElementById('exampleModal');
      if (modal) {
        const modalInstance = this.bootstrap.Modal.getInstance(modal);
        modalInstance?.hide();
      }
    },
    error: err => {
      console.error('Error sending reply:', err);

      // رسالة خطأ حلوة
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
