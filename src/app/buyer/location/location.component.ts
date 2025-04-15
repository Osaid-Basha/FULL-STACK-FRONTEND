import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-location',
  standalone: false,
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: false
    });
  }
}
