import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-proparty',
  standalone: false,
  templateUrl: './agent-proparty.component.html',
  styleUrl: './agent-proparty.component.css'
})
export class AgentPropartyComponent implements OnInit {
  @Input() agent: any;
  agentProperties: any[] = [];

  dummyProperties = [
    {
      id: 1,
      title: 'Luxury Villa',
      price: '$100,000',
      image: 'assets/img/properties/01.jpg',
      agentId: 7
    },
    {
      id: 2,
      title: 'Studio Apartment',
      price: '$40,000',
      image: 'assets/img/properties/02.jpg',
      agentId: 3
    },
    {
      id: 3,
      title: 'Modern Office',
      price: '$150,000',
      image: 'assets/img/properties/03.jpg',
      agentId: 7
    }
  ];

  ngOnInit(): void {
    if (this.agent) {
      this.agentProperties = this.dummyProperties.filter(
        (prop) => prop.agentId === this.agent.id
      );
    }
  }
}
