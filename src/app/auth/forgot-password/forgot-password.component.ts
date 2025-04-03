import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';

  onReset() {
    if (this.email) {
      // Simulate sending email
      console.log(` Password reset link sent to: ${this.email}`);
      alert(`Instructions sent to ${this.email}`);
    }
  }
}
