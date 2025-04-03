import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter-and-blog',
  standalone: false,
  templateUrl: './newsletter-and-blog.component.html',
  styleUrl: './newsletter-and-blog.component.css'
})
export class NewsletterAndBlogComponent {
  newsletter = {
    subtitle: 'Our Latest Articles',
    title: 'Want to join us?',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  };

  articles = [
    {
      title: 'Eu Feugiat Pretium Nibh Ipsum Consequat Nisl Vel Pretium Lectus',
      category: 'Construction',
      date: 'Jun 23, 2023',
      image: 'assets/01.jpg'
    },
    {
      title: 'Ullamcorper A Lacus Vestibulum Sed Arcu Non Odio Euismod Lacinia',
      category: 'Design',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/lg-02.jpg'
    }
  ];

  blogList = [
    {
      title: 'eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus',
      category: 'Construction',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/01-sm.jpg'
    },
    {
      title: 'ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt?',
      category: 'Design',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/02-sm.jpg'
    },
    {
      title: 'fames ac turpis egestas integer eget aliquet nibh praesent tristique',
      category: 'Renovation',
      date: 'Jun 23, 2023',
      image: 'assets/01.jpg'
    },
    {
      title: 'ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia',
      category: 'Design',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/04-sm.jpg'
    }
  ];
}
