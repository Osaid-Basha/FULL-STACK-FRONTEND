import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';



@Component({
  selector: 'app-account-admin',
  standalone: false,
  templateUrl: './account-admin.component.html',
  styleUrl: './account-admin.component.css'
})
export class AccountAdminComponent implements OnInit{
  profileForm!: FormGroup;
  originalData: any;

  constructor(private fb: FormBuilder, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.email]],
      phone: [''],
      password: ['']
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.originalData = data;

      // فصل user و profile
      const user = data.user;
      const profile = data.profile;

      this.profileForm.patchValue({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: profile.phone || '',
        password: '********'
      });
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;

      const payload = {

        first_name: formValues.first_name,
        last_name: formValues.last_name,
        email: formValues.email,


        phone: formValues.phone
      };

      this.profileService.updateProfile(payload).subscribe({
        next: () => alert('Profile updated successfully.'),
        error: () => alert('Failed to update profile.')
      });
    }
  }

  onCancel(): void {
    this.loadProfile();
  }

}
