import { Component } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-profail-agent',
  standalone: false,
  templateUrl: './profail-agent.component.html',
  styleUrls: ['./profail-agent.component.css'],
  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        animate('1s ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(40px)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateY(10px)', offset: 0.7 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
        ]))
      ])
    ])
  ]
})
export class ProfailAgentComponent {}
