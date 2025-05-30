
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ProfileService } from '../../services/profile.service';

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
  selector: 'app-profail-admin',
  standalone: false,
  templateUrl: './profail-admin.component.html',
  styleUrl: './profail-admin.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfailAdminComponent implements OnInit {

  profileData!: ProfileData;
  profileImage: string | null = null;
  selectedImage: File | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.profileImage = data.imag_url;
      },
      error: (err) => {
        console.error('Failed to load data:', err);
      }
    });
  }
  removeImage(): void {
    this.profileService.removeProfilePicture().subscribe({
      next: (res) => {
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
        next: (res) => {
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
      next: (res) => {
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
}
