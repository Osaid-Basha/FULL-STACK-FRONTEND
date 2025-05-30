import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  userType: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreedToTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignUp() {
    if (!this.agreedToTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms Required',
        text: 'Please accept the terms to continue.'
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.'
      });
      return;
    }

    const roleMapping: any = {
      admin: 1,
      agent: 2,
      buyer: 3
    };

    const signupData = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
   confirm_password: this.confirmPassword ,// كما هو موضح في Postman

      role_id: roleMapping[this.userType]
    };

    this.authService.register(signupData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Your account has been created.'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration Error:', err);
        const message = this.extractFirstValidationError(err);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: message
        });
      }
    });
  }

  private extractFirstValidationError(error: any): string {
    if (error?.error?.errors) {
      const firstKey = Object.keys(error.error.errors)[0];
      return error.error.errors[firstKey][0];
    }
    return error?.error?.message || 'Something went wrong.';
  }
}
