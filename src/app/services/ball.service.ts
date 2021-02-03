import { Injectable } from '@angular/core';
import { BALL_RADIUS, BOUNCE, FRICTION, GRAVITY } from '../app.constants';
import { Ball2D  } from '../models/ball2D.model';
import { PhysicsCalculationsService } from './physics-calculations.service';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  constructor() {}

  checkCollisionsWithWalls(ball: Ball2D, width: number, height: number) : void {
   
    //bottom wall
    if (PhysicsCalculationsService.isBottomWallHit(ball, height)) {
      ball.vy *= - BOUNCE;
      ball.positionY = height - ball.ballRadius;
      ball.vx *= FRICTION;
    }

    // top wall
    if (PhysicsCalculationsService.isTopWallHit(ball)) {
      ball.vy *= - BOUNCE;
      ball.positionY = ball.ballRadius;
      ball.vx *= FRICTION;
    }

    // left wall
    if (PhysicsCalculationsService.isLeftWallHit(ball)) {
      ball.vx *= - BOUNCE;
      ball.positionX = ball.ballRadius;
    }
    // right wall
    if (PhysicsCalculationsService.isRightWallHit(ball, width)) {
      ball.vx *= - BOUNCE;
      ball.positionX = width - ball.ballRadius;
    }

    // reset insignificant amounts to 0
    if (PhysicsCalculationsService.isVelocityIncegnificant(ball.vx)) {
      ball.vx = 0;
    }
    if (PhysicsCalculationsService.isVelocityIncegnificant(ball.vy)) {
      ball.vy = 0;
    }

    if(ball.vx == 0 && ball.vy ==0) {
      ball.isMoving = false;
    }

  }

  updateBall(ball: Ball2D): void{
    
    // add gravity
    ball.vy += GRAVITY

    // update ball position
    ball.positionX += ball.vx;
    ball.positionY += ball.vy;

  }

  //collisions between balls are recalculated for each ball;
  //this functions is heavy, if there are too many balls the screen will slow down it should be optimized for real use
  checkCollisions(balls: Array<Ball2D>){

    for(let i = 0; i < balls.length;i++) {
      for(let j = i+1; j < balls.length;j++) {
        let circle1 = balls[i];
        let circle2 = balls[j]
        let areColliding = PhysicsCalculationsService.areCirclesIntersecting(circle1,circle2);
        if(areColliding) {
       
          //collision vector
          let vCollision = {
            x: circle2.positionX - circle1.positionX, 
            y: circle2.positionY - circle1.positionY
          };
        
          //calculate the distance of the colliding vector
          let distance = PhysicsCalculationsService.calculateDistanceOfCollidingVector(circle1,circle2);
        
          //calculate normized vector
          let vCollisionNorm = {
            x: vCollision.x / distance, 
            y: vCollision.y / distance
          };

          //relative velocity of the objects
          let vRelativeVelocity = { 
            x: circle1.vx - circle2.vx, 
            y: circle1.vy - circle2.vy 
          };

          //calculate collision speed
          let speed = PhysicsCalculationsService.calculateCollisionSpeed(vCollisionNorm, vRelativeVelocity)


          //if the speed is negative objects are moving away from each other and there is no need to calculate velocity
          if(speed<0){
            break;
          }

          //if the balls are moving towards each other add the speed in the direction of the collision
          circle1.vx -= (speed * vCollisionNorm.x);
          circle1.vy -= (speed * vCollisionNorm.y);
          circle2.vx += (speed * vCollisionNorm.x);
          circle2.vy += (speed * vCollisionNorm.y);
        }

      }
    }

  }

}
