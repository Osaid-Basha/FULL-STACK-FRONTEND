import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  showLogo = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
  this.authService.logout().subscribe({
    next: () => {
      this.clearSession(); 
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Logout error:', err);
      this.clearSession();
      this.router.navigate(['/login']);
    }
  });
}



clearSession() {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
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
