import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erorr404Component } from './erorr-404.component';

describe('Erorr404Component', () => {
  let component: Erorr404Component;
  let fixture: ComponentFixture<Erorr404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Erorr404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erorr404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
