import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    var loginModel = Object.assign({}, this.loginForm.value);
    this.authService.login(loginModel).subscribe((response) => {
      let email = this.loginForm.get('email')?.value;

      this.localStorageService.set('token', response.data.token);
      this.localStorageService.set('email', email);

      this.userService.getUserDetailByEmail(email).subscribe((res) => {
        this.localStorageService.set('fullName', `${res.data.firstName} ${res.data.lastName}`);
      });

      window.location.assign('/cars');
    });
  }
}
