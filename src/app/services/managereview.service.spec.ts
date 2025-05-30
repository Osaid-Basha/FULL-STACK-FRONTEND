import { TestBed } from '@angular/core/testing';

import { ManagereviewService } from './managereview.service';

describe('ManagereviewService', () => {
  let service: ManagereviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagereviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
