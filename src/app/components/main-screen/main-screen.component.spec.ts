import { not } from '@angular/compiler/src/output/output_ast';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Ball2D } from 'src/app/models/ball2D.model';
import { BallService } from 'src/app/services/ball.service';

import { MainScreenComponent } from './main-screen.component';

describe('MainScreenComponent', () => {
  let component: MainScreenComponent;
  let fixture: ComponentFixture<MainScreenComponent>;
  let ballsService: BallService;

  const mockBallService = {
    checkCollisions: () => void {},
    checkCollisionsWithWalls: () => void {},
    updateBall: () => void {},
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainScreenComponent],
      providers: [{ provide: BallService, useValue: mockBallService }]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(MainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
    ballsService = TestBed.get(BallService);

    spyOn(ballsService, 'checkCollisionsWithWalls').and.callFake(mockBallService.checkCollisionsWithWalls)
    spyOn(ballsService, 'updateBall').and.callFake(mockBallService.updateBall)
    spyOn(ballsService, 'checkCollisions').and.callFake(mockBallService.checkCollisions)
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addBall function on canvas click', () => {
    spyOn(component, 'addBall');
    let canvas = fixture.debugElement.query(By.css('canvas'));
    let event = new MouseEvent('click');
    canvas.triggerEventHandler('click', event);
    expect(component.addBall).toHaveBeenCalled();
  });


  it('should add new ball on click to the balls list ', () => {
    let canvas = fixture.debugElement.query(By.css('canvas'));
    let event = new MouseEvent('click');
    canvas.triggerEventHandler('click', event);
    expect(component.balls.length).toEqual(1);
  });

  it('should calculate width and height onInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    expect(component.canvasRenderingContext.canvas.width).toEqual(window.innerWidth);
    expect(component.canvasRenderingContext.canvas.height).toEqual(window.innerHeight);
  });

  it('updateBalls function should be called on each 20 miliseconds', () => {
    component.ngOnInit();
    spyOn(component, 'updateBalls').and.callFake(() => null);

    jasmine.clock().tick(21);
    expect(component.updateBalls).toHaveBeenCalled();
  });

  it('updateBalls function should not be called before 20 miliseconds are passed', () => {
    component.ngOnInit();
    spyOn(component, 'updateBalls').and.callFake(() => null);

    jasmine.clock().tick(19);
    expect(component.updateBalls).not.toHaveBeenCalled();
  });


  it('if ball is not moving should draw ball with old points - no calculation of new point and speed', () => {

    let ballObj = {
      offsetX: 10,
      offsetY: 10,
    }
    let circle1 = new Ball2D(ballObj);

    circle1.vx = 0;
    circle1.vy = 0;
    circle1.isMoving = false;

    spyOn(component, 'drawBall');

    fixture.detectChanges();
    component.balls.push(circle1);

    component.updateBalls();

    expect(ballsService.checkCollisionsWithWalls).not.toHaveBeenCalled();
    expect(ballsService.checkCollisions).not.toHaveBeenCalled();
    expect(ballsService.updateBall).not.toHaveBeenCalled();

    expect(component.balls[0].positionX).toEqual(10);
    expect(component.balls[0].positionY).toEqual(10);
    expect(component.balls[0].vx).toEqual(0);
    expect(component.balls[0].vy).toEqual(0);

    expect(component.drawBall).toHaveBeenCalledTimes(1);
  });

  it('if ball is moving should redraw ball with new points', () => {

    let ballObj = {
      offsetX: 10,
      offsetY: 10,
    }
    let circle1 = new Ball2D(ballObj);

    circle1.vx = 1;
    circle1.vy = 1;
    circle1.isMoving = true;

    spyOn(component, 'drawBall');

    component.balls.push(circle1);
    component.updateBalls();
    fixture.detectChanges();

    expect(ballsService.checkCollisionsWithWalls).toHaveBeenCalled();
    expect(ballsService.updateBall).toHaveBeenCalled();

    expect(component.drawBall).toHaveBeenCalledTimes(1);
  });

  it('checkCollisions should not be called if only one ball is in the canvas', () => {

    let ballObj = {
      offsetX: 10,
      offsetY: 10,
    }
    let circle1 = new Ball2D(ballObj);

    circle1.vx = 1;
    circle1.vy = 1;
    circle1.isMoving = true;

    component.balls.push(circle1);
    component.updateBalls();

    expect(ballsService.checkCollisions).not.toHaveBeenCalled();

  });

  it('checkCollisions should be called if more than one ball is in the canvas', () => {

    let ballObj = {
      offsetX: 10,
      offsetY: 10,
    }
    let circle2 = new Ball2D(ballObj);

    circle2.vx = 1;
    circle2.vy = 1;
    circle2.isMoving = true;

    let circle1 = new Ball2D(ballObj);

    circle1.vx = 1;
    circle1.vy = 1;
    circle1.isMoving = true;

    component.balls.push(circle1);
    component.balls.push(circle1);

    component.updateBalls();

    expect(ballsService.checkCollisions).toHaveBeenCalled();

  });

});
