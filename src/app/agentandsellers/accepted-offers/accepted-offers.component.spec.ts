import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedOffersComponent } from './accepted-offers.component';

describe('AcceptedOffersComponent', () => {
  let component: AcceptedOffersComponent;
  let fixture: ComponentFixture<AcceptedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
