import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdicionarCartaoComponent } from './components/cartoes-credito/adicionar-cartao/adicionar-cartao.component';
import { CartoesCreditoComponent } from './components/cartoes-credito/cartoes-credito.component';
import { DetalharCartaoComponent } from './components/cartoes-credito/detalhar-cartao/detalhar-cartao.component';
import { EditarCartaoComponent } from './components/cartoes-credito/editar-cartao/editar-cartao.component';
import { FaturasComponent } from './components/cartoes-credito/faturas/faturas.component';
import { AdicionarItemComponent } from './components/cartoes-credito/itens-cartao/adicionar-item/adicionar-item.component';
import { DetalharItemComponent } from './components/cartoes-credito/itens-cartao/detalhar-item/detalhar-item.component';
import { EditarItemComponent } from './components/cartoes-credito/itens-cartao/editar-item/editar-item.component';
import { ItensCartaoComponent } from './components/cartoes-credito/itens-cartao/itens-cartao.component';
import { CartaoCreditoComponent } from './components/cartoes-credito/shared/cartao-credito/cartao-credito.component';
import { ItemCartaoComponent } from './components/cartoes-credito/shared/item-cartao/item-cartao.component';
import { ParcelaDialogComponent } from './components/cartoes-credito/shared/parcela-dialog/parcela-dialog.component';
import { AdicionarDespesaComponent } from './components/despesas/adicionar-despesa/adicionar-despesa.component';
import { DespesasComponent } from './components/despesas/despesas.component';
import { DetalharDespesaComponent } from './components/despesas/detalhar-despesa/detalhar-despesa.component';
import { EditarDespesaComponent } from './components/despesas/editar-despesa/editar-despesa.component';
import { DespesaComponent } from './components/despesas/shared/despesa/despesa.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MonthPaginatorComponent } from './components/shared/month-paginator/month-paginator.component';
import { NoContentComponent } from './components/shared/no-content/no-content.component';
import { ContentComponent } from './components/template/content/content.component';
import { NavigationComponent } from './components/template/navigation/navigation.component';
import { ToolbarComponent } from './components/template/toolbar/toolbar.component';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MaterialModule } from './shared/material/material/material.module';
import { MatPaginatorIntlConfig } from './shared/utils/mat-paginator-intl-config';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InicioComponent,
    ContentComponent,
    ToolbarComponent,
    NavigationComponent,
    NoContentComponent,
    MonthPaginatorComponent,
    DespesasComponent,
    DespesaComponent,
    AdicionarDespesaComponent,
    DetalharDespesaComponent,
    EditarDespesaComponent,
    CartoesCreditoComponent,
    CartaoCreditoComponent,
    AdicionarCartaoComponent,
    DetalharCartaoComponent,
    EditarCartaoComponent,
    ItensCartaoComponent,
    AdicionarItemComponent,
    DetalharItemComponent,
    EditarItemComponent,
    ItemCartaoComponent,
    ParcelaDialogComponent,
    FaturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    InterceptorsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlConfig }
  ],
  entryComponents: [
    ParcelaDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
