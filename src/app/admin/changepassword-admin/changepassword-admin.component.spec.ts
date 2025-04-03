import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordAdminComponent } from './changepassword-admin.component';

describe('ChangepasswordAdminComponent', () => {
  let component: ChangepasswordAdminComponent;
  let fixture: ComponentFixture<ChangepasswordAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangepasswordAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
