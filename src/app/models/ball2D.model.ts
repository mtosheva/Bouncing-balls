import { BALL_RADIUS } from "../app.constants";
import { RandomGeneratorService } from "../services/random-generator.service";

export class Ball2D{
    ballRadius: number = 0; 
    positionX: number = 0 ;
    positionY: number = 0;
    color: string =  "";
    speed: number = 0;
    angle: number = 0;
    vx: number = 0;
    vy: number =0; 
    isMoving: boolean;


    constructor(object?) {
        this.ballRadius = BALL_RADIUS; 
        this.positionX = object.offsetX;
        this.positionY = object.offsetY;
        this.color = RandomGeneratorService.getRandomColor();
        this.speed = RandomGeneratorService.getRandomSpeed();
        this.vx = this.speed;
        this.vy = this.speed;
        this.angle = RandomGeneratorService.getRandomAngle();
        this.isMoving = true;
    }

}

