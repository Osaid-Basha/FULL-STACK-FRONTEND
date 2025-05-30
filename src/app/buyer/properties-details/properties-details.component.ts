import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyBuyerService } from '../../services/property-buyer.service';

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.css'],
  standalone: false
})
export class PropertiesDetailsComponent implements OnInit {
  propertyId!: number;
  property: any;

  constructor(private route: ActivatedRoute, private propertyService: PropertyBuyerService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.propertyId = +idParam;

      // أولاً نحاول جلب البيانات من الـ API
      this.propertyService.getPropertyDetails(this.propertyId).subscribe({
        next: (data) => {
          this.property = data; // ✅ تم جلب البيانات الحقيقية
        },
        error: () => {
          // ❌ إذا فشل جلب البيانات من API، نأخذ البيانات من state إذا كانت موجودة
          const stateData = history.state?.data;
          if (stateData) {
            this.property = stateData; // ✅ بيانات وهمية مرسلة من الكارد
          } else {
            this.property = null; // ❌ لا توجد بيانات نهائياً
          }
        }
      });
    }
  }
}
