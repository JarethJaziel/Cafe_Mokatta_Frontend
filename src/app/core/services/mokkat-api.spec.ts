import { TestBed } from '@angular/core/testing';

import { MokkatAPIService } from './mokkat-api.service';

describe('MokkatAPIService', () => {
  let service: MokkatAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MokkatAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
