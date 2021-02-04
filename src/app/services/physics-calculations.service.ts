import { Injectable } from '@angular/core';
import { GRAVITY } from '../app.constants';
import { Ball2D } from '../models/ball2D.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicsCalculationsService {

  constructor() { }

  static areBallsIntersecting(ball1: Ball2D,ball2: Ball2D) : boolean{
    let ballsDistance = (ball1.point.positionX - ball2.point.positionX)*(ball1.point.positionX - ball2.point.positionX) + (ball1.point.positionY - ball2.point.positionY)*(ball1.point.positionY - ball2.point.positionY)
    return ballsDistance <= ((ball1.radius+ ball2.radius) * (ball1.radius + ball2.radius));
  }

  static calculateDistanceOfCollidingVector(ball1: Ball2D, ball2: Ball2D): number {
    return Math.sqrt((ball2.point.positionX-ball1.point.positionX)*(ball2.point.positionX-ball1.point.positionX) + (ball2.point.positionY-ball1.point.positionY)*(ball2.point.positionY-ball1.point.positionY));
  }

  static calculateCollisionSpeed(vCollisionNorm: any, vRelativeVelocity: any) : number{
    return vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
  }

  static isBottomWallHit(ball: Ball2D, height: number) : boolean {
    return ball.point.positionY + ball.radius + GRAVITY>= height;
  }

  static isTopWallHit(ball: Ball2D) : boolean {
    return ball.point.positionY - ball.radius <= 0;
  }

  static isLeftWallHit(ball: Ball2D) : boolean {
    return ball.point.positionX - ball.radius <= 0;
  }

  static isRightWallHit(ball: Ball2D, width: number) : boolean {
    return ball.point.positionX + ball.radius >= width;
  }

  static isVelocityIncegnificant(velocity: number){
    return velocity < 0.01 && velocity > -0.01;
  }


}
