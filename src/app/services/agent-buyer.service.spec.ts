import { TestBed } from '@angular/core/testing';

import { AgentBuyerService } from './agent-buyer.service';

describe('AgentBuyerService', () => {
  let service: AgentBuyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentBuyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
