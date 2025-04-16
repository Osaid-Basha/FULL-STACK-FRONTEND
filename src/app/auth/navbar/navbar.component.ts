import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  showLogo = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY;
      this.isScrolled = scrollY > 0;
      this.showLogo = scrollY >= 81;
    }
  }

  closeNavbar(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
      if (navbarCollapse?.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}
