import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVideoComponent } from './about-video.component';

describe('AboutVideoComponent', () => {
  let component: AboutVideoComponent;
  let fixture: ComponentFixture<AboutVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
