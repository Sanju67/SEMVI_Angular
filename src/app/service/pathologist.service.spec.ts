import { TestBed } from '@angular/core/testing';

import { PathologistService } from './pathologist.service';

describe('PathologistService', () => {
  let service: PathologistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathologistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
