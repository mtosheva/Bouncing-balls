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

    // reset insignificant amounts to 0
    if (PhysicsCalculationsService.isVelocityIncegnificant(ball.speed.vx)) {
      ball.speed.vx = 0;
    }
    if (PhysicsCalculationsService.isVelocityIncegnificant(ball.speed.vy)) {
      ball.speed.vy = 0;
    }

    if(ball.speed.vx == 0 && ball.speed.vy ==0) {
      ball.isMoving = false;
    }

  }

  updateBall(ball: Ball2D): void{
    
    // add gravity
    ball.speed.vy += GRAVITY

    // update ball position
    ball.point.positionX += ball.speed.vx;
    ball.point.positionY += ball.speed.vy;

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
            x: circle2.point.positionX - circle1.point.positionX, 
            y: circle2.point.positionY - circle1.point.positionY
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
            x: circle1.speed.vx - circle2.speed.vx, 
            y: circle1.speed.vy - circle2.speed.vy 
          };

          //calculate collision speed
          let speed = PhysicsCalculationsService.calculateCollisionSpeed(vCollisionNorm, vRelativeVelocity)


          //if the speed is negative objects are moving away from each other and there is no need to calculate velocity
          if(speed<0){
            break;
          }

          //if the balls are moving towards each other add the speed in the direction of the collision
          circle1.speed.vx -= (speed * vCollisionNorm.x);
          circle1.speed.vy -= (speed * vCollisionNorm.y);
          circle2.speed.vx += (speed * vCollisionNorm.x);
          circle2.speed.vy += (speed * vCollisionNorm.y);
        }

      }
    }

  }

}
