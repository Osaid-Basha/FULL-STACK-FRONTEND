import { Component } from '@angular/core';

@Component({
  selector: 'app-remove-admin',
  standalone: false,
  templateUrl: './remove-admin.component.html',
  styleUrl: './remove-admin.component.css'
})
export class RemoveAdminComponent {
  searchTerm: string = '';

  items = [
    {
      name: 'Ali Mahmoud',
      email: 'ali@gmail.com',
      location: 'Ramallah, Palestine',
      reason: 'Fake listing with no real contact info.',
      type: 'Listing'
    },
    {
      name: 'Fatima Zaid',
      email: 'fatima@hotmail.com',
      location: 'Nablus, Palestine',
      reason: 'Reported spam activity and misleading title.',
      type: 'User'
    },
    {
      name: 'Kareem Saleh',
      email: 'kareem@outlook.com',
      location: 'Hebron, Palestine',
      reason: 'Duplicate property added multiple times.',
      type: 'Listing'
    }
  ];

  removeItem(itemToRemove: any) {
    this.items = this.items.filter(item => item !== itemToRemove);
  }

  filteredItems() {
    if (!this.searchTerm) return this.items;

    const term = this.searchTerm.toLowerCase();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.reason.toLowerCase().includes(term)
    );
  }

}
