
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-header',
  standalone: false,
  templateUrl: './property-header.component.html',
  styleUrls: ['./property-header.component.css']
})


export class PropertyHeaderComponent implements OnInit {

  backgroundImage: string = '';

  // الموقع
  location: string = '';
  isLocationValid: boolean = true;
  locationTouched: boolean = false;

  // السعر
  price: string = '';
  isValidPrice: boolean = true;
  priceType: string = ''; // Rent / Sale

  ngOnInit(): void {
    const imagePath = 'assets/img/properties/01.jpg';
    this.backgroundImage = `url('${imagePath}')`;
  }

  // تحقق من الموقع: يسمح بحروف أو أرقام مع حروف، يمنع الفارغات فقط أو أرقام فقط أو رموز
  validateLocation() {
    if (this.location.trim() === '') {
      this.isLocationValid = true; // فارغ مسموح
      return;
    }

    const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/;
    this.isLocationValid = pattern.test(this.location.trim());
  }

  // تحقق من السعر: يسمح فقط بالأرقام أو يكون فارغ
  validatePrice() {
    if (this.price.trim() === '') {
      this.isValidPrice = true; // فارغ مسموح
      return;
    }

    const pattern = /^[0-9]+$/;
    this.isValidPrice = pattern.test(this.price.trim());
  }
}
