import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassegeBuyerComponent } from './massege-buyer.component';

describe('MassegeBuyerComponent', () => {
  let component: MassegeBuyerComponent;
  let fixture: ComponentFixture<MassegeBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MassegeBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassegeBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
