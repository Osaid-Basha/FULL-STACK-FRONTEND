import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfailBuyerComponent } from './profail-buyer.component';

describe('ProfailBuyerComponent', () => {
  let component: ProfailBuyerComponent;
  let fixture: ComponentFixture<ProfailBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfailBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfailBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
