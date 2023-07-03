import { TestBed } from '@angular/core/testing';

import { StuffsService } from './stuffs.service';

describe('StuffsService', () => {
  let service: StuffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StuffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
