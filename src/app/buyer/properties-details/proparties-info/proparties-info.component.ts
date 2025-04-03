import { Component } from '@angular/core';

@Component({
  selector: 'app-proparties-info',
  standalone: false,
  templateUrl: './proparties-info.component.html',
  styleUrls: ['./proparties-info.component.css']
})
export class PropartiesInfoComponent {

  // Basic Property Info
  address: string = '1123 Fictional St, San Francisco, CA 94103';
  host: string = 'Wayan';
  bedrooms: number = 3;
  bathrooms: number = 3;
  area: number = 620;
  yearBuilt: number = 2010;
  price: number = 18000;
  propertyType: string = 'Property for rent';
  floorPlanImage: string = 'assets/img/png-img/floor-plans.png';

  // About Property
  about: string[] = [
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,

    `It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.`
  ];

  // Amenities List
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

  // Agent Info
  agent = {
    name: 'Alexander Kaminski',
    title: 'Property Advisor',
    image: 'assets/img/avatar/01.jpg',
    link: 'agent-details.html'
  };

  // Form Data
  form = {
    phone: '',
    email: '',
    date: ''
  };

  // Methods
  scheduleTour() {
    console.log('Scheduling tour with info:', this.form);

  }

  requestQuote() {
    console.log('Requesting quote with info:', this.form);

  }
}
