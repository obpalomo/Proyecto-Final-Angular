import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  registerForm: FormGroup;
  router: Router;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    router: Router,
  ) {
    this.registerForm = this.fb.group({});
    this.router = router;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, this.confirmPasswordValidator]],
    });
  }

  confirmPasswordValidator(control: any): { [key: string]: boolean } | null {
    const password = control.parent?.get('password').value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordsDontMatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(delay(100))
        .subscribe({
          next:(res:any) => this.router.navigate(['/login']),
          error:(err) => console.log(err),
        })

    }
  }
}
