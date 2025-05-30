import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-proparties-info',
  standalone: false,
  templateUrl: './proparties-info.component.html',
  styleUrls: ['./proparties-info.component.css']
})
export class PropartiesInfoComponent {
  @Input() property: any;

  get address() {
    return this.property?.location || this.property?.address;
  }

  get host() {
    return this.property?.title?.split('by')?.[1]?.trim();
  }

  get bedrooms() {
    return this.property?.bedrooms ?? this.property?.beds;
  }

  get bathrooms() {
    return this.property?.bathrooms ?? this.property?.baths;
  }

  get area() {
    return this.property?.size;
  }

  get price() {
    return this.property?.price;
  }

  get yearBuilt() {
    return this.property?.yearBuilt;
  }

  get floorPlanImage() {
    return this.property?.floorPlanImage || 'assets/img/png-img/floor-plans.png';
  }

  get propertyType() {
    return this.property?.type;
  }

   get agent () {
     return this.property?.agent || {
       name: 'Alexander Kaminski',
       title: 'Property Advisor',
       image: 'assets/img/avatar/01.jpg',
       link: 'agent-details.html'
     };
   }
  about: string[] = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting."
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
    { icon: 'fa-solid fa-utensils', name: 'Kitchen Appliances' }
  ];

  showFeedbackForm = false;

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
      title: '"Great location"',
      content: 'Amazing property and great service!',
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

    this.feedback = {
      rating: 0,
      title: '',
      comment: '',
      name: '',
      username: '',
      image: 'assets/img/avatar/01.jpg'
    };
  }
  form = {
    phone: '',
    date: '',
    email: ''
  };

  scheduleTour() {
    console.log('Schedule Tour Info:', this.form);
  }

  requestQuote() {
    console.log('Request Quote Info:', this.form);
  }

}
