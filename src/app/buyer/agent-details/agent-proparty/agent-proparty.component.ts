import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-property',
  templateUrl: './agent-proparty.component.html',
  styleUrls: ['./agent-proparty.component.css'],
  standalone: false
})
export class AgentPropartyComponent implements OnInit {
  @Input() agent: any;
  agentProperties: any[] = [];

  ngOnInit(): void {
  if (this.agent?.property?.length) {
    this.agentProperties = this.agent.property.map((prop: any, index: number) => ({
  ...prop,
  image: prop.images?.length > 0
    ? `http://localhost:8000/storage/${prop.images[0].imageUrl}` // 🟢 تعديل هنا
    : 'assets/img/property/default.jpg',
  beds: prop.bedroom || 0,
  baths: prop.bathroom || 0,
  size: prop.livingArea ? `${prop.livingArea} m²` : 'N/A',
  description: prop.shortDescreption || 'No description available',
  tag: prop.property_type?.type || 'Featured',
  period: prop.listing_type?.name || 'Month',
  aosDelay: index * 100
}));

  }
}


}
