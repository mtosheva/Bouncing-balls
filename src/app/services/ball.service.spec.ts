import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallService } from './ball.service';

describe('BallService', () => {
  let component: BallService;
  let mockCircleService: jasmine.SpyObj<CanvasRenderingContext2D>;
  let fixture: ComponentFixture<BallService>;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BallService = TestBed.get(BallService);
    expect(service).toBeTruthy();
  });
});
