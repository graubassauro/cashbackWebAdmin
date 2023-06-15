import { TestBed } from '@angular/core/testing';

import { ErroAlertService } from './erro-alert.service';

describe('ErroAlertService', () => {
  let service: ErroAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErroAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
