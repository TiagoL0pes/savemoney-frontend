import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './shared/auth-guard';
import { Route } from './shared/enums/route.enum';

const routes: Routes = [
  {
    path: Route.AUTH,
    component: AuthComponent
  },
  {
    path: Route.INICIO,
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Route.DEFAULT,
    component: InicioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
