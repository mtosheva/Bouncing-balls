import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ball2D } from 'src/app/models/ball2D.model';
import { BallService } from 'src/app/services/ball.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  @ViewChild('canvas',{static:true}) canvas: ElementRef<HTMLCanvasElement>;
  private canvasRenderingContext: CanvasRenderingContext2D;
  private balls: Array<Ball2D> = new Array;
  constructor() { }

  ngOnInit(): void {
    this.canvasRenderingContext = this.canvas.nativeElement.getContext('2d');
    // this.canvasRenderingContext.canvas.width = document.documentElement.scrollWidth;
    // this.canvasRenderingContext.canvas.height = document.documentElement.scrollHeight;

    setInterval((): void =>{
      this.updateBalls();
    },1);

  }

  addBall(clickEvent) : void {
    const ball = new Ball2D(clickEvent);
    this.balls.push(ball); 
  }


  updateBalls(): void{
    this.canvasRenderingContext.clearRect(0, 0, this.canvasRenderingContext.canvas.width, this.canvasRenderingContext.canvas.height);
    this.balls.forEach(x=>{
      const ballServiceInstance = new BallService(this.canvasRenderingContext);
      ballServiceInstance.updateBall(x);
      ballServiceInstance.drawBall(x);
    });
  }

}
