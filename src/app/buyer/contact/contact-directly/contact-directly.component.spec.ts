import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDirectlyComponent } from './contact-directly.component';

describe('ContactDirectlyComponent', () => {
  let component: ContactDirectlyComponent;
  let fixture: ComponentFixture<ContactDirectlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactDirectlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDirectlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
