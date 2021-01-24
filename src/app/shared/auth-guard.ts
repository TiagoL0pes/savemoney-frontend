import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Route } from './enums/route.enum';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session !== null) {
      const token: any = jwt_decode(session.token);
      const isValid = new Date() <= new Date(token.exp * 1000);

      if (isValid) {
        return true;
      }

      this.authService.logout();
    }

    this.messageService.showLogoutMessage('Sua sessão expirou');
    this.router.navigate([Route.AUTH]);
  }

}
