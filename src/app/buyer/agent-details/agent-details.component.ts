import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../../services/agent-buyer.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css'],
  standalone:false
})
export class AgentDetailsComponent implements OnInit {
  agent: any = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getAgentData();
  }

  getAgentData(): void {
    this.agentService.getAgentById(this.id).subscribe({
      next: (res: any) => {
        this.agent = res;
      },
      error: () => {
        // console.warn(' فشل API، عرض من state');
        this.agent = history.state.data;
      }
    });
  }
}
