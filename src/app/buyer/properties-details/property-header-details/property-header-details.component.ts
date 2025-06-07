import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-property-header-details',
  templateUrl: './property-header-details.component.html',
  styleUrls: ['./property-header-details.component.css']
})
export class PropertyHeaderDetailsComponent implements OnChanges {
  @Input() property: any;

  title = 'Property Title';
  category = 'Category';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.title = this.property.title || 'Property Title';
      this.category = this.property.property_type?.type || 'Category';
    }
  }
}
