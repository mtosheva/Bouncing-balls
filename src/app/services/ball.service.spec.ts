import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BOUNCE, FRICTION, GRAVITY } from '../app.constants';
import { Ball2D } from '../models/ball2D.model';
import { Point } from '../models/point.model';

import { BallService } from './ball.service';
import { PhysicsCalculationsService } from './physics-calculations.service';

describe('BallService', () => {
  let service: BallService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BallService] });
    service = TestBed.get(BallService);

    // spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    // spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    // spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    // spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
});

  it('should be created', () => {
    const service: BallService = TestBed.get(BallService);
    expect(service).toBeTruthy();
  });


  it('update ball should recalculate y asics velocity, it should add the gravity', () => {

    let point = new Point(100,100);
    let ball = new Ball2D(point);
    ball.speed.vy = 5;
    ball.speed.vx = 5;

    service.updateBallPosition(ball);

    expect(ball.speed.vy).toBe(5 + GRAVITY);
  });

  
  it('update ball should recalculate x and y points on the asycs', () => {

    let point = new Point(100,100);
    let ball = new Ball2D(point);
    ball.speed.vy = 5;
    ball.speed.vx = 5;

    let expectedpositionX = ball.point.positionX + ball.speed.vx;
    let expectedpositionY = ball.point.positionY + ball.speed.vy + GRAVITY;

    service.updateBallPosition(ball);


    expect(ball.point.positionY).toBe(expectedpositionY);
    expect(ball.point.positionX).toBe(expectedpositionX);
  });

  it('checkCollisionWithWallsAndUpdateBall should update vx,vy and positionY, positionX should not be changed if bottom wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);

    //new speed is added so we can control the output
    ball.speed.vx = 0.5;
    ball.speed.vy = 0.5;

    let expectedVy = ball.speed.vy * - BOUNCE;
    let expectedVx = ball.speed.vx *  FRICTION;
    let expectedpositionY = 100 - ball.radius;
    let expectedpositionX = ball.point.positionX;

    service.checkCollisionWithWallsAndUpdateBall(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });

  
  it('checkCollisionWithWallsAndUpdateBall should update vx,vy and positionY, positionX should not be changed if top wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(true);
    
    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);

    //new speed is added so we can control the output
    ball.speed.vx = 0.5;
    ball.speed.vy = 0.5;

    let expectedVy = ball.speed.vy * - BOUNCE;
    let expectedVx = ball.speed.vx *  FRICTION;
    let expectedpositionY = ball.radius;
    let expectedpositionX = ball.point.positionX;

    service.checkCollisionWithWallsAndUpdateBall(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });


  
  it('checkCollisionWithWallsAndUpdateBall should update vx and positionX, positionY and vy should not be changed if left wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);

    //new speed is added so we can control the output
    ball.speed.vx = 0.5;
    ball.speed.vy = 0.5;

    let expectedVy = ball.speed.vy;
    let expectedVx = ball.speed.vx * - BOUNCE;
    let expectedpositionY = ball.point.positionY;
    let expectedpositionX = ball.radius;


    service.checkCollisionWithWallsAndUpdateBall(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });

  it('checkCollisionWithWallsAndUpdateBall should update vx and positionX, positionY and vy should not be changed if right wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);

    //new speed is added so we can control the output
    ball.speed.vx = 0.5;
    ball.speed.vy = 0.5;

    let expectedVy = ball.speed.vy;
    let expectedVx = ball.speed.vx * - BOUNCE;
    let expectedpositionY = ball.point.positionY;
    let expectedpositionX = 100 - ball.radius;
 

    service.checkCollisionWithWallsAndUpdateBall(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });



});
