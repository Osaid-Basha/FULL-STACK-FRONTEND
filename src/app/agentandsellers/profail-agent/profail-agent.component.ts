import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-profail-agent',
  standalone: false,
  templateUrl: './profail-agent.component.html',
  styleUrl: './profail-agent.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ProfailAgentComponent {

}
