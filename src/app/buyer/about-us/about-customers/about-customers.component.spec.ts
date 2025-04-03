import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCustomersComponent } from './about-customers.component';

describe('AboutCustomersComponent', () => {
  let component: AboutCustomersComponent;
  let fixture: ComponentFixture<AboutCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
