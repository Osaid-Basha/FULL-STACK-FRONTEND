import { Component, OnInit } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';

@Component({
  selector: 'app-featured-properties',
  standalone: false,
  templateUrl: './featured-properties.component.html',
  styleUrl: './featured-properties.component.css'
})
export class FeaturedPropertiesComponent implements OnInit {
  featuredProperties: any[] = [];

  constructor(private propertyService: PropertyBuyerService) {}

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  loadFeaturedProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : res.data || [];

        // خذ أول 3 عقارات فقط
        this.featuredProperties = data.slice(0, 3).map((p: any) => ({
          id: p.id,
          title: p.title,
          location: `${p.address}, ${p.city}`,
          description: p.shortDescreption || 'No description available',
          tag: p.listing_type?.name?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale',
          tagColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'bg-white text-dark' : 'bg-primary text-white',
          image: p.images?.[0]?.imageUrl
            ? `http://127.0.0.1:8000/storage/${p.images[0].imageUrl}`
            : 'assets/img/default-property.jpg',
          bedrooms: p.bedroom || 0,
          bathrooms: p.bathroom || 0,
          area: `${p.livingArea} m²`,
          price: `$${p.price}`,
          per: 'month'
        }));
      },
      error: (err) => {
        console.error('❌ Failed to load featured properties:', err);
      }
    });
  }
}
