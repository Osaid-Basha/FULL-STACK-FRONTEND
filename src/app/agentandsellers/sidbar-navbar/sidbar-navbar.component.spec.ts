import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarNavbarComponent } from './sidbar-navbar.component';

describe('SidbarNavbarComponent', () => {
  let component: SidbarNavbarComponent;
  let fixture: ComponentFixture<SidbarNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidbarNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidbarNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
