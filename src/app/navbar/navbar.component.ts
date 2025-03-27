import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // لتغيير الكلاس على حسب السكروول
  isScrolled = false;
  showLogo = false;

  constructor() { }

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;

    // إضافة كلاس خلفية عند التمرير
    this.isScrolled = scrollY > 0;

    // عرض الشعار بعد سكروول أكثر من 81
    this.showLogo = scrollY >= 81;
  }

  // زر إغلاق القائمة في الموبايل
  closeNavbar(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
