 import { Component , OnInit } from '@angular/core';
import * as AOS  from 'aos';
import {AgentService} from '../../../services/agent-buyer.service';

 @Component({
  selector: 'app-agent-list',
  standalone: false,
  templateUrl: './agent-list.component.html',
  styleUrls:[ './agent-list.component.css']
})
export class AgentListComponent implements OnInit {
   agents: any[] = [];
   allAgents: any[] = [];
   searchTerm: string = '';
   noAgentMatches = false;

   constructor(private agentService: AgentService) {
   }

   dummyAgents = [
     {
       id: 1,
       name: 'Alexander Kaminski',
       title: 'Property Consultant',
       image: 'assets/img/avatar/01.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 2,
       name: 'Edwin Martins',
       title: 'Property Advisor',
       image: 'assets/img/avatar/02.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 3,
       name: 'Wade Warren',
       title: 'Property Manager',
       image: 'assets/img/avatar/03.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 4,
       name: 'John Carter',
       title: 'Property Consultant',
       image: 'assets/img/avatar/04.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 5,
       name: 'Sophie Moore',
       title: 'Property Consultant',
       image: 'assets/img/avatar/05.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 6,
       name: 'Naeem Khan',
       title: 'Property Consultant',
       image: 'assets/img/avatar/06.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 7,
       name: 'Alexander Kaminski',
       title: 'Property Consultant',
       image: 'assets/img/avatar/01.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 8,
       name: 'Edwin Martins',
       title: 'Property Advisor',
       image: 'assets/img/avatar/02.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 9,
       name: 'Wade Warren',
       title: 'Property Manager',
       image: 'assets/img/avatar/03.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 10,
       name: 'John Carter',
       title: 'Property Consultant',
       image: 'assets/img/avatar/04.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 11,
       name: 'Sophie Moore',
       title: 'Property Consultant',
       image: 'assets/img/avatar/05.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     },
     {
       id: 12,
       name: 'Naeem Khan',
       title: 'Property Consultant',
       image: 'assets/img/avatar/06.jpg',
       forRent: 193,
       forSell: 633,
       commercial: 10
     }
   ];

   ngOnInit(): void {
     AOS.init({duration: 800, once: false});
     this.loadInitialAgents();
   }

   loadInitialAgents(): void {
     this.agentService.getAllAgents().subscribe({
       next: (res: any[]) => {
         if (Array.isArray(res) && res.length > 0) {
           this.allAgents = res;
         } else {
           console.warn('✅ API فاضي، عرض dummy.');
           this.allAgents = this.dummyAgents;
         }
this.agents= [...this.allAgents];
       },
       error: () => {
         console.warn('❌ API خطأ، عرض dummy.');
         this.allAgents = this.dummyAgents;
         this.agents= [...this.allAgents];
       }
     });
   }

   searchAgents(): void {
     const keyword = this.searchTerm.trim().toLowerCase();

     if (!keyword) {
       this.agents = [...this.allAgents];
       this.noAgentMatches = false;
       return;
     }

     const filtered = this.allAgents.filter(agent =>
       agent.name.toLowerCase().includes(keyword)
     );

     this.agents = filtered;
     this.noAgentMatches = filtered.length === 0;
   }
 }
