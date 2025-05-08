import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import Chart from 'chart.js/auto';
import AOS from 'aos';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    NgStyle,

  ],
  styleUrl: './manage-reviews.component.css'
})
export class ManageReviewsComponent {
  search: string = '';
  currentPage = 1;
  cardsPerPage = 3;

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
    }
    ,
    {
      name: 'wafa adham',
      email: 'wafa@live.com',
      rating: 4,
      date: '5-5-2025',
      comment: 'so bad.!',
      hidden: false,
      flagged: false,
      image: "assets/371225.jpg"
    }
    ,
    {
      name: 'Hana',
      email: 'Hana@live.com',
      rating: 4,
      date: '19-2-2000',
      comment: 'Good but can improve.!',
      hidden: false,
      flagged: false,
      image: "assets/371225.jpg"
    },

    {
      name: 'KInda',
      email: 'Kinda@live.com',
      rating: 4,
      date: '19-2-2025',
      comment: 'Good but can improve.!',
      hidden: false,
      flagged: false,
      image: "assets/img/profile3.png"
    },
    {
      name: 'yahya basha',
      email: 'yahya@live.com',
      rating: 4,
      date: '19-2-2022',
      comment: 'Good but can improve.!',
      hidden: false,
      flagged: false,
      image: "assets/371225.jpg"
    }, {
      name: 'kharma',
      email: 'kharma@live.com',
      rating: 4,
      date: '19-2-2025',
      comment: 'amazing.!',
      hidden: false,
      flagged: false,
      image: "assets/img/profile3.png"
    },


  ];

  filteredReviews() {
    const filtered = this.reviews.filter(input =>
      input.name.toLowerCase().includes(this.search.toLowerCase()) ||
      input.email.toLowerCase().includes(this.search.toLowerCase()) ||
      input.comment.toLowerCase().includes(this.search.toLowerCase()) ||
      input.date.toLowerCase().includes(this.search.toLowerCase())
    );
    return this.paginateReviews(filtered);
  }

  paginateReviews(data: any[]) {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return data.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }



  ngAfterViewInit(): void {
    new Chart("ratingChart", {
      type: 'bar',
      data: {
        labels: ['1★', '2★', '3★', '4★'],
        datasets: [{
          label: 'Number of Ratings',
          data: [3, 5, 7, 15],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 2
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

  ngOnInit() {
    AOS.init({ duration: 600, once: true });
  }

  cardColors = ['rgba(255, 159, 64,0.10)', 'rgba(75, 192, 192, 0.10)','rgba(255, 205, 86, 0.10)', 'rgba(255, 99, 132,0.10)',];
  cardBorder= ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(255, 205, 86)','rgb(255, 99, 132)',];
  deletecardreview(review: any) {
    Swal.fire({
      title: `Are you sure?`,
      html: `<strong >"${review.name}"</strong> will be permanently deleted.`,
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
        this.reviews = this.reviews.filter(l => l !== review);
        Swal.fire({
          title: 'Deleted!',
          text: `"${review.name}"  Done ,has been removed.`,
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
          background: '#f9fafb',
          customClass: {
            popup: 'rounded-4 shadow border',
            title: 'fw-bold text-dark'
          }
        }).then(r => r !== review);
      }
    });
  }
}
