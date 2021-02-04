import { BALL_RADIUS } from "../app.constants";
import { RandomGeneratorService } from "../services/random-generator.service";
import { Point } from "./point.model";
import { Speed } from "./speed.model";

export class Ball2D {
    radius: number ; 
    point: Point = new Point(undefined, undefined);
    speed: Speed = new Speed(undefined, undefined);
    color: string ;
    angle: number;


    constructor(point: Point) {
        this.setPoint(point);
        this.setSpeed();
        this.radius = BALL_RADIUS;
        this.color = RandomGeneratorService.getRandomColor();
        this.angle = RandomGeneratorService.getRandomAngle();
    }

    setPoint(point: Point): void {
        this.point.positionX = point.positionX;
        this.point.positionY = point.positionY;
    }

    setSpeed(): void {
        let speed = RandomGeneratorService.getRandomSpeed();
        this.speed.vx = speed;
        this.speed.vy =  speed;
    }

}

