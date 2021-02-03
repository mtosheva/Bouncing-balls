import { Injectable } from '@angular/core';
import { GRAVITY } from '../app.constants';
import { Ball2D } from '../models/ball2D.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicsCalculationsService {

  constructor() { }

  static areCirclesIntersecting(circle1: Ball2D,circle2: Ball2D) : boolean{
    let circlesDistance = (circle1.positionX - circle2.positionX)*(circle1.positionX - circle2.positionX) + (circle1.positionY - circle2.positionY)*(circle1.positionY - circle2.positionY)
    return circlesDistance <= ((circle1.ballRadius+ circle2.ballRadius) * (circle1.ballRadius + circle2.ballRadius));
  }

  static calculateDistanceOfCollidingVector(circle1: Ball2D, circle2: Ball2D): number {
    return Math.sqrt((circle2.positionX-circle1.positionX)*(circle2.positionX-circle1.positionX) + (circle2.positionY-circle1.positionY)*(circle2.positionY-circle1.positionY));
  }

  static calculateCollisionSpeed(vCollisionNorm: any, vRelativeVelocity: any) : number{
    return vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
  }

  static isBottomWallHit(ball: Ball2D, height: number) : boolean {
    return ball.positionY + ball.ballRadius + GRAVITY>= height;
  }

  static isTopWallHit(ball: Ball2D) : boolean {
    return ball.positionY - ball.ballRadius <= 0;
  }

  static isLeftWallHit(ball: Ball2D) : boolean {
    return ball.positionX - ball.ballRadius <= 0;
  }

  static isRightWallHit(ball: Ball2D, width: number) : boolean {
    return ball.positionX + ball.ballRadius >= width;
  }

  static isVelocityIncegnificant(velocity: number){
    return velocity < 0.01 && velocity > -0.01;
  }


}
