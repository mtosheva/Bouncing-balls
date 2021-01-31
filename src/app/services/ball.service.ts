import { Injectable } from '@angular/core';
import { BALL_RADIUS } from '../app.constants';
import { Ball2D  } from '../models/ball2D.model';

@Injectable({
  providedIn: 'root'
})
export class BallService {

  constructor(private canvasRenderingContext: CanvasRenderingContext2D) { }

  drawBall(ball: Ball2D): void{
    this.canvasRenderingContext.save();
    this.canvasRenderingContext.beginPath();
    this.canvasRenderingContext.arc(ball.positionX, ball.positionY, ball.ballRadius, 0, Math.PI*2);
    this.canvasRenderingContext.fillStyle = ball.color;    
    this.canvasRenderingContext.fill();
    this.canvasRenderingContext.restore();
  }

  updateBall(ball: Ball2D) : void{
    if (ball.positionY < this.canvasRenderingContext.canvas.height - BALL_RADIUS){
      ball.positionY = ball.positionY + 1;
    }
  }
}
