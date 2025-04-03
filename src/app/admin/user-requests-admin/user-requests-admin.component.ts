import { Component } from '@angular/core';

@Component({
  selector: 'app-user-requests-admin',
  standalone: false,
  templateUrl: './user-requests-admin.component.html',
  styleUrl: './user-requests-admin.component.css'
})
export class UserRequestsAdminComponent {
  requests = [
    {
      name: 'Ahmad Yousef',
      email: 'ahmad@gmail.com',
      type: 'Buyer',
      location: 'Nablus',
      message: 'I would like to inquire about the listing in Rafidia.'
    },
    {
      name: 'Lina Hasan',
      email: 'lina@agentmail.com',
      type: 'Agent',
      location: 'Ramallah',
      message: 'I want to follow up with the buyer who messaged me.'
    },
    // ...
];
}


