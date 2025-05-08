import { Component } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-reviews-agent',
  standalone: false,
  templateUrl: './reviews-agent.component.html',
  styleUrl: './reviews-agent.component.css'
})
export class ReviewsAgentComponent {
  search: string = '';

  reviews = [
    {
      id:1,
      name: 'Zubayer Al Hasan',
      date: '17 Aug, 23',
      rating: 4.7,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/img/profile3.png',
      images: ['assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png'],
      likeCount:0,

    },
    {
      id:2,
      name: 'Rashed Kabir',
      date: '13 Jun,2000',
      rating: 4.9,
      comment: ' my house dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/img/profile2.png',
      images: ['assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png'],
      likeCount:0,

    },
    {
      id:3,
      name: 'Menna kharma',
      date: '13 Jun, 23',
      rating: 4.9,
      comment: ' my house dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/img/profile2.png',
      images: ['assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png'],
      likeCount:0,

    }
  ];


  likeCount: number = 0
  incrementLikes(review:any): void {
    review.likeCount++;
  }
  isVisible: boolean = true;
  filteredReviews() {
    const filtered = this.reviews.filter(input =>
      input.name.toLowerCase().includes(this.search.toLowerCase()) ||
      input.comment.toLowerCase().includes(this.search.toLowerCase()) ||
      input.date.toLowerCase().includes(this.search.toLowerCase())
    );
    return this.paginateReviews(filtered);
  }

  currentPage = 1;
  cardsPerPage = 2;
  paginateReviews(data: any[]) {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    return data.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  cards = [
    { id: 1, content: 'Card 1 Content', isVisible: true },
    { id: 2, content: 'Card 2 Content', isVisible: true },
    { id: 3, content: 'Card 3 Content', isVisible: true }
  ];


Massagenew:String='';
  Sendmassage()
  {
  this.Massagenew= '';

  }
  ngOnInit(){
    AOS.init();
  }



}




