import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  userType: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreedToTerms: boolean = false;
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignUp() {
    if (!this.agreedToTerms) {
      alert('You must agree to the terms.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Simulate sending data to backend
    console.log('Form Data:', {
      fullName: this.fullName,
      email: this.email,
      userType: this.userType,
      password: this.password
    });

    alert('Registration successful!');
  }
}
