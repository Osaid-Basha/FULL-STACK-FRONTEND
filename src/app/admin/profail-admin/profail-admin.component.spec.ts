import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfailAdminComponent } from './profail-admin.component';

describe('ProfailAdminComponent', () => {
  let component: ProfailAdminComponent;
  let fixture: ComponentFixture<ProfailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
