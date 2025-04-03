import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // انتبه تكون styleUrls بصيغة الجمع
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  userType = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.email || !this.password || !this.userType) {
      alert('Please fill in all fields');
      return;
    }

    // نحفظ نوع المستخدم في localStorage
    localStorage.setItem('userType', this.userType);

    // التنقل حسب نوع المستخدم
    if (this.userType === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (this.userType === 'agent') {
      this.router.navigate(['/agent-dashboard']);
    } else if (this.userType === 'buyer') {
      this.router.navigate(['/buyerHome']);
    }
  }
}
