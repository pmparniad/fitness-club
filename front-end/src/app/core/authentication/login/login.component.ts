import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../interfaces/user';
import { DataExchangeService } from '../../services/data-exchange.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { RestApiService } from '../../services/rest-api.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService , private formCreator: FormCreatorService, private tokenStorage: TokenStorageService,
    private apiService: RestApiService, private toastService: ToastService, private dataExchangeService: DataExchangeService,
    private router: Router) {
    this.loginForm = this.formCreator.createLoginForm();
   }

  ngOnInit(): void {
  }

  onLoginClick() {
    const user: UserLoginModel = this.loginForm.value;
    this.authService.login(user).subscribe(data => {
      this.tokenStorage.saveToken(data.access);
      this.tokenStorage.saveRefreshToken(data.refresh);
      this.tokenStorage.saveUser(data.user);
      this.toastService.addSingle('success', 'Login', 'Logged in successfuly');
      this.dataExchangeService.refreshMenu();
      this.router.navigate(['/book-list'])

   },
    error => {
      this.toastService.addSingle('error', 'Login', error);
    })
  }

}
