import { Injectable } from '@angular/core';
import { GRAVITY } from '../app.constants';
import { Ball2D } from '../models/ball2D.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicsCalculationsService {

  constructor() { }

  static areCirclesIntersecting(circle1: Ball2D,circle2: Ball2D) : boolean{
    let circlesDistance = (circle1.point.positionX - circle2.point.positionX)*(circle1.point.positionX - circle2.point.positionX) + (circle1.point.positionY - circle2.point.positionY)*(circle1.point.positionY - circle2.point.positionY)
    return circlesDistance <= ((circle1.radius+ circle2.radius) * (circle1.radius + circle2.radius));
  }

  static calculateDistanceOfCollidingVector(circle1: Ball2D, circle2: Ball2D): number {
    return Math.sqrt((circle2.point.positionX-circle1.point.positionX)*(circle2.point.positionX-circle1.point.positionX) + (circle2.point.positionY-circle1.point.positionY)*(circle2.point.positionY-circle1.point.positionY));
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
