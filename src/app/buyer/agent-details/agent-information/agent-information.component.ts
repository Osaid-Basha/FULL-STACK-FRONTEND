import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-agent-information',
  standalone: false,
  templateUrl: './agent-information.component.html',
  styleUrls: ['./agent-information.component.css']
})
export class AgentInformationComponent implements OnInit, AfterViewInit {
  @Input() agent: any;

  showFeedbackForm = false;
  hoverRating = 0;

  feedback = {
    rating: 4.8,
    title: '',
    comment: '',
    name: '',
    username: '',
    image: 'assets/img/avatar/01.jpg'
  };

  testimonials: any[] = [];

  ngOnInit(): void {
    if (this.agent?.reviews?.length) {
      this.testimonials = this.agent.reviews.map((review: any) => ({
        name: review.user?.first_name + ' ' + review.user?.last_name || 'Anonymous',
        username: review.user?.email?.split('@')[0] || 'user',
        image: 'assets/img/avatar/01.jpg',
        title: review.title,
        content: review.content,
        rating: review.rating
      }));
    }
  }

  get fullName(): string {
    return `${this.agent?.first_name ?? ''} ${this.agent?.last_name ?? ''}`.trim();
  }

  get imagePath(): string {
    return this.agent?.profile?.imag_path
      ? `http://localhost:8000/storage/${this.agent.profile.imag_path}`
      : 'assets/img/avatar/01.jpg';
  }

  get phone(): string {
    return this.agent?.profile?.phone ?? 'N/A';
  }

  get location(): string {
    return this.agent?.profile?.location ?? 'N/A';
  }

  get forRent(): number {
    return this.agent?.property?.filter((p: any) => p.property_listing_id === 1).length || 0;
  }

  get forSell(): number {
    return this.agent?.property?.filter((p: any) => p.property_listing_id === 2).length || 0;
  }

  get commercial(): number {
    return this.agent?.property?.filter((p: any) => p.property_type_id === 3).length || 0;
  }

  addFeedback() {
    const newFeedback = {
      name: this.feedback.name,
      username: this.feedback.username,
      image: this.feedback.image,
      title: this.feedback.title,
      content: this.feedback.comment,
      rating: this.feedback.rating
    };

    this.testimonials.push(newFeedback);
    this.showFeedbackForm = false;

    this.feedback = {
      rating: 0,
      title: '',
      comment: '',
      name: '',
      username: '',
      image: 'assets/img/avatar/01.jpg'
    };
  }

  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: false });
  }
}
