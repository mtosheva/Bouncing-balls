import { TestBed } from '@angular/core/testing';

import { PhysicsCalculationsService } from './physics-calculations.service';

describe('PhysicsCalculationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhysicsCalculationsService = TestBed.get(PhysicsCalculationsService);
    expect(service).toBeTruthy();
  });
});
