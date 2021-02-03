import { BALL_RADIUS } from "../app.constants";
import { RandomGeneratorService } from "../services/random-generator.service";

export class Ball2D {
    radius: number ; 
    point: Point = new Point(undefined, undefined);
    speed: Speed = new Speed(undefined, undefined);
    color: string ;
    angle: number;
    isMoving: boolean;


    constructor(point: Point) {
        this.setPoint(point);
        this.setSpeed();
        this.radius = BALL_RADIUS;
        this.color = RandomGeneratorService.getRandomColor();
        this.angle = RandomGeneratorService.getRandomAngle();
        this.isMoving = true;
    }

    setPoint(point: Point): void {
        this.point.positionX = point.positionX;
        this.point.positionY = point.positionY;
    }

    setSpeed(): void {
        this.speed.vx = RandomGeneratorService.getRandomSpeed();
        this.speed.vy =  RandomGeneratorService.getRandomSpeed()
    }

}

export class Point {
    positionX: number;
    positionY: number;
    constructor(x: number, y: number){
        this.positionX = x;
        this.positionY = y;
    }
}

export class Speed {
    vx: number;
    vy: number;
    constructor(vx: number, vy: number){
        this.vx = vx;
        this.vy = vy;
    }

}

