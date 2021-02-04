import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ball2D } from 'src/app/models/ball2D.model';
import { Point } from 'src/app/models/point.model';
import { BallService } from 'src/app/services/ball.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  @ViewChild('canvas',{static:true}) canvas: ElementRef<HTMLCanvasElement>;
  canvasRenderingContext: CanvasRenderingContext2D;
  balls: Array<Ball2D> = new Array;
  private interval: any;

  constructor(private _ballService: BallService) {

   }

  ngOnInit(): void {
    this.canvasRenderingContext = this.canvas.nativeElement.getContext('2d');
    this.canvasRenderingContext.canvas.width = window.innerWidth;
    this.canvasRenderingContext.canvas.height = window.innerHeight;
    this.interval = setInterval((): void =>{
      this.updateBalls();
    },20);
  }

  addBall(clickEvent: MouseEvent) : void {
    let point : Point = new Point(clickEvent.offsetX, clickEvent.offsetY);
    const ball = new Ball2D(point);
    this.balls.push(ball); 
  }


  updateBalls(): void{
    this.canvasRenderingContext.clearRect(0, 0, this.canvasRenderingContext.canvas.width, this.canvasRenderingContext.canvas.height);

    this.balls.forEach(ball=>{
         
        //if there is more than one ball check for collisions
        if(this.balls.length>1){
          this._ballService.checkCollisionsBetweenBallsAndUpdateVelocity(this.balls);
        }

        this._ballService.checkCollisionWithWallsAndUpdateBall(ball,this.canvasRenderingContext.canvas.width, this.canvasRenderingContext.canvas.height);

        this._ballService.updateBallPosition(ball);

      this.drawBall(ball);
 });
  }

  drawBall(ball: Ball2D): void{
    this.canvasRenderingContext.save();
    this.canvasRenderingContext.beginPath();
    this.canvasRenderingContext.arc(ball.point.positionX, ball.point.positionY, ball.radius, 0, Math.PI*2);
    this.canvasRenderingContext.fillStyle = ball.color;    
    this.canvasRenderingContext.fill();
    this.canvasRenderingContext.restore();
  }

  ngOnDestroy(){
    clearInterval(this.interval);
    this.canvasRenderingContext.clearRect(0, 0, this.canvasRenderingContext.canvas.width, this.canvasRenderingContext.canvas.height);
  }
}
