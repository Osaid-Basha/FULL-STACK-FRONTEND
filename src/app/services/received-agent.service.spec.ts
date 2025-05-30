import { TestBed } from '@angular/core/testing';

import { ReceivedAgentService } from './received-agent.service';

describe('ReceivedAgentService', () => {
  let service: ReceivedAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
