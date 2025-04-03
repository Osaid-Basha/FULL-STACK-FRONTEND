import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPropartyComponent } from './agent-proparty.component';

describe('AgentPropartyComponent', () => {
  let component: AgentPropartyComponent;
  let fixture: ComponentFixture<AgentPropartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentPropartyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPropartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
