
import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';


@Component({
  selector: 'app-property-header',
  standalone: false,
  templateUrl: './property-header.component.html',
  styleUrls: ['./property-header.component.css']
})


export class PropertyHeaderComponent implements OnInit {
  @Input() filters: any = {};
@Output() filterChange : EventEmitter<any> = new EventEmitter();
  backgroundImage: string = '';

  // الموقع
  location: string = '';  //DONE
  isLocationValid: boolean = true;
  locationTouched: boolean = false;

  type: string = ''  //DONE
  // السعر
  min_price: string = '';
  max_price: string = '';
  isValidPrice: boolean = true;
 listingTypeId: string = ''; // Rent / Sale
  keyword: string = '';

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
      const maxValid =this.max_price.trim() === '' || pattern.test(this.max_price.trim());
      this.isValidPrice = minValid && maxValid;
    }

  applyFilter() {
    this.validateLocation();
    this.validatePrice();
     if (this.isLocationValid && this.isValidPrice) {
      this.filterChange.emit({
  location: this.location,
  min_price: this.min_price,
  max_price: this.max_price,
  listing_type_id: this.listingTypeId,
  keyword: this.keyword,
  type: this.type
});


     }
  }
}
