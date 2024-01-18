import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"signup", component :SignupComponent },
  {path:"", component :LoginComponent },
  {path:"forgot-password", component: ForgotPasswordComponent},
  
  {path:"dashboard", canActivate:[authGuard],loadChildren:() => import ('./modules/home.module').then(mod => mod.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
