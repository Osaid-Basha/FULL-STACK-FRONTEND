import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordAgentComponent } from './changepassword-agent.component';

describe('ChangepasswordAgentComponent', () => {
  let component: ChangepasswordAgentComponent;
  let fixture: ComponentFixture<ChangepasswordAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangepasswordAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
