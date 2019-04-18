import { TestBed } from '@angular/core/testing';

import { SaveGamesService } from './save-games.service';

describe('SaveGamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveGamesService = TestBed.get(SaveGamesService);
    expect(service).toBeTruthy();
  });
});
