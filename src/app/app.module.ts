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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCarComponent } from './components/car/create-car/create-car.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CarEditComponent } from './components/car/car-edit/car-edit.component';
import { SlideshowComponent } from './components/slide/slideshow/slideshow.component';
import { ModalImageComponent } from './components/modal/modal-image/modal-image.component';

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
    UserListComponent,
    RegisterComponent,
    LoginComponent,
    CarEditComponent,
    SlideshowComponent,
    ModalImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
