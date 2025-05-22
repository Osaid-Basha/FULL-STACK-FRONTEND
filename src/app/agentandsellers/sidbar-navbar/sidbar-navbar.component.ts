import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidbar-navbar',
  standalone: false,
  templateUrl: './sidbar-navbar.component.html',
  styleUrls: ['./sidbar-navbar.component.css']

})
export class SidbarNavbarComponent {
  sidebarVisibleOnMobile: boolean = false;

  toggleSidebar() {
    this.sidebarVisibleOnMobile = !this.sidebarVisibleOnMobile;
  }
}
