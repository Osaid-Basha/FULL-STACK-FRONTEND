import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidbar-navbar',
  standalone: false,
  templateUrl: './sidbar-navbar.component.html',
  styleUrls: ['./sidbar-navbar.component.css']
})
export class SidbarNavbarComponent {
  sidebarVisibleOnMobile: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.sidebarVisibleOnMobile = !this.sidebarVisibleOnMobile;
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.clearSession();
      this.router.navigate(['/login']);
      return;
    }

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
      error: (err) => {
        console.error('Logout error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: err.error?.message || 'Something went wrong.'
        });
        this.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  }
}
