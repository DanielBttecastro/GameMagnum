import { TestBed } from '@angular/core/testing';

import { GameManagerService  } from './gameManager.service';

describe('GameManagerService ', () => {
  let service: GameManagerService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameManagerService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
