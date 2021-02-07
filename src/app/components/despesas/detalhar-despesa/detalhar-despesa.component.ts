import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { StatusPagamento } from 'src/app/shared/enums/status-pagamento.enum';
import { Despesa } from 'src/app/shared/models/despesa';
import { PagamentoRequest } from 'src/app/shared/models/requests/pagamento-request';
import { DespesaService } from 'src/app/shared/services/despesa.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PagamentoService } from 'src/app/shared/services/pagamento.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-detalhar-despesa',
  templateUrl: './detalhar-despesa.component.html',
  styleUrls: ['./detalhar-despesa.component.scss']
})
export class DetalharDespesaComponent implements OnInit, OnDestroy {
  despesaForm: FormGroup;
  pagamentoForm: FormGroup;
  title: string = '';
  statusPagamento: string;
  idDespesa: number;
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private pagamentoService: PagamentoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.despesaForm = this.despesaService.criarFormulario(new Despesa(), this.formBuilder);
    this.pagamentoForm = this.pagamentoService.criarFormulario(new PagamentoRequest(), this.formBuilder);
    this.idDespesa = this.activatedRoute.snapshot.params.idDespesa;
    
    if (this.idDespesa) {
      const obs$ = this.despesaService.buscarPorId(this.idDespesa)
        .subscribe((despesa: Despesa) => {
          this.title = despesa.descricao;
          this.statusPagamento = StatusPagamento[despesa.statusPagamento];
          this.despesaForm = this.despesaService.criarFormulario(despesa, this.formBuilder);
        }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
      this.subscriptions.add(obs$);
    }
  }

  pagar(payment: PagamentoRequest): void {
    this.messageService.showConfirmDialog('Pagar despesa', 'Tem certeza que você deseja pagar essa despesa ?', 'Sim, pagar!')
      .subscribe((res: SweetAlertResult) => {
        if (res.value === true) {
          const obs$ = this.pagamentoService.pagarDespesa(this.idDespesa)
            .subscribe(response => {
              this.messageService.showSuccessMessage('Pagamento realizado com sucesso!');
              this.router.navigateByUrl(Route.DESPESA);
            }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
          this.subscriptions.add(obs$);
        }
      }, error => console.error(error));
  }

  remover(payment: PagamentoRequest): void {
    this.messageService.showConfirmDialog('Remover despesa', 'Tem certeza que você deseja remover essa despesa ?', 'Sim, remover!')
      .subscribe((res: SweetAlertResult) => {
        if (res.value === true) {
          const obs$ = this.despesaService.remover(this.idDespesa)
            .subscribe(() => {
              this.messageService.showSuccessMessage('Despesa removida com sucesso!');
              this.router.navigateByUrl(Route.DESPESA);
            }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
          this.subscriptions.add(obs$);
        }
      }, error => console.error(error));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
