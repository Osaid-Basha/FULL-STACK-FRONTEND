import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-counter-content',
  templateUrl: './counter-content.component.html',
  styleUrls: ['./counter-content.component.css']
})
export class CounterContentComponent implements AfterViewInit {

  @ViewChildren('counter') counters!: QueryList<ElementRef>;

  // ✅ نستقبل القيم من الـ @Input
  @Input() propertiesListed: number = 3000;
  @Input() satisfiedClients: number = 2500;
  @Input() totalSales: number = 6.8; // بالمليار
  @Input() totalAgents: number = 593;

  // بنرتب القيم بنفس ترتيب العناصر في الـ HTML
  values: (number | string)[] = [];

  ngAfterViewInit(): void {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    // ربط القيم بترتيب العناصر في الـ HTML
    this.values = [
      this.propertiesListed,
      this.satisfiedClients,
      `$ ${this.totalSales}B`,
      this.totalAgents
    ];

    this.counters.forEach((counterRef: ElementRef, index: number) => {
      const el = counterRef.nativeElement as HTMLElement;
      const value = this.values[index];

      let target: number;
      let isCurrency = false;
      let isBillion = false;

      if (typeof value === 'string') {
        const clean = value.replace(/[^\d.]/g, '');
        target = parseFloat(clean);
        isCurrency = value.includes('$');
        isBillion = value.includes('B');
      } else {
        target = value;
      }

      let start = 0;
      const stepValue = target / steps;

      const interval = setInterval(() => {
        start += stepValue;

        if (start >= target) {
          el.innerText = isCurrency
            ? `$ ${target}${isBillion ? 'B' : ''}`
            : `${target}`;
          clearInterval(interval);
        } else {
          el.innerText = isCurrency
            ? `$ ${Math.floor(start)}${isBillion ? 'B' : ''}`
            : `${Math.floor(start)}`;
        }
      }, stepTime);
    });
  }
}
