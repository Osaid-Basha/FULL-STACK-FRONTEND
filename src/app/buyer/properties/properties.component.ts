import { Component } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
  standalone:false,
})
export class PropertiesComponent {
  currentFilters: any = {};

  onFiltersChanged(filters: any) {
    this.currentFilters = filters;
  }
}
