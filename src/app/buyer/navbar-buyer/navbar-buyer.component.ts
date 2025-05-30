import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-buyer',
  standalone: false,
  templateUrl: './navbar-buyer.component.html',
  styleUrls: ['./navbar-buyer.component.css']
})
export class NavbarBuyerComponent implements OnInit {
  isScrolled = false;
  showLogo = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY;
      this.isScrolled = scrollY > 0;
      this.showLogo = scrollY >= 81;
    }
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn(' No token found in localStorage!');
      this.clearSession();
      this.router.navigate(['/login']);
      return;
    }

    console.log(' Logging out with token:', token);

    this.authService.logout().subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been logged out successfully.',
          timer: 1500,
          showConfirmButton: false
        });
        this.clearSession();
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Logout error :', err);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: err.error?.message || 'Something went wrong during logout.'
        });
        this.clearSession(); // بنظف التخزين بأي حال
        this.router.navigate(['/login']);
      }
    });
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  }

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
