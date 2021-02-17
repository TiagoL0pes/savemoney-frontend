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
import { DespesasComponent } from './components/despesas/despesas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MonthPaginatorComponent } from './components/shared/month-paginator/month-paginator.component';
import { NoContentComponent } from './components/shared/no-content/no-content.component';
import { ContentComponent } from './components/template/content/content.component';
import { NavigationComponent } from './components/template/navigation/navigation.component';
import { ToolbarComponent } from './components/template/toolbar/toolbar.component';
import { InterceptorsModule } from './shared/interceptors/interceptors.module';
import { MaterialModule } from './shared/material/material/material.module';
import { MatPaginatorIntlConfig } from './shared/utils/mat-paginator-intl-config';
import { DespesaComponent } from './components/despesas/shared/despesa/despesa.component';
import { AdicionarDespesaComponent } from './components/despesas/adicionar-despesa/adicionar-despesa.component';
import { DetalharDespesaComponent } from './components/despesas/detalhar-despesa/detalhar-despesa.component';
import { EditarDespesaComponent } from './components/despesas/editar-despesa/editar-despesa.component';
import { CartoesCreditoComponent } from './components/cartoes-credito/cartoes-credito.component';
import { CartaoCreditoComponent } from './components/cartoes-credito/shared/cartao-credito/cartao-credito.component';
import { AdicionarCartaoComponent } from './components/cartoes-credito/adicionar-cartao/adicionar-cartao.component';
import { DetalharCartaoComponent } from './components/cartoes-credito/detalhar-cartao/detalhar-cartao.component';
import { EditarCartaoComponent } from './components/cartoes-credito/editar-cartao/editar-cartao.component';

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
    EditarCartaoComponent
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
  bootstrap: [AppComponent]
})
export class AppModule { }
