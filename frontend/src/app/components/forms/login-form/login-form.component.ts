import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginData } from '../../../interfaces/dto/user-login-data';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  hidePassword: boolean = true
  loginForm: FormGroup = this.formBuilder.group({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required])
  })

  constructor(private formBuilder: FormBuilder, private UserService: UserService){}


  doLogin(){
    const data: UserLoginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }


  this.UserService.login(data).subscribe({
    next: (res:any) => this.UserService.setToken(res.token),
    error: (err) => console.log(err),
  })
  }
}
