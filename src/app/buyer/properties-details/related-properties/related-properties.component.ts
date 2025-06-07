import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';

@Component({
  standalone: false,
  selector: 'app-related-properties',
  templateUrl: './related-properties.component.html',
  styleUrls: ['./related-properties.component.css']
})
export class RelatedPropertiesComponent implements OnChanges {
  @Input() currentProperty: any;
  moreProperties: any[] = [];

  constructor(private propertyService: PropertyBuyerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProperty'] && this.currentProperty) {
      this.loadRelated();
    }
  }

  loadRelated(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data: any) => {
        this.moreProperties = data
          .filter((item: any) =>
            item.id !== this.currentProperty.id &&
            item.city === this.currentProperty.city &&
            item.property_type?.type === this.currentProperty.property_type?.type
          )
          .slice(0, 4); // عرض 4 عقارات فقط
      },
      error: err => console.error('Error loading related properties:', err)
    });
  }
}
