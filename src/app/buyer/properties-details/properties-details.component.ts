

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-properties-details',
  standalone: false,
  templateUrl: './properties-details.component.html',
  styleUrl: './properties-details.component.css'
})

export class PropertiesDetailsComponent implements OnInit {

  propertyId!: number;
  property: any;

  properties = [
    {
      id: 1,
      image: 'assets/img/properties/01.jpg',
      tag: 'For Rent',
      price: '1,200',
      period: 'month',
      title: 'Luxury Apartment in Downtown',
      location: '1123 Fictional St, San Francisco, CA',
      description: 'A modern apartment with all necessary amenities near the city center.',
      bedrooms: 2,
      bathrooms: 2,
      size: '80 m²'
    },
    {
      id: 2,
      image: 'assets/img/properties/02.jpg',
      tag: 'For Sale',
      price: '250,000',
      period: 'once',
      title: 'Spacious Family Villa',
      location: 'Palm Jumeirah, Dubai, UAE',
      description: 'A spacious and fully furnished villa with sea view.',
      bedrooms: 4,
      bathrooms: 3,
      size: '300 m²'
    }
    // كمل بياناتك هون
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.propertyId = +idParam;
        this.property = this.properties.find(p => p.id === this.propertyId);
      }
    });
  }
}
