import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  min_price: string = '';
  max_price: string = '';
  keyword: string = '';
  isValidPrice: boolean = true;
  listing_Type_id: string = ''; // Rent / Sale
  type: string = ''; // Property type (numeric as string)

  constructor(private router: Router) {
  }

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
    const pattern = /^[0-9]+$/;

    const minValid = this.min_price.trim() === '' || pattern.test(this.min_price.trim());
    const maxValid = this.max_price.trim() === '' || pattern.test(this.max_price.trim());
    this.isValidPrice = minValid && maxValid;
  }

  goToSearchResults() {
    this.validateLocation();
    this.validatePrice();

    if (this.isLocationValid && this.isValidPrice) {
      const queryParams: any = {
        location: this.location || '',
        min_price: this.min_price || '',
        max_price: this.max_price || '',
        listing_type_id: this.listing_Type_id || '',
        type: this.type || '',
        keyword: this.keyword || ''
      };

      this.router.navigate(['/buyerHome/properties-grid'], {queryParams});
    }
  }
}
