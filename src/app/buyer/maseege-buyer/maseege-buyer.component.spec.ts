import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaseegeBuyerComponent } from './maseege-buyer.component';

describe('MaseegeBuyerComponent', () => {
  let component: MaseegeBuyerComponent;
  let fixture: ComponentFixture<MaseegeBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaseegeBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaseegeBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
