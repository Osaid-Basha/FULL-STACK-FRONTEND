import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AgentService } from '../../../services/agent-buyer.service';

@Component({
  selector: 'app-agent-grid',
  standalone: false,
  templateUrl: './agent-grid.component.html',
  styleUrls: ['./agent-grid.component.css']
})
export class AgentGridComponent implements OnInit {
  agents: any[] = [];
  allAgents: any[] = [];
  searchTerm: string = '';
  noAgentMatches: boolean = false;

  constructor(private agentService: AgentService) {}

  dummyAgents = [/* نفس الموجود */];

  ngOnInit(): void {
    AOS.init({ duration: 800, once: false });
    this.loadInitialAgents();
  }

  loadInitialAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (res: any[]) => {
        if (Array.isArray(res) && res.length > 0) {
          // تعديل وتحضير بيانات العرض
          this.allAgents = res.map(agent => ({
            id: agent.id,
            name: `${agent.first_name} ${agent.last_name}`,
            title: agent.profile?.current_position || 'Property Consultant',
            image: agent.profile?.imag_path
              ? `http://localhost:8000/storage/${agent.profile.imag_path}`
              : 'assets/img/avatar/01.jpg',
            phone: agent.profile?.phone || '',
            email: agent.email || '',
            forRent: 193,
            forSell: 633,
            commercial: 10
          }));
        } else {
          console.warn('✅ API فاضي، عرض dummy.');
          this.allAgents = this.dummyAgents;
        }

        this.agents = [...this.allAgents];
      },
      error: () => {
        console.warn('❌ API خطأ، عرض dummy.');
        this.allAgents = this.dummyAgents;
        this.agents = [...this.allAgents];
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
