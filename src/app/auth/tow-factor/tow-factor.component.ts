import { Component } from '@angular/core';

@Component({
  selector: 'app-tow-factor',
  standalone: false,
  templateUrl: './tow-factor.component.html',
  styleUrl: './tow-factor.component.css'
})
export class TowFactorComponent {
  email: string = 'example@gmail.com'; // Replace this with actual email logic
  code: string[] = ['', '', '', ''];

  verifyCode() {
    const fullCode = this.code.join('');
    if (fullCode.length === 4) {
      console.log('✅ Entered Code:', fullCode);
      // Add verification logic here (API call, etc.)
      alert('Code verified successfully!');
    } else {
      alert('Please enter all 4 digits.');
    }
  }

  resendCode() {
    // Logic to resend the code (API call)
    alert(`A new code has been sent to ${this.email}`);
  }
}
