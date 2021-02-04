import { TestBed } from '@angular/core/testing';
import { PhysicsCalculationsService } from './physics-calculations.service';

import { RandomGeneratorService } from './random-generator.service';

describe('RandomGeneratorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({})

  );

  beforeEach(() => {
  });


  it('should be created', () => {
    const service: RandomGeneratorService = TestBed.get(RandomGeneratorService);
    expect(service).toBeTruthy();
  });

  it('getRandomSpeed should return 2 if math.random() return 0.6', () => {
    //should return 8 if math.random() return 0.6
    spyOn(Math, 'random').and.returnValue(0.6);
    let speed = RandomGeneratorService.getRandomSpeed();
    expect(speed).toEqual(8);
  });

  it('getRandomSpeed should return between 10 and -10', () => {
    let speed = RandomGeneratorService.getRandomSpeed();
    expect(speed).not.toBeGreaterThan(20);
    expect(speed).not.toBeLessThan(-10);
  });

  it('getRandomColor should return color #800000 if math.random() return 0.5', () => {
    // should return #800000 with math.random() 0.5
    spyOn(Math, 'random').and.returnValue(0.5);
    let color = RandomGeneratorService.getRandomColor();
    expect(color).toEqual("#800000");
  });


  it('getRandomAngle should return 2.827433388230814 angle if math.random() returns 0.9 ', () => {
    // should return 2.827433388230814 angle with math.random() 0.9
    spyOn(Math, 'random').and.returnValue(0.9);
    let angle = RandomGeneratorService.getRandomAngle();
    expect(angle).toEqual(2.827433388230814);
  });



});
