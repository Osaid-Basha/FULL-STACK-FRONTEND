import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypropertiesAgentComponent } from './myproperties-agent.component';

describe('MypropertiesAgentComponent', () => {
  let component: MypropertiesAgentComponent;
  let fixture: ComponentFixture<MypropertiesAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MypropertiesAgentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypropertiesAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
