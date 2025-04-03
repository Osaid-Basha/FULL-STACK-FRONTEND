import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRegionsComponent } from './top-regions.component';

describe('TopRegionsComponent', () => {
  let component: TopRegionsComponent;
  let fixture: ComponentFixture<TopRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopRegionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
