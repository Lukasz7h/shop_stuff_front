import { TestBed } from '@angular/core/testing';

import { GuardAddStuffService } from './guard-add-stuff.service';

describe('GuardAddStuffService', () => {
  let service: GuardAddStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardAddStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
