import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginData } from '../../../interfaces/dto/user-login-data';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({})
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  doLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const data: UserLoginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.userService.login(data).subscribe({
      next: (res: any) => {
        this.userService.setToken(res.token);
        this.router.navigate(['/films']);
      },
      error: (err) => console.error('Login error:', err),
    });
  }
}