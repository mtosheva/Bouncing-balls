import { not } from '@angular/compiler/src/output/output_ast';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Ball2D } from 'src/app/models/ball2D.model';
import { Point } from 'src/app/models/point.model';
import { BallService } from 'src/app/services/ball.service';

import { MainScreenComponent } from './main-screen.component';

describe('MainScreenComponent', () => {
  let component: MainScreenComponent;
  let fixture: ComponentFixture<MainScreenComponent>;
  let ballsService: BallService;

  const mockBallService = {
    checkCollisionsBetweenBallsAndUpdateVelocity: () => void {},
    checkCollisionWithWallsAndUpdateBall: () => void {},
    updateBallPosition: () => void {},
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

    spyOn(ballsService, 'checkCollisionWithWallsAndUpdateBall').and.callFake(mockBallService.checkCollisionWithWallsAndUpdateBall)
    spyOn(ballsService, 'updateBallPosition').and.callFake(mockBallService.updateBallPosition)
    spyOn(ballsService, 'checkCollisionsBetweenBallsAndUpdateVelocity').and.callFake(mockBallService.checkCollisionsBetweenBallsAndUpdateVelocity)
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


  it('if ball is moving should redraw ball with new points', () => {

    let point: Point = new Point(10,10);
    let ball1 = new Ball2D(point);
    ball1.speed.vx = 0;
    ball1.speed.vy = 0;

    spyOn(component, 'drawBall');

    component.balls.push(ball1);
    component.updateBalls();
    fixture.detectChanges();

    expect(ballsService.checkCollisionWithWallsAndUpdateBall).toHaveBeenCalled();
    expect(ballsService.updateBallPosition).toHaveBeenCalled();

    expect(component.drawBall).toHaveBeenCalledTimes(1);
  });

  it('checkCollisionsBetweenBallsAndUpdateVelocity should not be called if only one ball is in the canvas', () => {

    let point: Point = new Point(10,10);
    let ball1 = new Ball2D(point);
    ball1.speed.vx = 0;
    ball1.speed.vy = 0;

    component.balls.push(ball1);
    component.updateBalls();

    expect(ballsService.checkCollisionsBetweenBallsAndUpdateVelocity).not.toHaveBeenCalled();

  });

  it('checkCollisionsBetweenBallsAndUpdateVelocity should be called if more than one ball is in the canvas', () => {

    let point1: Point = new Point(10,10);
    let ball1 = new Ball2D(point1);
    ball1.speed.vx = 0;
    ball1.speed.vy = 0;

    let point2: Point = new Point(20,20);
    let ball2 = new Ball2D(point2);
    ball1.speed.vx = 0;
    ball1.speed.vy = 0;

    component.balls.push(ball1);
    component.balls.push(ball2);

    component.updateBalls();

    expect(ballsService.checkCollisionsBetweenBallsAndUpdateVelocity).toHaveBeenCalled();

  });

});
