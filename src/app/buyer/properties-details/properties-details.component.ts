import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyBuyerService } from '../../services/property-buyer.service';

@Component({
  selector: 'app-properties-details',
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.css'],
  standalone: false
})
export class PropertiesDetailsComponent implements OnInit {
  property: any;
  propertyId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyBuyerService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.propertyId = +idParam;

      this.propertyService.getPropertyDetails(this.propertyId).subscribe({
        next: (data: any) => {
          // ✅ نتأكد من صحة البيانات اللي رجعت من الباك
          if (data && Object.keys(data).length > 0) {
            this.property = data;
          } else {
            // ❌ داتا ناقصة → نرجع لـ state
            const stateData = history.state?.data;
            if (stateData) {
              this.property = stateData;
            } else {
              this.router.navigate(['/buyerHome/properties']);
            }
          }
        },
        error: () => {
          // ❌ فشل الاتصال → نرجع لـ state
          const stateData = history.state?.data;
          if (stateData) {
            this.property = stateData;
          } else {
            this.router.navigate(['/buyerHome/properties']);
          }
        }
      });

    } else {
      this.router.navigate(['/buyerHome/properties']);
    }
  }
}
