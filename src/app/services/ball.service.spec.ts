import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BOUNCE, FRICTION, GRAVITY } from '../app.constants';
import { Ball2D, Point } from '../models/ball2D.model';

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

    service.updateBall(ball);

    expect(ball.speed.vy).toBe(5 + GRAVITY);
  });

  
  it('update ball should recalculate x and y points on the asycs', () => {

    let point = new Point(100,100);
    let ball = new Ball2D(point);
    ball.speed.vy = 5;
    ball.speed.vx = 5;

    let expectedpositionX = ball.point.positionX + ball.speed.vx;
    let expectedpositionY = ball.point.positionY + ball.speed.vy + GRAVITY;

    service.updateBall(ball);


    expect(ball.point.positionY).toBe(expectedpositionY);
    expect(ball.point.positionX).toBe(expectedpositionX);
  });

  it('checkCollisionsWithWalls should update vx,vy and positionY, positionX should not be changed if bottom wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

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

    service.checkCollisionsWithWalls(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });

  
  it('checkCollisionsWithWalls should update vx,vy and positionY, positionX should not be changed if top wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);
    
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

    service.checkCollisionsWithWalls(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });


  
  it('checkCollisionsWithWalls should update vx and positionX, positionY and vy should not be changed if left wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

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


    service.checkCollisionsWithWalls(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });

  it('checkCollisionsWithWalls should update vx and positionX, positionY and vy should not be changed if right wall is hit', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

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
 

    service.checkCollisionsWithWalls(ball,100,100);

    expect(ball.speed.vy).toEqual(expectedVy);
    expect(ball.speed.vx).toEqual(expectedVx);
    expect(ball.point.positionY).toEqual(expectedpositionY);  
    expect(ball.point.positionX).toEqual(expectedpositionX);  

  });

  it('checkCollisionsWithWalls should update vx and vy if velocity of is incegnificant', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(true);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);


    service.checkCollisionsWithWalls(ball,100,100);
    let expectedvx = 0;
    let expectedvy = 0;

    expect(ball.speed.vx).toEqual(expectedvx);
    expect(ball.speed.vy).toEqual(expectedvy);

  });

  it('checkCollisionsWithWalls should not update vx and vy if velocity of is incegnificant returns false', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);

    ball.speed.vx = 1.5;
    ball.speed.vy = 1.5

    let expectedvx = ball.speed.vy;
    let expectedvy = ball.speed.vy;

    service.checkCollisionsWithWalls(ball,100,100);


    expect(ball.speed.vx).toEqual(expectedvx);
    expect(ball.speed.vy).toEqual(expectedvy);

  });

  it('checkCollisionsWithWalls should set isMoving property to false if vx and vy are 0', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);
    
    ball.speed.vx = 0;
    ball.speed.vy = 0;


    service.checkCollisionsWithWalls(ball,100,100);


    expect(ball.isMoving).toEqual(false);

  });
  
  it('checkCollisionsWithWalls should not set isMoving property to false if vx and vy are not 0', () => {
    spyOn(PhysicsCalculationsService, 'isBottomWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isLeftWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isRightWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isTopWallHit').and.returnValue(false);
    spyOn(PhysicsCalculationsService, 'isVelocityIncegnificant').and.returnValue(false);

    // point values are irelevant for the test
    let point = new Point(10,10) 
    let ball = new Ball2D(point);
    
    ball.speed.vx = 0.5;
    ball.speed.vy = 0.5;

    service.checkCollisionsWithWalls(ball,100,100);

    expect(ball.isMoving).toEqual(true);

  });

});
