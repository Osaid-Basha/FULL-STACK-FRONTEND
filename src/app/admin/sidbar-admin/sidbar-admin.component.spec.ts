import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarAdminComponent } from './sidbar-admin.component';

describe('SidbarAdminComponent', () => {
  let component: SidbarAdminComponent;
  let fixture: ComponentFixture<SidbarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidbarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidbarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
