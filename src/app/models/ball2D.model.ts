import { BALL_RADIUS } from "../app.constants";
import { RandomGeneratorService } from "../services/random-generator.service";

export class Ball2D {
    ballRadius: number = 0; 
    positionX: number = 0 ;
    positionY: number = 0;
    color: string =  "";

    constructor(object: MouseEvent) {
        this.ballRadius = BALL_RADIUS; 
        this.positionX = object.offsetX;
        this.positionY = object.offsetY;
        this.color = RandomGeneratorService.getRandomColor();
    }

}

