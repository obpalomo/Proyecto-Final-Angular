import { Component } from '@angular/core';
import { sign } from 'crypto';
import { SignupFormComponent } from '../../components/forms/signup-form/signup-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SignupFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
