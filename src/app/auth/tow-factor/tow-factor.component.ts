import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-tow-factor',
  templateUrl: './tow-factor.component.html',
  styleUrls: ['./tow-factor.component.css']
})
export class TowFactorComponent implements OnInit {
  email: string = '';
  code: string[] = ['', '', '', ''];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('emailFor2FA') || '';
  }

  verifyCode(): void {
  const fullCode = this.code.join('');
  const userId = localStorage.getItem('userIdFor2FA');

  if (fullCode.length !== 4 || !userId) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete',
      text: 'Please enter all 4 digits of the code.'
    });
    return;
  }


 const rememberMe = localStorage.getItem('rememberMe') === 'true';
const data = {
  user_id: +userId,
  code: fullCode,
  remember_me: rememberMe
};




  this.authService.verify2FA(data).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.removeItem('userIdFor2FA');
      localStorage.removeItem('emailFor2FA');
      localStorage.removeItem('roleFor2FA');

      // ✅ لو rememberMe مفعّل وبيّن trusted_token من السيرفر
      if (rememberMe && res.trusted_token) {
  localStorage.setItem('trusted_token', res.trusted_token);
  localStorage.removeItem('rememberMe');
}


      Swal.fire({
        icon: 'success',
        title: '2FA Verified',
        text: 'You have logged in successfully!'
      }).then(() => {
        const role = res.user?.role?.type?.toLowerCase();
        switch (role) {
          case 'admin': this.router.navigate(['/admin-dashboard']); break;
          case 'agent': this.router.navigate(['/agent-dashboard']); break;
          case 'buyer': this.router.navigate(['/buyerHome']); break;
          default: this.router.navigate(['/']);
        }
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: err.error?.message || 'Invalid or expired code.'
      });
    }
  });
}


  resendCode(): void {
    const userId = localStorage.getItem('userIdFor2FA');

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User ID not found. Please login again.'
      });
      this.router.navigate(['/login']);
      return;
    }

    this.authService.resend2FACode(+userId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'info',
          title: 'Code Sent',
          text: 'A new verification code has been sent to your email.'
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not resend code. Try again later.'
        });
      }
    });
  }
}
