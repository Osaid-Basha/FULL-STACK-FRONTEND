import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowFactorComponent } from './tow-factor.component';

describe('TowFactorComponent', () => {
  let component: TowFactorComponent;
  let fixture: ComponentFixture<TowFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TowFactorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TowFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
