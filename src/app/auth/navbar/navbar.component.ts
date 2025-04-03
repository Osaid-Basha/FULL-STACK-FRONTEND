import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  standalone: false,

  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // لتغيير كلاس الخلفية عند التمرير
  isScrolled = false;

  // لإظهار الشعار عند التمرير لمسافة معينة
  showLogo = false;

  constructor() {}

  ngOnInit(): void {}

  // الاستماع لحدث التمرير على النافذة
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY;

    // إذا تم التمرير، أضف كلاس الخلفية
    this.isScrolled = scrollY > 0;

    // إظهار الشعار عند التمرير أكثر من 81px
    this.showLogo = scrollY >= 81;
  }

  // إغلاق الـ Navbar في وضع الموبايل
  closeNavbar(): void {
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse?.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
