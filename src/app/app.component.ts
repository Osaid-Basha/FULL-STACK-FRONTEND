import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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
}
