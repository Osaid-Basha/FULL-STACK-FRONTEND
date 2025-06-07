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
  property: any = null;
  propertyId!: number;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyBuyerService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.router.navigate(['/buyerHome/properties']);
      return;
    }

    this.propertyId = +idParam;

    this.propertyService.getPropertyDetails(this.propertyId).subscribe({
      next: (data: any) => {
        this.isLoading = false;

        if (data && Object.keys(data).length > 0) {
          this.property = data;
          if (this.property?.user?.profile?.imag_path) {
  this.property.user.profile.imag_path = `http://localhost:8000/${this.property.user.profile.imag_path}`;
}

        } else {
          this.tryFallbackOrRedirect();
        }
      },
      error: () => {
        this.isLoading = false;
        this.tryFallbackOrRedirect();
      }
    });
  }

  tryFallbackOrRedirect() {
    const stateData = history.state?.data;
    if (stateData) {
      this.property = stateData;
    } else {
      this.router.navigate(['/buyerHome/properties']);
    }
  }
}
