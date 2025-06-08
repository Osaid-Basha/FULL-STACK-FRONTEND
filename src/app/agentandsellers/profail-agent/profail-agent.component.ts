import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {ProfileService} from '../../services/profile.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface Profile {
  phone?: string;
  location?: string;
  current_position?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  image_path?: string;
}

interface ProfileData {
  status: number;
  user: User;
  profile: Profile;
  imag_url: string | null;
}

@Component({
  selector: 'app-profail-agent',
  standalone: false,
  templateUrl: './profail-agent.component.html',
  styleUrls: ['./profail-agent.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfailAgentComponent implements OnInit{

  profileData!: ProfileData;
  profileImage: string | null = null;
  selectedImage: File | null = null;
  profileForm!: FormGroup;
  constructor(private profileService: ProfileService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.email]],
      phone: [''],

      location: [''],
      current_position: [''],
      facebook_url: [''],
      twitter_url: [''],
      linkedin_url: [''],
      instagram_url: [''],
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.profileImage = data.imag_url;

        const user = data.user;
        const profile = data.profile;

        this.profileForm.patchValue({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          current_position: profile.current_position || '',
          facebook_url: profile.facebook_url || '',
          twitter_url: profile.twitter_url || '',
          linkedin_url: profile.linkedin_url || '',
          instagram_url: profile.instagram_url || '',
        });
      },
      error: (err) => {
        console.error('Failed to load data:', err);
      }
    });
  }
  removeImage(): void {
    this.profileService.removeProfilePicture().subscribe({
      next: () => {
        this.profileImage = null;
        this.profileData.profile.image_path = '';
      },
      error: (err) => {
        console.error('Failed to delete the image:', err);
      }
    });
  }

  get user() {
    return this.profileData?.user || {};
  }

  get profile() {
    return this.profileData?.profile || {};
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;


    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('image', file);

      this.profileService.updateProfilePicture(formData).subscribe({
        next: () => {
          this.loadProfile();
        },
        error: (err) => {
          console.error('Failed to update the image:', err);
        }
      });
    }
  }

  updateImage(): void {
    if (!this.selectedImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.profileService.updateProfilePicture(formData).subscribe({
      next: () => {
        this.loadProfile();
        this.selectedImage = null;
      },
      error: (err) => {
        console.error('Failed to update the image:', err);
      }
    });
  }
  @ViewChild('imageInput') imageInputRef!: ElementRef<HTMLInputElement>;

  triggerImageInput(): void {
    this.imageInputRef.nativeElement.click();
  }
  saveChanges(): void {
    if (this.profileForm.valid) {
      const payload = this.profileForm.value;

      this.profileService.updateProfile(payload).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully!',
          });
          this.loadProfile();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was a problem updating your profile.',
          });
          console.error('Failed to update profile:', err);
        }
      });
    }
  }
}
