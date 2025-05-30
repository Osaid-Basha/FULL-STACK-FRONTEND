import { TestBed } from '@angular/core/testing';

import { PropertyBuyerService } from './property-buyer.service';

describe('PropertyBuyerService', () => {
  let service: PropertyBuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyBuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
