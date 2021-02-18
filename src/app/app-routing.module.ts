import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AdicionarCartaoComponent } from './components/cartoes-credito/adicionar-cartao/adicionar-cartao.component';
import { CartoesCreditoComponent } from './components/cartoes-credito/cartoes-credito.component';
import { DetalharCartaoComponent } from './components/cartoes-credito/detalhar-cartao/detalhar-cartao.component';
import { EditarCartaoComponent } from './components/cartoes-credito/editar-cartao/editar-cartao.component';
import { AdicionarItemComponent } from './components/cartoes-credito/itens-cartao/adicionar-item/adicionar-item.component';
import { DetalharItemComponent } from './components/cartoes-credito/itens-cartao/detalhar-item/detalhar-item.component';
import { EditarItemComponent } from './components/cartoes-credito/itens-cartao/editar-item/editar-item.component';
import { ItensCartaoComponent } from './components/cartoes-credito/itens-cartao/itens-cartao.component';
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
    path: Route.CARTAO_CREDITO,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CartoesCreditoComponent
      },
      {
        path: Route.ADICIONAR_CARTAO_CREDITO,
        component: AdicionarCartaoComponent
      },
      {
        path: Route.DETALHAR_CARTAO_CREDITO,
        component: DetalharCartaoComponent
      },
      {
        path: Route.EDITAR_CARTAO_CREDITO,
        component: EditarCartaoComponent
      },
    ]
  },
  {
    path: Route.ITEM_CARTAO,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ItensCartaoComponent
      },
      {
        path: Route.ADICIONAR_ITEM_CARTAO,
        component: AdicionarItemComponent
      },
      {
        path: Route.DETALHAR_ITEM_CARTAO,
        component: DetalharItemComponent
      },
      {
        path: Route.EDITAR_ITEM_CARTAO,
        component: EditarItemComponent
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
