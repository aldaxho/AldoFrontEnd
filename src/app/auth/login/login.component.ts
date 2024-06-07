import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
  
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          // Almacenar el token en localStorage
          const userData = {
            token: response.token,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          // Almacenar el id y rol en sessionStorage
          sessionStorage.setItem('id', response.id.toString());
          sessionStorage.setItem('rol', response.rol);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Login failed');
        }
      });
    }   
  } 
}
