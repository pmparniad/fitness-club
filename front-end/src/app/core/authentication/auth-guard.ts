import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})

  export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute,
      private tokenService: TokenStorageService, private toastService: ToastService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const userRole = this.tokenService.getUser()?.role;
      if (this.authService.isLoggedIn() && (state.url === '/login' || state.url === '/register')) {
         // prevent a logged in user to navigate to login and register page again
         this.router.navigate(['/']);
      } else if (!this.authService.isLoggedIn() && !(state.url === '/login' || state.url === '/register')) {
        // if he is not logged in navigate him to the login page
        this.router.navigate(['/login']);
      } else if (this.authService.isLoggedIn() && state.url === '/admin-panel' && userRole !== 'ADMIN') {
        // check if the user navigates to admin panel and is not an admin
        this.toastService.addSingle('warn', 'Invalid url', 'You dont have permission to access this url');
        this.router.navigate(['/']);
      }
      return true;
    };
  }
