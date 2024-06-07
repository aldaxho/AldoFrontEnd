import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';
import { AuthResponse } from '../../models/auth-response.model';
import { Router } from '@angular/router'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';  // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/authenticate/`, loginRequest);
  }
  isLoggedIn(): boolean {
    const userData = localStorage.getItem('userData');
    return !!userData; // Devuelve true si hay datos de usuario almacenados, false de lo contrario
  }
  logout(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
