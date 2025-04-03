import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropartiesInfoComponent } from './proparties-info.component';

describe('PropartiesInfoComponent', () => {
  let component: PropartiesInfoComponent;
  let fixture: ComponentFixture<PropartiesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropartiesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropartiesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
