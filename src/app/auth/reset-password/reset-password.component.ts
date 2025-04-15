import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  onUpdatePassword() {
    if (this.newPassword.length >= 6 && this.newPassword === this.confirmPassword) {
      // Simulate password update
      console.log('Password updated successfully');
      alert('Your password has been updated successfully.');
    } else {
      alert('Please ensure passwords match and meet the criteria.');
    }
  }
}
