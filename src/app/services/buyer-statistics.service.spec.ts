import { TestBed } from '@angular/core/testing';

import { BuyerStatisticsService } from './buyer-statistics.service';

describe('BuyerStatisticsService', () => {
  let service: BuyerStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
