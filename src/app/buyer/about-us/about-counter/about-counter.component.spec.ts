import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCounterComponent } from './about-counter.component';

describe('AboutCounterComponent', () => {
  let component: AboutCounterComponent;
  let fixture: ComponentFixture<AboutCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
