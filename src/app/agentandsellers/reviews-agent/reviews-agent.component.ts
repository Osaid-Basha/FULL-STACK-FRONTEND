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
      image: 'assets/img/profile3.png',
      images: ['assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png']

    },
    {
      name: 'Rashed Kabir',
      date: '13 Jun, 23',
      rating: 4.9,
      comment: ' my house dolor sit amet consectetur. Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/img/profile2.png',
      images: ['assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png', 'assets/img/regions/house.png']
    },
    {
      name: 'Perty Jinta',
      date: '17 Aug, 23',
      rating: 4.7,
      comment: 'Amet amet id cursus dignissim. Eget vitae amet tempus sit mattis. Integer semper condimentum nunc augue aliquet quam.',
      image: 'assets/img/profile2.png',
      images: ['assets/img/regions/house.png','assets/img/regions/house.png']
    },
    {
      name: 'Milon Ahmed',
      date: '07 Jun, 23',
      rating: 4.7,
      comment: 'Pellentesque sed nulla facilisi diam posuere aliquam suscipit quam.',
      image: 'assets/img/profile3.png',
      images: ['assets/img/regions/house.png','assets/img/regions/house.png']
    }
  ];


}
