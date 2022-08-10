import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header/header.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { ErrorComponent } from './pages/error/error/error.component';
import { CarlistComponent } from './components/car/carlist/carlist.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCarComponent } from './components/car/create-car/create-car.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserDetailsComponent,
    ErrorComponent,
    CarlistComponent,
    CreateCarComponent,
    CarDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
