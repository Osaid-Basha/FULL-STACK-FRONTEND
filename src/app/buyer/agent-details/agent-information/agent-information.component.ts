import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-information',
  standalone: false,
  templateUrl: './agent-information.component.html',
  styleUrl: './agent-information.component.css'
})
export class AgentInformationComponent {
  agent = {
    name: 'Alexander Kaminski',
    designation: 'Property Consultant',
    about: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation',
    activeListings: 7,
    experienceSince: 2019,
    areas: 'Brazil',
    language: 'English, Brazil',
    forRent: 193,
    forSell: 633,
    commercial: 10,
    image: 'assets/img/avatar/01.jpg',
  };
}
