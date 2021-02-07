import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AdicionarDespesaComponent } from './components/despesas/adicionar-despesa/adicionar-despesa.component';
import { DespesasComponent } from './components/despesas/despesas.component';
import { DetalharDespesaComponent } from './components/despesas/detalhar-despesa/detalhar-despesa.component';
import { EditarDespesaComponent } from './components/despesas/editar-despesa/editar-despesa.component';
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
    path: Route.DESPESA,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DespesasComponent
      },
      {
        path: Route.ADICIONAR_DESPESA,
        component: AdicionarDespesaComponent
      },
      {
        path: Route.DETALHAR_DESPESA,
        component: DetalharDespesaComponent
      },
      {
        path: Route.EDITAR_DESPESA,
        component: EditarDespesaComponent
      },
    ]
  },
  {
    path: Route.DEFAULT,
    component: InicioComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
