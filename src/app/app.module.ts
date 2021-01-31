import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { BallService } from './services/ball.service';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
