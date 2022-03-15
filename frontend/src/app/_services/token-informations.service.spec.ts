import { TestBed } from '@angular/core/testing';

import { TokenInformationsService } from './token-informations.service';

describe('TokenInformationsService', () => {
  let service: TokenInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
