import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestsAdminComponent } from './user-requests-admin.component';

describe('UserRequestsAdminComponent', () => {
  let component: UserRequestsAdminComponent;
  let fixture: ComponentFixture<UserRequestsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRequestsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRequestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
