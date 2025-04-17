import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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

  localStorage.setItem('userType', this.userType);

  if (this.userType === 'admin') {
    this.router.navigateByUrl('/admin-dashboard');
  } else if (this.userType === 'agent') {
    this.router.navigateByUrl('/agent-dashboard');
  } else if (this.userType === 'buyer') {
    this.router.navigateByUrl('/buyerHome');
  }
}

}
