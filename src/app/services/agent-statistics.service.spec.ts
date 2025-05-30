import { TestBed } from '@angular/core/testing';

import { AgentStatisticsService } from './agent-statistics.service';

describe('AgentStatisticsService', () => {
  let service: AgentStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
