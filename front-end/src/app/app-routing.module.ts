import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/authentication/auth-guard';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';

const routes = [{ path: '', redirectTo: '/login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
{ path: 'register', component: RegisterComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
})
export class AppRoutingModule { }
