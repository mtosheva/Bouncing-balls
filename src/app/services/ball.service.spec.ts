import { TestBed } from '@angular/core/testing';
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

  it('checkCollisionsBetweenBallsAndUpdateVelocity should not change velocities if balls are not colliding', () => {
    spyOn(PhysicsCalculationsService, 'areBallsIntersecting').and.returnValue(false);

    // point values are irelevant for the test
    let point1 = new Point(10, 10)
    let ball1 = new Ball2D(point1);

    //new speed is added so we can control the output
    ball1.speed.vx = 0.5;
    ball1.speed.vy = 0.5;

    // point values are irelevant for the test
    let point2 = new Point(10, 10)
    let ball2 = new Ball2D(point2);

    //new speed is added so we can control the output
    ball2.speed.vx = 0.1;
    ball2.speed.vy = 0.1;


    let expectedVyBall1 = ball1.speed.vy;
    let expectedVxBall1 = ball1.speed.vx;
    let expectedVyBall2 = ball2.speed.vy;
    let expectedVxBall2 = ball2.speed.vx;
    let balls: Array<Ball2D> = new Array();
    balls.push(ball1);
    balls.push(ball2);
 
    service.checkCollisionsBetweenBallsAndUpdateVelocity(balls);

    expect(balls[0].speed.vy).toEqual(expectedVyBall1);
    expect(balls[0].speed.vx).toEqual(expectedVxBall1);
    expect(balls[1].speed.vy).toEqual(expectedVyBall2);  
    expect(balls[1].speed.vx).toEqual(expectedVxBall2);  

  });


  it('checkCollisionsBetweenBallsAndUpdateVelocity should change velocities if balls are colliding', () => {
    spyOn(PhysicsCalculationsService, 'areBallsIntersecting').and.returnValue(true);
    spyOn(PhysicsCalculationsService, 'calculateDistanceOfCollidingVector').and.returnValue(20); 
    spyOn(PhysicsCalculationsService, 'calculateCollisionSpeed').and.returnValue(2); 

    let expectedVyBall1 = 0.23529411764705885;
    let expectedVxBall1 = 1.1776212618576576;
    let expectedVyBall2 = 0.69627;
    let expectedVxBall2 = -5.42978;

    let point1 = new Point(1500, 1000)
    let ball1 = new Ball2D(point1);

    ball1.speed.vx = 2.1776212618576574;
    ball1.speed.vy = 0.23529411764705885;

    let point2 = new Point(1510, 1000)
    let ball2 = new Ball2D(point2);

    ball2.speed.vx = -6.42978;
    ball2.speed.vy =  0.69627;



    let balls: Array<Ball2D> = new Array();
    balls.push(ball1);
    balls.push(ball2);
 
    service.checkCollisionsBetweenBallsAndUpdateVelocity(balls);

    expect(balls[0].speed.vy).toEqual(expectedVyBall1);
    expect(balls[0].speed.vx).toEqual(expectedVxBall1);
    expect(balls[1].speed.vy).toEqual(expectedVyBall2);  
    expect(balls[1].speed.vx).toEqual(expectedVxBall2);  

  });



});
