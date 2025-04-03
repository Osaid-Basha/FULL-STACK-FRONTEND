import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsAgentComponent } from './reviews-agent.component';

describe('ReviewsAgentComponent', () => {
  let component: ReviewsAgentComponent;
  let fixture: ComponentFixture<ReviewsAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
