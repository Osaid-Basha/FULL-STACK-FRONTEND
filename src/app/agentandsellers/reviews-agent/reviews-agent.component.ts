import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews-agent',
  standalone: false,
  templateUrl: './reviews-agent.component.html',
  styleUrl: './reviews-agent.component.css'
})
export class ReviewsAgentComponent {
  reviews = [
    {
      name: 'Zubayer Al Hasan',
      date: '17 Aug, 23',
      rating: 4.7,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/users/user1.jpg',
      images: ['assets/review1.jpg', 'assets/review2.jpg', 'assets/review3.jpg']
    },
    {
      name: 'Rashed Kabir',
      date: '13 Jun, 23',
      rating: 4.9,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/users/user2.jpg',
      images: ['assets/review4.jpg', 'assets/review5.jpg', 'assets/review6.jpg', 'assets/review7.jpg', 'assets/review8.jpg']
    },
    {
      name: 'Perty Jinta',
      date: '17 Aug, 23',
      rating: 4.7,
      comment: 'Amet amet id cursus dignissim. Eget vitae amet tempus sit mattis. Integer semper condimentum nunc augue aliquet quam.',
      image: 'assets/users/user3.jpg',
      images: []
    },
    {
      name: 'Milon Ahmed',
      date: '07 Jun, 23',
      rating: 4.7,
      comment: 'Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/users/user4.jpg',
      images: []
    }
  ];
}
