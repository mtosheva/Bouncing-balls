import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomGeneratorService {

constructor() { }
private static MAX_SPEED: number = 10;
private static MIN_SPEED: number = -10;

//change magic numberss
 static getRandomColor() : string {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  static getRandomSpeed(): number {
    let randomSpeed = Math.floor(Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED);
    if(randomSpeed !=0){
      return randomSpeed;
    }
    this.getRandomSpeed();

  }

  static getRandomAngle(): number {
    return Math.random() * Math.PI/2;
  }
}
