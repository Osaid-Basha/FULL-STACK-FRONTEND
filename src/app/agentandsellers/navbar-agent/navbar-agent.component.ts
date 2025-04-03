import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar-agent',
  standalone: false,
  templateUrl: './navbar-agent.component.html',
  styleUrls: ['./navbar-agent.component.css']  
})
export class NavbarAgentComponent {

  // مراقبة السكروول
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.main-navbar');
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}
