import { Component } from '@angular/core';

@Component({
  selector: 'app-proparties-info',
  standalone: false,
  templateUrl: './proparties-info.component.html',
  styleUrls: ['./proparties-info.component.css']
})
export class PropartiesInfoComponent {
  // Basic Property Info
  address = '1123 Fictional St, San Francisco, CA 94103';
  host = 'Wayan';
  bedrooms = 3;
  bathrooms = 3;
  area = 620;
  yearBuilt = 2010;
  price = 18000;
  propertyType = 'Property for rent';
  floorPlanImage = 'assets/img/png-img/floor-plans.png';

  about: string[] = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.,It has survived not only five centuries, but also the leap into electronic typesetting."
  ];

  amenities = [
    { icon: 'fa-solid fa-video', name: 'Security cameras' },
    { icon: 'fa-solid fa-fan', name: 'Garden' },
    { icon: 'fa-solid fa-hot-tub-person', name: 'Jacuzzi' },
    { icon: 'fa-solid fa-tv', name: 'Television' },
    { icon: 'fa-solid fa-dumbbell', name: 'Gym (100m²)' },
    { icon: 'fa-solid fa-temperature-arrow-down', name: 'Heater' },
    { icon: 'fa-solid fa-wifi', name: 'Wi-fi' },
    { icon: 'fa-solid fa-person-swimming', name: 'Shared Pool' },
    { icon: 'fa-solid fa-chair', name: 'Furnished' },
    { icon: 'fa-solid fa-square-parking', name: 'Covered Parking' },
    { icon: 'fa-solid fa-utensils', name: 'Kitchen Appliances' },
  ];

  agent = {
    name: 'Alexander Kaminski',
    title: 'Property Advisor',
    image: 'assets/img/avatar/01.jpg',
    link: 'agent-details.html'
  };

  form = {
    phone: '',
    email: '',
    date: ''
  };

  scheduleTour() {
    console.log('Scheduling tour with info:', this.form);
  }

  requestQuote() {
    console.log('Requesting quote with info:', this.form);
  }

  // Feedback Logic
  showFeedbackForm = false;
  hoverRating = 0;

  feedback = {
    rating: 0,
    title: '',
    comment: '',
    name: '',
    username: '',
    image: 'assets/img/avatar/01.jpg'
  };

  testimonials = [
    {
      name: 'Naeem Khan',
      username: 'naeemkhan',
      image: 'assets/img/avatar/01.jpg',
      title: '"magnis dis parturient montes"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Asif Ikbal',
      username: 'asifikbal',
      image: 'assets/img/avatar/02.jpg',
      title: '"aliquam ultrices sagittis orci a"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Tuhin Sorker',
      username: 'tuhinsorker',
      image: 'assets/img/avatar/03.jpg',
      title: '"sagittis id consectetur purus ut"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Mubin Bhai',
      username: 'mubinbhai',
      image: 'assets/img/avatar/04.jpg',
      title: '"dictumst vestibulum rhoncus est"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Mehedi Hasan',
      username: 'mehedihasan',
      image: 'assets/img/avatar/05.jpg',
      title: '"ultrices mi tempus imperdiet nulla"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Miranda Holmes',
      username: 'mirandaholmes',
      image: 'assets/img/avatar/06.jpg',
      title: '"risus ultricies tristique nulla aliquet"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    }
  ];

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

    // Reset fields
    this.feedback = {
      rating: 0,
      title: '',
      comment: '',
      name: '',
      username: '',
      image: 'assets/img/avatar/01.jpg'
    };
  }
}
