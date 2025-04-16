import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar-agent',
  standalone: false,
  templateUrl: './navbar-agent.component.html',
  styleUrls: ['./navbar-agent.component.css']
})
export class NavbarAgentComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // مراقبة السكروول
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const navbar = document.querySelector('.main-navbar');
      if (!navbar) return;

      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
}
