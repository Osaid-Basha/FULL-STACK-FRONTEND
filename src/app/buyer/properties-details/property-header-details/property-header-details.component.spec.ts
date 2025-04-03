import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHeaderDetailsComponent } from './property-header-details.component';

describe('PropertyHeaderDetailsComponent', () => {
  let component: PropertyHeaderDetailsComponent;
  let fixture: ComponentFixture<PropertyHeaderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropertyHeaderDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyHeaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
