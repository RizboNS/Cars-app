import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error/error.component';
import { HomeComponent } from './pages/home/home/home.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';

const routes: Routes = [
  { path: 'user/:id', component: UserDetailsComponent},
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
