import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/shared/enums/route.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  isHome(): boolean {
    return location.pathname.indexOf('inicio') >= 0;
  }

  isAuth(): boolean {
    return location.pathname.indexOf('auth') >= 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(Route.AUTH);
  }

  back(): void {
    window.history.back();
  }

}
