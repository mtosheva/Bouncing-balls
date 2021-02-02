import { Injectable } from '@angular/core';
import { BALL_RADIUS, BOUNCE, FRICTION, GRAVITY } from '../app.constants';
import { Ball2D  } from '../models/ball2D.model';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  constructor() {}

  updateBall(ball: Ball2D,width,height) : void{
   
    //bottom wall
    if (this.isBottomWallHit(ball, height)) {
      ball.vy *= - BOUNCE;
      ball.positionY = height - ball.ballRadius;
      ball.vx *= FRICTION;
    }

    // top wall
    if (this.isTopWallHit(ball)) {
      ball.vy *= - BOUNCE;
      ball.positionY = ball.ballRadius;
      ball.vx *= FRICTION;
    }

    // left wall
    if (this.isLeftWallHit(ball)) {
      ball.vx *= - BOUNCE;
      ball.positionX = ball.ballRadius;
    }
    // right wall
    if (this.isRightWallHit(ball, width)) {
      ball.vx *= - BOUNCE;
      ball.positionX = width - ball.ballRadius;
    }

    // reset insignificant amounts to 0
    if (this.isVelocityIncegnificant(ball.vx)) {
      ball.vx = 0;
    }
    if (this.isVelocityIncegnificant(ball.vy)) {
      ball.vy = 0;
    }

    // add gravity
    ball.vy += GRAVITY

    // update ball position
    ball.positionX += ball.vx;
    ball.positionY += ball.vy;

  }

  isBottomWallHit(ball: Ball2D, height: number) : boolean {
    return ball.positionY + ball.ballRadius + GRAVITY >= height;
  }

  isTopWallHit(ball: Ball2D) : boolean {
    return ball.positionY - ball.ballRadius <= 0;
  }

  isLeftWallHit(ball: Ball2D) : boolean {
    return ball.positionX - ball.ballRadius <= 0;
  }

  isRightWallHit(ball: Ball2D, width: number) : boolean {
    return ball.positionX + ball.ballRadius >= width;
  }

  isVelocityIncegnificant(velocity: number){
    return velocity < 0.01 && velocity > -0.01;
  }


  //collisions between balls are recalculated for each ball;
  //this functions is heavy, if there are too many balls the screen will slow down it should be optimized for real use
  checkCollisions(balls: Array<Ball2D>){

    for(let i = 0; i < balls.length;i++) {
      for(let j = i+1; j < balls.length;j++) {
        let circle1 = balls[i];
        let circle2 = balls[j]
        let isCollading = this.areCirclesIntersecting(circle1,circle2);
        if(isCollading) {
       
          //collision vector
          let vCollision = {
            x: circle2.positionX - circle1.positionX, 
            y: circle2.positionY - circle1.positionY
          };
        
          //calculate the distance of the colliding vector
          let distance = this.calculateDistanceOfCollidingVecor(circle1,circle2);
        
          //calculate normized vector
          let vCollisionNorm = {
            x: vCollision.x / distance, 
            y: vCollision.y / distance
          };

          //relative velocity of the objects
          let vRelativeVelocity = { x: circle1.vx - circle2.vx, y: circle1.vy - circle2.vy };

          //calculate collision speed
          let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;


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

  calculateDistanceOfCollidingVecor(circle1: Ball2D, circle2: Ball2D): number {
    return Math.sqrt((circle2.positionX-circle1.positionX)*(circle2.positionX-circle1.positionX) + (circle2.positionY-circle1.positionY)*(circle2.positionY-circle1.positionY));
  }

  //check if two circles intersect
  areCirclesIntersecting(circle1: Ball2D,circle2: Ball2D) : boolean{
    let circlesDistance = (circle1.positionX - circle2.positionX)*(circle1.positionX - circle2.positionX) + (circle1.positionY - circle2.positionY)*(circle1.positionY - circle2.positionY)
    return circlesDistance <= ((circle1.ballRadius+ circle2.ballRadius) * (circle1.ballRadius + circle2.ballRadius));
  }
}
