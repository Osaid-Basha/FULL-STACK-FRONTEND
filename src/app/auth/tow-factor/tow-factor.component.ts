import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:false,
  selector: 'app-two-factor',
  templateUrl: './tow-factor.component.html',
  styleUrls: ['./tow-factor.component.css']
})
export class TowFactorComponent implements OnInit {
  email: string = '';
  code: string[] = new Array(4).fill('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('emailFor2FA') || '';

    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name^="digit"]');
      inputs.forEach((input: any, index: number) => {
        input.addEventListener('paste', (event: ClipboardEvent) => {
          const pastedText = event.clipboardData?.getData('text') || '';
          if (pastedText.length === this.code.length) {
            this.code = pastedText.slice(0, this.code.length).split('');
            this.cdr.detectChanges();
            setTimeout(() => (inputs[this.code.length - 1] as HTMLInputElement).focus(), 50);
          }
          event.preventDefault();
        });
      });
    }, 100);
  }

  autoFocusNext(event: any, index: number): void {
    const input = event.target as HTMLInputElement;


    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }


    this.code[index] = input.value;


    if (input.value && input.nextElementSibling) {
      (input.nextElementSibling as HTMLInputElement).focus();
    }


    if (!input.value && event.inputType === 'deleteContentBackward' && input.previousElementSibling) {
      (input.previousElementSibling as HTMLInputElement).focus();
    }


    if (index === this.code.length - 1 && input.value) {
      this.verifyCode();
    }
  }

  verifyCode(): void {
    const fullCode = this.code.join('');
    const userId = localStorage.getItem('userIdFor2FA');

    if (fullCode.length !== this.code.length || !userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete',
        text: 'Please enter all digits of the code.'
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
