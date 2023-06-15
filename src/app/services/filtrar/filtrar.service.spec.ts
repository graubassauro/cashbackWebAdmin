import { TestBed } from '@angular/core/testing';

import { FiltrarService } from './filtrar.service';

describe('FiltrarService', () => {
  let service: FiltrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
