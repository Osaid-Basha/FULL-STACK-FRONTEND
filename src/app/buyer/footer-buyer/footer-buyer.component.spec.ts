import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBuyerComponent } from './footer-buyer.component';

describe('FooterBuyerComponent', () => {
  let component: FooterBuyerComponent;
  let fixture: ComponentFixture<FooterBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
