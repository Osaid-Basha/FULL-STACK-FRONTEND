import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentandsellersComponent } from './agentandsellers.component';

describe('AgentandsellersComponent', () => {
  let component: AgentandsellersComponent;
  let fixture: ComponentFixture<AgentandsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentandsellersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentandsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
