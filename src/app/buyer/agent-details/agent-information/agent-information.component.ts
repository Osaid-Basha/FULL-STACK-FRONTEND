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

  testimonials = [
    {
      name: 'Naeem Khan',
      username: 'naeemkhan',
      image: 'assets/img/avatar/01.jpg',
      title: '"magnis dis parturient montes"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Asif Ikbal',
      username: 'asifikbal',
      image: 'assets/img/avatar/02.jpg',
      title: '"aliquam ultrices sagittis orci a"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Tuhin Sorker',
      username: 'tuhinsorker',
      image: 'assets/img/avatar/03.jpg',
      title: '"sagittis id consectetur purus ut"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Mubin Bhai',
      username: 'mubinbhai',
      image: 'assets/img/avatar/04.jpg',
      title: '"dictumst vestibulum rhoncus est"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Mehedi Hasan',
      username: 'mirandaholmes',
      image: 'assets/img/avatar/05.jpg',
      title: '"ultrices mi tempus imperdiet nulla"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    },
    {
      name: 'Miranda Holmes',
      username: 'mirandaholmes',
      image: 'assets/img/avatar/06.jpg',
      title: '"risus ultricies tristique nulla aliquet"',
      content: 'Lorem ipsum dolor amet consectetur cillum adipiscing elit sed do eiusmod.',
      rating: 4.8
    }
  ];
}


