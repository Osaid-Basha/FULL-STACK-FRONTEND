import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterContentComponent } from './counter-content.component';

describe('CounterContentComponent', () => {
  let component: CounterContentComponent;
  let fixture: ComponentFixture<CounterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
