import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter-and-blog',
  standalone: false,
  templateUrl: './newsletter-and-blog.component.html',
  styleUrls: ['./newsletter-and-blog.component.css']
})
export class NewsletterAndBlogComponent {
  // بيانات العنوان العلوي
  newsletter = {
    subtitle: 'Our Latest Articles',
    title: 'Want to join us?',
    description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
  };

  // المقالات الرئيسية
  articles = [
    {
      title: 'Eu Feugiat Pretium Nibh Ipsum Consequat Nisl Vel Pretium Lectus',
      category: 'Construction',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/lg-01.jpg'
    },
    {
      title: 'Ullamcorper A Lacus Vestibulum Sed Arcu Non Odio Euismod Lacinia',
      category: 'Design',
      date: 'Jun 23, 2023',
      image: 'assets/img/blog/lg-02.jpg'
    }
  ];

  // قائمة المدونات المصغرة
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

  // -------------------------
  // فاليديشن Join Now
  // -------------------------
  fullName: string = '';
  email: string = '';

  isValidName: boolean = true;
  isValidEmail: boolean = true;

  nameTouched: boolean = false;
  emailTouched: boolean = false;

  // تحقق من الاسم (حروف فقط أو حروف + مسافات)
  validateName() {
    if (this.fullName.trim() === '') {
      this.isValidName = true; // مسموح يظل فاضي
      return;
    }
    const pattern = /^[a-zA-Z\s]+$/;
    this.isValidName = pattern.test(this.fullName.trim());
  }

  validateEmail() {
    if (this.email.trim() === '') {
      this.isValidEmail = true; // مسموح يظل فاضي
      return;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isValidEmail = pattern.test(this.email.trim());
  }
}
