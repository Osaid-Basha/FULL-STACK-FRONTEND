import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  OnInit
} from '@angular/core';
import {BuyerStatisticsService} from '../../../services/buyer-statistics.service';

@Component({
  selector: 'app-counter-content',
  templateUrl: './counter-content.component.html',
  styleUrls: ['./counter-content.component.css'],
  standalone: false
})
export class CounterContentComponent implements OnInit, AfterViewInit {

  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  propertiesListed: number = 0;
  totalAgents: number = 0;
  totalCities: number = 0;


  private values: number[] = [];

  constructor(private statsService: BuyerStatisticsService) {}

  ngOnInit(): void {
    this.statsService.getGeneralStats().subscribe({
      next: (data) => {
        this.propertiesListed = Number(data.total_properties);
        this.totalAgents = Number(data.total_agents);
        this.totalCities = Number(data.total_cities);



        this.values = [
          this.propertiesListed,
          this.totalAgents,
          this.totalCities,
        ];
        console.log('General Stats:', data);


        setTimeout(() => this.animateCounters(), 0);
      },
      error: (err) => {
        console.error('Failed to fetch stats:', err);
      }
    });
  }

  ngAfterViewInit(): void {}

  animateCounters(): void {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    this.counters.forEach((counterRef: ElementRef, index: number) => {
      const el = counterRef.nativeElement as HTMLElement;
      const target = this.values[index];

      let start = 0;
      const step = target / steps;

      const interval = setInterval(() => {
        start += step;

        if (start >= target) {
          el.innerText = Math.floor(target).toLocaleString();
          clearInterval(interval);
        } else {
          el.innerText = Math.floor(start).toLocaleString();
        }
      }, stepTime);
    });
  }
}
