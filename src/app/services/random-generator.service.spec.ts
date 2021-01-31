import { TestBed } from '@angular/core/testing';

import { RandomGeneratorService } from './random-generator.service';

describe('RandomGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomGeneratorService = TestBed.get(RandomGeneratorService);
    expect(service).toBeTruthy();
  });
});
