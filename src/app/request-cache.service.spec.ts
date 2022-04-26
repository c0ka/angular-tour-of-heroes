import { TestBed } from '@angular/core/testing';

import { RequestCache } from './request-cache.service';

describe('RequestCache', () => {
  let service: RequestCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
