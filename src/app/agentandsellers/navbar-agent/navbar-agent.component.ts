import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-navbar-agent',
  standalone: false,
  templateUrl: './navbar-agent.component.html',
  styleUrls: ['./navbar-agent.component.css']
})
export class NavbarAgentComponent implements OnInit{
  profileImage: string | null = null;



  ngOnInit(): void {
    this.loadProfileImage();
  }

  loadProfileImage(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileImage = data.imag_url;
      },
      error: (err) => {
        console.error('Failed to load profile image:', err);
      }
    });
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object , private profileService: ProfileService) {}

  // مراقبة السكروول
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const navbar = document.querySelector('.main-navbar');
      if (!navbar) return;

      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
}
