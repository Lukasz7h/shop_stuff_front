import { TestBed } from '@angular/core/testing';

import { GuardResetService } from './guard-reset.service';

describe('GuardResetService', () => {
  let service: GuardResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
