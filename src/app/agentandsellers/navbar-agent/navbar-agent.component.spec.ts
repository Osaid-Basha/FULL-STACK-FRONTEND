import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAgentComponent } from './navbar-agent.component';

describe('NavbarAgentComponent', () => {
  let component: NavbarAgentComponent;
  let fixture: ComponentFixture<NavbarAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
