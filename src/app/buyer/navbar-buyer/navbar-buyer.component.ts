import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-buyer',
  standalone: false,
  templateUrl: './navbar-buyer.component.html',
  styleUrls: ['./navbar-buyer.component.css'] // ✅ تصحيح من styleUrl إلى styleUrls
})
export class NavbarBuyerComponent implements OnInit {
  isScrolled = false;
  showLogo = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
    // امسح بيانات المستخدم من التخزين المحلي
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }

    // تحويل المستخدم إلى صفحة تسجيل الدخول
    this.router.navigate(['/login']);
  }

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
