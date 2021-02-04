import { Injectable } from '@angular/core';
import { BALL_RADIUS, BOUNCE, FRICTION, GRAVITY } from '../app.constants';
import { Ball2D  } from '../models/ball2D.model';
import { PhysicsCalculationsService } from './physics-calculations.service';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  constructor() {}

  checkCollisionWithWallsAndUpdateBall(ball: Ball2D, width: number, height: number) : void {
   
    //bottom wall
    if (PhysicsCalculationsService.isBottomWallHit(ball, height)) {
      ball.speed.vy *= - BOUNCE;
      ball.point.positionY = height - ball.radius;
      ball.speed.vx *= FRICTION;
    }

    // top wall
    if (PhysicsCalculationsService.isTopWallHit(ball)) {
      ball.speed.vy *= - BOUNCE;
      ball.point.positionY = ball.radius;
      ball.speed.vx *= FRICTION;
    }

    // left wall
    if (PhysicsCalculationsService.isLeftWallHit(ball)) {
      ball.speed.vx *= - BOUNCE;
      ball.point.positionX = ball.radius;
    }
    // right wall
    if (PhysicsCalculationsService.isRightWallHit(ball, width)) {
      ball.speed.vx *= - BOUNCE;
      ball.point.positionX = width - ball.radius;
    }

  }

  updateBallPosition(ball: Ball2D): void{


    // add gravity
    ball.speed.vy += GRAVITY

    // update ball position
    ball.point.positionX += ball.speed.vx;
    ball.point.positionY += ball.speed.vy;

  }

  //collisions between balls are recalculated for each ball;
  //this functions is heavy, if there are too many balls the screen will slow down it should be optimized for real use
  checkCollisionsBetweenBallsAndUpdateVelocity(balls: Array<Ball2D>){

    for(let i = 0; i < balls.length;i++) {
      for(let j = i+1; j < balls.length;j++) {
        let ball1 = balls[i];
        let ball2 = balls[j]
        let areColliding = PhysicsCalculationsService.areBallsIntersecting(ball1,ball2);
        if(areColliding) {
       
          //collision vector
          let vCollision = {
            x: ball2.point.positionX - ball1.point.positionX, 
            y: ball2.point.positionY - ball1.point.positionY
          };
        
          //calculate the distance of the colliding vector
          let distance = PhysicsCalculationsService.calculateDistanceOfCollidingVector(ball1,ball2);
        
          //calculate normized vector
          let vCollisionNorm = {
            x: vCollision.x / distance, 
            y: vCollision.y / distance
          };

          //relative velocity of the objects
          let vRelativeVelocity = { 
            x: ball1.speed.vx - ball2.speed.vx, 
            y: ball1.speed.vy - ball2.speed.vy 
          };

          //calculate collision speed
          let speed = PhysicsCalculationsService.calculateCollisionSpeed(vCollisionNorm, vRelativeVelocity)


          //if the speed is negative objects are moving away from each other and there is no need to calculate velocity
          if(speed<0){
            break;
          }

          //if the balls are moving towards each other add the speed in the direction of the collision
          ball1.speed.vx -= (speed * vCollisionNorm.x);
          ball1.speed.vy -= (speed * vCollisionNorm.y);
          ball2.speed.vx += (speed * vCollisionNorm.x);
          ball2.speed.vy += (speed * vCollisionNorm.y);
        }

      }
    }

  }

}
