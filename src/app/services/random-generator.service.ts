import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

constructor() { }
private static MAX_SPEED: number = 20;
private static MIN_SPEED: number = -10;

//change magic numberss
 static getRandomColor() : string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    let hexColor = '#' + ('000000' + color).slice(-6);
    if(hexColor != "#ffffff") {
      return hexColor;
    }
    else this.getRandomColor() ;
  }

  static getRandomSpeed(): number {
    let randomSpeed = Math.floor(Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED);
    // if speed is 0 ball will not move
    if(randomSpeed !=0 ){
      return randomSpeed;
    }
    this.getRandomSpeed();
  }

  static getRandomAngle(): number {
    return Math.random() * Math.PI;
  }
}
