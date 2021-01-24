import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/requests/auth-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(request): Observable<any> {
    return this.http.post(`${environment.api}/auth`, request,
      {
        observe: 'response',
        withCredentials: true
      });
  }

  logout() {
    localStorage.removeItem('session');
  }

  addSession(session) {
    localStorage.setItem('session', JSON.stringify(session));
  }

  getTokenItem(item: string): string {
    const jwtToken = JSON.parse(localStorage.getItem('session')).token.split('.')[1];
    const base64Token = jwtToken.replace('-', '+').replace('_', '/');
    const jsonPayload = JSON.parse(window.atob(base64Token))['sub'];
    return JSON.parse(jsonPayload)[item];
  }

  createFormGroup(auth: AuthRequest, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      email: [auth.email, Validators.required],
      senha: [auth.senha, Validators.required]
    });
  }
}
