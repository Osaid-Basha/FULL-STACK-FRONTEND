import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erorr505Component } from './erorr-505.component';

describe('Erorr505Component', () => {
  let component: Erorr505Component;
  let fixture: ComponentFixture<Erorr505Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Erorr505Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erorr505Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
