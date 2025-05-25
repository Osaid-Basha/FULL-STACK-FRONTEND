import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPropertiesComponent } from './buyer-properties.component';

describe('BuyerPropertiesComponent', () => {
  let component: BuyerPropertiesComponent;
  let fixture: ComponentFixture<BuyerPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyerPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
