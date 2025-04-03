import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';

@Component({
  standalone: false,

  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      const footerElement = this.elRef.nativeElement.querySelector('.background-image');

      if (footerElement) {
        const imageSrc = footerElement.getAttribute('data-image-src');
        if (imageSrc) {
          footerElement.style.backgroundImage = `url('${imageSrc}')`;
          footerElement.style.backgroundSize = 'cover';
          footerElement.style.backgroundPosition = 'center';
          footerElement.style.backgroundRepeat = 'no-repeat';
        }
      }

      // تهيئة مكتبة AOS
      AOS.init();
    }
  }
}
