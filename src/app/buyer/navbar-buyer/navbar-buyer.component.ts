import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-buyer',
  standalone: false,
  templateUrl: './navbar-buyer.component.html',
  styleUrl: './navbar-buyer.component.css'
})
export class NavbarBuyerComponent implements OnInit {
   // لتغيير كلاس الخلفية عند التمرير
   isScrolled = false;

   // لإظهار الشعار عند التمرير لمسافة معينة
   showLogo = false;

   constructor(private router: Router) {}

   logout() {
     // امسح بيانات المستخدم من التخزين المحلي
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('userType');

     // تحويل المستخدم إلى صفحة تسجيل الدخول
     this.router.navigate(['/login']);
   }

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
