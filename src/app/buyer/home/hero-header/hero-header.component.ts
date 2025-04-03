import { Component ,OnInit} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.css']
})
export class HeroHeaderComponent implements OnInit {
  backgroundImage: string = '';

  ngOnInit(): void {
    const imagePath = 'assets/img/properties/01.jpg';
    this.backgroundImage = `url('${imagePath}')`;
  }
}
