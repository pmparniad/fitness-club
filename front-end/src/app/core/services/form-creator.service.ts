import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormCreatorService {

  constructor(private fb: FormBuilder) { }

  createLoginForm() : FormGroup {
    const loginForm: FormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    return loginForm;
  }

   createRegisterForm() : FormGroup {
    const registerForm: FormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      full_name: ['', [Validators.required, Validators.pattern(
        "^[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ, ]+(\s{0,1}[A-Za-zΑ-Ωα-ωίϊΐόάέύϋΰήώ, ])*$")]], // regex that accepts english/greek letters and spaces only
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',  [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(8)]],
      role: ['', [Validators.required]],
      student_number: [{ value: null, disabled: true }, [Validators.required]] // conditional ~ enabled only if role is student
    }, { validators: this.checkPasswords });
    return registerForm;
  }

  checkPasswords(group: any): ValidationErrors | null {
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value
  return pass === confirmPass ? null : { notSame: true }
}
}


