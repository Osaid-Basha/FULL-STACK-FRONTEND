import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  userType = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.userType) {
      alert('Please select a user type');
      return;
    }


    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('userType', this.userType);
    }

    if (this.userType === 'admin') {
      window.location.href = '/admin-dashboard';
    } else if (this.userType === 'agent') {
      window.location.href = '/agent-dashboard';
    } else if (this.userType === 'buyer') {
      window.location.href = '/buyerHome';
    }
    console.log('Login clicked');
console.log('Selected userType:', this.userType);
console.log('Saved to localStorage:', localStorage.getItem('userType'));

  }


}
