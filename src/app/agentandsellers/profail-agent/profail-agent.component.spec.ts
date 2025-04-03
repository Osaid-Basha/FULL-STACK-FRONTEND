import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfailAgentComponent } from './profail-agent.component';

describe('ProfailAgentComponent', () => {
  let component: ProfailAgentComponent;
  let fixture: ComponentFixture<ProfailAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfailAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfailAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
