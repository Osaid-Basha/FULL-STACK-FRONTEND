import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgentService } from '../../../services/agent-buyer.service';

@Component({
  standalone:false,
  selector: 'app-proparties-info',
  templateUrl: './proparties-info.component.html',
  styleUrls: ['./proparties-info.component.css']
})
export class PropartiesInfoComponent implements OnChanges {
  @Input() property: any;

  // Basic Property Info
  address = '';
  bedrooms = 'N/A';
  bathrooms = 'N/A';
  area = 'N/A';
  yearBuilt = 'Unknown';
  propertyType = 'Property';
  price = 0;
  about: string[] = [];
  agent: any = null;
  floorPlanImage = 'assets/img/png-img/floor-plans.png';
  amenities: any[] = [];
  testimonials: any[] = [];

  // Forms
  scheduleForm = {
    phone: '',
    date: '',
    email: ''
  };

  quoteForm = {
    phone: '',
    date: '',
    email: ''
  };

  negotiationForm = {
    price: 0,
    phone: '',
    email: '',
    message: ''
  };
reviews: any[] = [];
  constructor(private agentService: AgentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && this.property) {
      this.initializePropertyDetails();
    }
  }

  initializePropertyDetails(): void {
    this.address = `${this.property?.address || ''}, ${this.property?.city || ''}`;
    this.bedrooms = this.property?.bedroom ?? 'N/A';
    this.bathrooms = this.property?.bathroom ?? 'N/A';
    this.area = this.property?.landArea ?? 'N/A';
    this.yearBuilt = this.property?.yearBuilt ?? 'Unknown';
    this.propertyType = this.property?.property_type?.type || 'Property';
    this.price = this.property?.price ?? 0;
    this.about = this.property?.longDescreption ? [this.property.longDescreption] : [];

    this.agent = {
      ...this.property?.user?.profile,
      fullName: `${this.property?.user?.first_name} ${this.property?.user?.last_name}`,
      email: this.property?.user?.email
    };

   this.testimonials = (this.property?.reviews || []).map((review: any) => ({
  title: review.title,
  content: review.content,
  rating: review.rating,
  image: review?.user?.profile?.imag_path
    ? `http://localhost:8000/${review.user.profile.imag_path}`
    : 'assets/img/default-user.png',
  name: `${review.user?.first_name || ''} ${review.user?.last_name || ''}`,
  username: review.user?.email || 'N/A'
}));


    const iconMap: { [key: string]: string } = {
      'Swimming Pool': 'fa-solid fa-person-swimming',
      'Elevator': 'fa-solid fa-elevator',
      'Garden': 'fa-solid fa-leaf',
      'Balcony': 'fa-solid fa-building',
      'Parking': 'fa-solid fa-square-parking',
      'Air Conditioning': 'fa-solid fa-wind',
      'Security System': 'fa-solid fa-shield-halved',
      'Fireplace': 'fa-solid fa-fire',
      'Gym': 'fa-solid fa-dumbbell',
      'Wi-Fi': 'fa-solid fa-wifi'
    };

    this.amenities = (this.property?.amenities || []).map((item: any) => ({
      ...item,
      icon: iconMap[item.name] || 'fa-solid fa-circle-question'
    }));
  }

  scheduleTour() {
    console.log('📅 Tour Scheduled:', this.scheduleForm);
  }

  requestQuote() {
    console.log('📩 Quote Requested:', this.quoteForm);
  }

  proposeNegotiation() {
    const f = this.negotiationForm;
    if (!f.phone || !f.email || !f.price || !f.message) {
      alert('⚠️ Please fill in all required fields before submitting the negotiation.');
      return;
    }

    const payload = {
      property_id: this.property.id,
      proposed_price: f.price,
      phone: f.phone,
      email: f.email,
      message: f.message
    };

    this.agentService.proposeNegotiation(payload).subscribe({
      next: () => {
        alert('✅ Negotiation submitted successfully!');
        this.negotiationForm = {
          price: 0,
          phone: '',
          email: '',
          message: ''
        };
      },
      error: (err) => {
        console.error('❌ Error submitting negotiation:', err);
        alert('❌ An error occurred. Please try again later.');
      }
    });
  }
}
