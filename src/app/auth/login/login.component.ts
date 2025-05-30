import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  userType = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('🚀 LoginComponent تم تحميله');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(event?: Event): void {
    event?.preventDefault();

    if (!this.userType || !this.email || !this.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields and select user type.'
      });
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password,
      role: this.userType
    };

    this.authService.login(loginData).subscribe({
      next: (res) => {
        // ✅ دائماً نطلب التحقق الثنائي
        if (res.user_id) {
          localStorage.setItem('userIdFor2FA', res.user_id.toString());
          localStorage.setItem('emailFor2FA', this.email);
          localStorage.setItem('roleFor2FA', this.userType);

          Swal.fire({
            icon: 'info',
            title: '2FA Required',
            text: 'A verification code has been sent to your email.'
          });

          this.router.navigate(['/twofactor']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Unexpected Response',
            text: 'Could not proceed. Please try again.'
          });
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Login failed. Please try again.'
        });
      }
    });
  }
}
