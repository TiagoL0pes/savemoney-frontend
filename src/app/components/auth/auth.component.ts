import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { AuthRequest } from 'src/app/shared/models/requests/auth-request';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  subscriptions: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messagingService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session && Object.keys(session).length > 0) {
      this.router.navigate([Route.INICIO]);
    } else {
      this.authService.logout();
    }

    this.authForm = this.authService.createFormGroup(new AuthRequest(), this.formBuilder);
  }

  login(): void {
    const request: AuthRequest = this.authForm.getRawValue();
    const obs$ = this.authService.login(request)
      .subscribe((res: any) => {
        const session = { token: res.body.token.substring(7) };
        this.authService.addSession(session);
        this.router.navigateByUrl(Route.INICIO);
      }, handler => this.messagingService.showErrorMessage('Ops', handler?.error?.message));

    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
