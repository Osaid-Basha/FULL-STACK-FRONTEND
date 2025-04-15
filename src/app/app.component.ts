import { Component } from '@angular/core';
import * as $ from 'jquery';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  ngOnInit(): void {
    window.addEventListener("load", (): void => {
      // Preloader
      setTimeout(() => {
        const loader = document.querySelector('.page-loader-wrapper') as HTMLElement;
        if (loader) {
          $.default(loader).fadeOut();
        }
      }, 50);
    });
  }
}
