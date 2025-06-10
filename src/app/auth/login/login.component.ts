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


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('🚀 LoginComponent تم تحميله');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(event?: Event): void {
  event?.preventDefault();

  if ( !this.email || !this.password) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',

    });
    return;
  }

  const loginData = {
    email: this.email,
    password: this.password,

    remember_me: this.rememberMe
  };

  this.authService.login(loginData).subscribe({
   next: (res) => {
  if (res.token) {

    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));


    if (res.trusted_token) {
      localStorage.setItem('trusted_token', res.trusted_token);
    }

    Swal.fire({
      icon: 'success',
      title: 'Welcome',
      text: 'Logged in successfully!'
    });

    const role = res.user?.role?.type?.toLowerCase();
    switch (role) {
      case 'admin': this.router.navigate(['/admin-dashboard']); break;
      case 'agent': this.router.navigate(['/agent-dashboard']); break;
      case 'buyer': this.router.navigate(['/buyerHome']); break;
      default: this.router.navigate(['/']);
    }

      } else if (res.user_id) {
  localStorage.setItem('userIdFor2FA', res.user_id.toString());
  localStorage.setItem('emailFor2FA', this.email);



  localStorage.setItem('rememberMe', this.rememberMe.toString());

  Swal.fire({
    icon: 'info',
    title: '2FA Required',
    text: 'A verification code has been sent to your email.'
  });

  this.router.navigate(['/twofactor']);
}

    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.error?.message || 'Login failed. Please try again.'
      });
    }
  });
}

}
