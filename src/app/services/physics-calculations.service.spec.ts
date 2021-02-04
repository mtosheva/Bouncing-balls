import { TestBed } from '@angular/core/testing';
import { Ball2D } from '../models/ball2D.model';
import { Point } from '../models/point.model';

import { PhysicsCalculationsService } from './physics-calculations.service';

describe('PhysicsCalculationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhysicsCalculationsService = TestBed.get(PhysicsCalculationsService);
    expect(service).toBeTruthy();
  });

  it('balls are intercecting should return true', () => {
    let point1 = new Point(10,10)
    let ball1 = new Ball2D(point1);
    let point2 = new Point(30,10)
    let ball2 = new Ball2D(point2);
    let result1: boolean = PhysicsCalculationsService.areBallsIntersecting(ball1,ball2);
    expect(result1).toBe(true);

    let point3 = new Point(10,20)
    let ball3 = new Ball2D(point3);
    let point4 = new Point(20,10)
    let ball4 = new Ball2D(point4);
    let result2: boolean = PhysicsCalculationsService.areBallsIntersecting(ball3,ball4);
    expect(result2).toBe(true);

  });

  it('balls are intercecting should return false', () => {
    let point1 = new Point(10,10)
    let ball1 = new Ball2D(point1);
    let point2 = new Point(31,10)
    let ball2 = new Ball2D(point2);
    let result1: boolean = PhysicsCalculationsService.areBallsIntersecting(ball1,ball2);
    expect(result1).toBe(false);

    
    let point3 = new Point(10,20)
    let ball3 = new Ball2D(point3);
    let point4 = new Point(10,41)
    let ball4 = new Ball2D(point4);
    let result2: boolean = PhysicsCalculationsService.areBallsIntersecting(ball3,ball4);
    expect(result2).toBe(false);
  });

  it('calculate distance of colliding vector should return 20 for points with coordinates 10,10 and 30,10 ', () => {
    let point1 = new Point(10,10)
    let ball1 = new Ball2D(point1);
    let point2 = new Point(30,10)
    let ball2 = new Ball2D(point2);

   // sqrt 30-10*30-10 + 10-10* 10-10 ==> 20
    let result: number = PhysicsCalculationsService.calculateDistanceOfCollidingVector(ball1,ball2);
    expect(result).toEqual(20);
  });


  it('calculate collision speed  should return correct speed', () => {
    let vCollisionNorm = {
      x: 0.1488106028514942,
      y: -0.9888657161005102
    }
    let vRelativeVelocity ={
      x: -8.1,
      y: -16.009411764705888
    }
    let expectedSpeed: number  = 14.625792545956717;


    let result: number = PhysicsCalculationsService.calculateCollisionSpeed(vCollisionNorm,vRelativeVelocity);
    expect(result).toEqual(expectedSpeed);
  });

  it('should return true if left wall is hit with coordinates 1,10 and ball is with radius 10', () => {
    let point = new Point(10,10);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isLeftWallHit(ball);
    expect(result).toBe(true);
  });

  it('should return false if left wall is hit with coordinates 11,10 and ball is with radius 10', () => {
    let point = new Point(11,10);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isLeftWallHit(ball);
    expect(result).toBe(false);
  });


  it('should return true if right wall is hit with coordinates 100,100 and ball is with radius 10 and canvas width is 100', () => {
    let canvasWidth = 100;
    let point = new Point(100,100);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isRightWallHit(ball, canvasWidth);
    expect(result).toBe(true);
  });

  it('should return false if right wall is hit with coordinates 80,100 and ball is with radius 10 and canvas width is 100', () => {
    let canvasWidth = 100;
    let point = new Point(80,100);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isRightWallHit(ball, canvasWidth);
    expect(result).toBe(false);
  });


  it('should return true if bottom wall is hit with coordinates 100,100 and ball is with radius 10 and canvas height is 100', () => {
    let canvasHeight = 100;
    let point = new Point(100,100);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isBottomWallHit(ball, canvasHeight);
    expect(result).toBe(true);
  });

  it('should return false if bottom wall is hit with coordinates 100,80 and ball is with radius 10 and canvas height is 100', () => {
    let canvasWidth = 100;
    let point = new Point(100,80);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isBottomWallHit(ball, canvasWidth);
    expect(result).toBe(false);
  });

  
  it('should return true if top wall is hit with coordinates 100,10 and ball is with radius 10 and canvas height is 100', () => {
    let point = new Point(100,10);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isTopWallHit(ball);
    expect(result).toBe(true);
  });

  it('should return false if bottom wall is hit with coordinates 100,20 and ball is with radius 10 and canvas height is 100', () => {
    let point = new Point(100,20);
    let ball = new Ball2D(point);
    let result: boolean = PhysicsCalculationsService.isTopWallHit(ball);
    expect(result).toBe(false);
  });


});
