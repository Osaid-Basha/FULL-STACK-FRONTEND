import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
    console.log('🚀 LoginComponent تم تحميله');
  }



  onUpdatePassword() {
    if (this.newPassword.length < 6) {
      Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    const data = {
      token: this.token,
      email: this.email,
      password: this.newPassword,
      password_confirmation: this.confirmPassword
    };

    this.authService.resetPassword(data).subscribe({
      next: () => {
        Swal.fire('Success', 'Password has been updated successfully.', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Reset error:', err);
        Swal.fire('Error', err.error?.message || 'Something went wrong.', 'error');
      }
    });
  }
}
