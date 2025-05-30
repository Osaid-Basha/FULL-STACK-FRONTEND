// forgot-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onReset() {
  if (!this.email) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Email',
      text: 'Please enter your email address.'
    });
    return;
  }

  this.authService.forgotPassword(this.email).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Email Sent',
        text: `Reset instructions were sent to ${this.email}.`,
        timer: 2500,
        showConfirmButton: false
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send',
        text: err.error?.message || 'Something went wrong.'
      });
    }
  });
}

}
