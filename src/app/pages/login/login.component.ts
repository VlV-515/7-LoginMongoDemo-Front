import { LoginService } from './services/login.service';
import { LoginInterface } from './interfaces/login.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    public readonly fb: FormBuilder,
    private readonly loginSvc: LoginService
  ) {
    this.createForm();
  }
  ngOnInit(): void {}
  createForm(): void {
    this.formLogin = this.fb.group({
      username: [, [Validators.required, Validators.minLength(4)]],
      password: [, [Validators.required, Validators.minLength(4)]],
    });
  }
  btnLogin(form: LoginInterface) {
    this.loginSvc.sigIn(form).subscribe();
  }
}
