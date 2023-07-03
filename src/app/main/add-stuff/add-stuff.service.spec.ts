import { TestBed } from '@angular/core/testing';

import { AddStuffService } from './add-stuff.service';

describe('AddStuffService', () => {
  let service: AddStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
