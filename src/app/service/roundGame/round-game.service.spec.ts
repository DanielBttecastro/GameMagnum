import { TestBed } from '@angular/core/testing';

import { RoundGameService } from './round-game.service';

describe('RoundGameService', () => {
  let service: RoundGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
