import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAnalyticsAdminComponent } from './reports-analytics-admin.component';

describe('ReportsAnalyticsAdminComponent', () => {
  let component: ReportsAnalyticsAdminComponent;
  let fixture: ComponentFixture<ReportsAnalyticsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsAnalyticsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsAnalyticsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
