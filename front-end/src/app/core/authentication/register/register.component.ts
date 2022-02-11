import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { UserRegisterModel } from '../../interfaces/user';
import { DataExchangeService } from '../../services/data-exchange.service';
import { FormCreatorService } from '../../services/form-creator.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formCreator: FormCreatorService, private authService: AuthService,
     private tokenStorage: TokenStorageService, private toastService: ToastService, private dataExchangeService: DataExchangeService,
     private router: Router) {
    this.registerForm = this.formCreator.createRegisterForm();

  }

  ngOnInit(): void {
  }
/**
 * @description register user ~ handles form and sends req to the BE
 * @returns void
 */
  onRegisterClick(): void {
    const formValue = this.registerForm.value;
    const req: UserRegisterModel = {
      username: formValue.username,
      password: formValue.password,
      full_name: formValue.full_name,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
    }

    this.authService.register(req).subscribe(data => {
      this.tokenStorage.saveToken(data.access);
      this.tokenStorage.saveRefreshToken(data.refresh);
      this.tokenStorage.saveUser(data.user);
      this.toastService.addSingle('success', 'Register', 'Registered successfuly');
      this.dataExchangeService.refreshMenu();
      this.router.navigate(['/book-list']);

   },
    error => {
      this.toastService.addSingle('error', 'Register', error);
    })
  }

  /**
 * @description sets the disable property in student number based on user selection
 * @returns void
 */
  toggleStudentNumber(): void {
    if (this.registerForm.get('role')?.value === 'STUDENT') {
      this.registerForm.get('student_number')?.enable();
    } else {
      this.registerForm.get('student_number')?.reset();
      this.registerForm.get('student_number')?.disable();
    }
  }
}
