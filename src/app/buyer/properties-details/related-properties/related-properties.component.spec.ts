import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPropertiesComponent } from './related-properties.component';

describe('RelatedPropertiesComponent', () => {
  let component: RelatedPropertiesComponent;
  let fixture: ComponentFixture<RelatedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedPropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
