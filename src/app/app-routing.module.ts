import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { CreateCarComponent } from './components/car/create-car/create-car.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CarListComponent } from './pages/car/car-list/car-list.component';
import { ErrorComponent } from './pages/error/error/error.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'create-car/:userId', component: CreateCarComponent },
  { path: 'users' , component: UserListComponent},
  { path: 'car/:id', component: CarDetailsComponent},
  { path: 'user/:id', component: UserDetailsComponent},
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
