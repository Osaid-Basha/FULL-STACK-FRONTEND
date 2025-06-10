import { Component, OnInit } from '@angular/core';
import { PropertyBuyerService } from '../../../services/property-buyer.service';
import { FavoriteService } from '../../../services/favorite.service';
import { MessageService } from '../../../services/message.service'; // <--- استيراد MessageService
import { Router } from '@angular/router'; // <--- استيراد Router

@Component({
  standalone:false,
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit {
  filters: any = {};
  properties: any[] = [];

  constructor(
    private propertyService: PropertyBuyerService,
    private favoriteService: FavoriteService,
    private messageService: MessageService, // <--- حقن MessageService
    private router: Router // <--- حقن Router
  ) {}

  currentPage: number = 1;
  itemsPerPage: number = 6; // عدد البطاقات في كل صفحة

  get totalPages(): number {
    return Math.ceil(this.properties.length / this.itemsPerPage);
  }

  get paginatedProperties() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.properties.slice(start, end);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.loadAllProperties();
  }

  onFiltersChanged(filters: any): void {
    this.filters = filters;
    this.currentPage = 1;

    const hasFilters = Object.keys(this.filters || {}).length > 0;

    const request = hasFilters
      ? this.propertyService.searchProperties(this.filters)
      : this.propertyService.getAllProperties();

    request.subscribe(
      res => this.handleResponse(res),
      err => console.error('Error loading properties:', err)
    );
  }

  loadAllProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      res => this.handleResponse(res),
      err => console.error('Error loading properties:', err)
    );
  }

  handleResponse(res: any): void {
    const data = Array.isArray(res) ? res : res.data || [];
    this.properties = data.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: `$${p.price}`,
      image: p.images?.[0]?.imageUrl
        ? `http://127.0.0.1:8000/storage/${p.images[0].imageUrl}`
        : 'assets/img/default-property.jpg',
      tag: p.listing_type?.name?.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale',
      tagColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'white' : 'primary',
      tagTextColor: p.listing_type?.name?.toLowerCase() === 'rent' ? 'text-dark' : 'text-white',
      address: p.address || p.city || 'No address',
      size: `${p.livingArea} m²`,
      description: p.shortDescreption || 'No description available',
      beds: p.bedroom,
      baths: p.bathroom,
      period: 'month',
      isFavorited: false,
      // تأكد أن هذه الحقول تأتي من الباك إند
      // إذا كان الباك إند يرسل معرف الوكيل كـ 'user_id' ضمن كائن العقار الرئيسي، استخدم p.user_id
      agent_id: p.user_id, // <--- هام جداً: تأكد من هذا السطر
      // إذا كان الباك إند يرسل بيانات الوكيل ضمن كائن 'user' داخل العقار، استخدم المسارات التالية:
      agent_phone: p.user?.profile?.phone, // <--- تأكد من المسار الصحيح لرقم الهاتف
      agent_email: p.user?.email // <--- تأكد من المسار الصحيح للبريد الإلكتروني
    }));
  }

  toggleFavorite(event: Event, property: any): void {
    event.stopPropagation();

    if (!property.isFavorited) {
      this.favoriteService.addFavorite(property.id).subscribe({
        next: () => {
          property.isFavorited = true;
          console.log('Favorite added:', property);
        },
        error: (err) => {
          console.error(' Error adding favorite:', err);
        }
      });
    } else {
      this.favoriteService.deleteFavorite(property.id).subscribe({
        next: () => {
          property.isFavorited = false;
          console.log('Favorite removed:', property);
        },
        error: (err) => {
          console.error('Error removing favorite:', err);
        }
      });
    }
  }

  // دالة لفتح الشات الداخلي مع الوكيل
  contactAgent(event: Event, agentId: number): void {
    event.stopPropagation(); // منع تفعيل رابط البطاقة

    if (!agentId) {
      console.error('Agent ID is not available for this property. Cannot start chat.');
      alert('Could not start chat, agent data is unavailable for this property.');
      return;
    }

    this.messageService.startChat(agentId)
      .subscribe({
        next: (response) => {
          console.log('Chat started:', response);
          const receiverId = response.receiver_id; // أو response.user_id حسب استجابة الباك إند

          if (receiverId) {
            this.messageService.setTempReceiverId(receiverId);
            this.router.navigate(['/buyerHome/maseege-buyer']); // المسار الصحيح لصفحة الشات
          } else {
            console.error('Receiver ID not received from backend or is null/undefined.');
            alert('Error: Receiver ID not received from the server.');
          }
        },
        error: (error) => {
          console.error('Error contacting agent or starting chat:', error);
          if (error.status === 401) {
            alert('You must be logged in to start a chat.');
            this.router.navigate(['/login']);
          } else if (error.status === 404) {
            alert('Agent not found or chat user not found.');
          } else {
            alert('An error occurred while trying to start the chat. Please try again later.');
          }
        }
      });
  }

  // دالة الاتصال المباشر
  callAgent(event: Event, phoneNumber: string): void {
    event.stopPropagation();
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert('Phone number not available.');
    }
  }

  // دالة إرسال الإيميل المباشر
  emailAgent(event: Event, emailAddress: string): void {
    event.stopPropagation();
    if (emailAddress) {
      window.location.href = `mailto:${emailAddress}`;
    } else {
      alert('Email address not available.');
    }
  }

  // دالة فتح شات الواتساب مع رسالة ترحيبية
  whatsappAgent(event: Event, phoneNumber: string, propertyTitle: string): void {
    event.stopPropagation(); // منع تفعيل رابط البطاقة

    if (phoneNumber) {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, ''); // إزالة أي رموز غير أرقام

      // رسالة ترحيبية جاهزة
      const message = encodeURIComponent(`مرحباً! أنا مهتم بالعقار "${propertyTitle}". هل يمكنني الحصول على مزيد من المعلومات؟`);

      const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${message}`;

      window.open(whatsappUrl, '_blank'); // فتح الرابط في نافذة/تبويب جديد
    } else {
      alert('WhatsApp number not available for this agent.');
    }
  }
}
