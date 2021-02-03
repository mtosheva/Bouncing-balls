import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { BallService } from './services/ball.service';
import { PhysicsCalculationsService } from './services/physics-calculations.service';
import { RandomGeneratorService } from './services/random-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BallService,
    PhysicsCalculationsService,
    RandomGeneratorService
  ],
  bootstrap: [AppComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
