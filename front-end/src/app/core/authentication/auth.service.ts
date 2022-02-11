import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import {  UserLoginModel, UserRegisterModel } from '../interfaces/user';
import { TokenStorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // apiUrl = environment.apiUrl; // TODO: check apiurl in other projects
  apiUrl = '';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService, private router: Router) {

  }

  isLoggedIn(): boolean | undefined {
    return !!(this.tokenService.getToken());
  }

  refreshToken(token: string) {
    return this.httpClient.post(this.apiUrl  + 'TEMP', {
      refresh: token
    }, this.httpOptions).pipe(catchError(this.handleError));
  }

  login(user: UserLoginModel): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/login/', user).pipe(catchError(this.handleError));;
  }

  register(user: UserRegisterModel): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + '/users/', user).pipe(catchError(this.handleError));;
  }

  logOut() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }


  handleError(error: HttpErrorResponse): Observable<string> {
    let message = '';
    if (error.error && error.error.detail) {
      message = error.error.detail;
    } else {
      message = `Error code: " ${error.status}, Message: ${error.message}`;
    }
    return throwError(message);
  }
}
