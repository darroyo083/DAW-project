import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isRegister = false;

  constructor(public authService: AuthService) {}

  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  handleLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("jwt",response.jwt)
          this.authService.getUserProfile().subscribe();
        },
        error: (error) => {
          console.error('Error during registration:', error);
        },
      });

      console.log('login value - ', this.loginForm.value);
      this.authService.login(this.loginForm.value);
      console.log('login value - ', this.loginForm.value);
    }
  }

  handleRegister(): void {
    if (this.registrationForm.valid) {
      console.log('Registration Form Data:', this.registrationForm?.value);
      this.authService.register(this.registrationForm.value).subscribe({
        next:data=>{
          console.log("Registered successfully",data)
          
          localStorage.setItem('jwt',data.jwt);
          this.authService.getUserProfile().subscribe();
        },
        error:err=>{
          console.log("error during registration ",err)
        }
      })
    } else {
    }
  }
  togglePanel() {
    this.isRegister = !this.isRegister;
  }
}
