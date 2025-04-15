import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-header',
  standalone: false,
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.css']
})
export class HeroHeaderComponent implements OnInit {

  backgroundImage: string = '';


  location: string = '';
  isLocationValid: boolean = true;
  locationTouched: boolean = false;


  price: string = '';
  isValidPrice: boolean = true;
  priceType: string = ''; // Rent / Sale

  ngOnInit(): void {
    const imagePath = 'assets/img/properties/01.jpg';
    this.backgroundImage = `url('${imagePath}')`;
  }

  validateLocation() {
    if (this.location.trim() === '') {
      this.isLocationValid = true;
      return;
    }

    const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/;
    this.isLocationValid = pattern.test(this.location.trim());
  }

  validatePrice() {
    if (this.price.trim() === '') {
      this.isValidPrice = true;
      return;
    }

    const pattern = /^[0-9]+$/;
    this.isValidPrice = pattern.test(this.price.trim());
  }
}
