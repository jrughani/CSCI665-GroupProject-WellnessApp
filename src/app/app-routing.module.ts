import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'dashboard3', loadChildren: () => import('./dashboard-gateway/dashboard-gateway.module').then(m => m.DashboardGatewayModule) },
  // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },// user can only view dashboard once logged in
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },

  { path: 'dashboard', loadChildren: () => import('./gateway/gateway.module').then(m => m.GatewayModule) },
  { path: '**', component: HomeComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
