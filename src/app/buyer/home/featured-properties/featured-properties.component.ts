import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-properties',
  standalone: false,
  templateUrl: './featured-properties.component.html',
  styleUrl: './featured-properties.component.css'
})
export class FeaturedPropertiesComponent {
  featuredProperties = [
    {
      title: 'Entire villa hosted by Wayan',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation',
      tag: 'For Sale',
      tagColor: 'bg-primary text-white',
      image: 'assets/img/properties/01.jpg',
      bedrooms: 3,
      bathrooms: 3,
      area: '620 sqft',
      price: '$17,966',
      per: 'month'
    },
    {
      title: 'Tampaksiring, Indonesia',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation',
      tag: 'For Rent',
      tagColor: 'bg-white text-dark',
      image: 'assets/img/properties/02.jpg',
      bedrooms: 3,
      bathrooms: 3,
      area: '620 sqft',
      price: '$17,966',
      per: 'month'
    },
    {
      title: 'Belle Mare, Mauritius',
      location: '1123 Fictional St, San Francisco, CA 94103',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation',
      tag: 'For Sale',
      tagColor: 'bg-primary text-white',
      image: 'assets/img/properties/03.jpg',
      bedrooms: 3,
      bathrooms: 3,
      area: '620 sqft',
      price: '$17,966',
      per: 'month'
    },
    
  ];
}
