import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Despesa } from 'src/app/shared/models/despesa';
import { PagamentoRequest } from 'src/app/shared/models/requests/pagamento-request';
import { PagamentoService } from 'src/app/shared/services/pagamento.service';
import { MatPaginatorIntlConfig } from 'src/app/shared/utils/mat-paginator-intl-config';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlConfig }]
})
export class DespesaComponent implements OnInit {
  @Input() public despesaForm: FormGroup;
  @Input() public title: string;
  @Input() public actionButton: string;
  @Input() public statusPagamento: string;
  @Output() public executeAction: EventEmitter<Despesa>;
  @Output() public pagamentoAction: EventEmitter<PagamentoRequest>;
  @Output() public removeAction: EventEmitter<PagamentoRequest>;
  ocultarAoEditar: boolean;

  constructor(
    private pagamentoService: PagamentoService
  ) {
    this.ocultarAoEditar = location.pathname.indexOf('detalhar') >= 0;
    this.executeAction = new EventEmitter();
    this.pagamentoAction = new EventEmitter();
    this.removeAction = new EventEmitter();
  }

  ngOnInit(): void {
    if (this.ocultarAoEditar) {
      this.removerValidators(this.despesaForm);
    }
  }

  execute(): void {
    if (this.despesaForm.valid) {
      this.executeAction.emit(this.despesaForm.value)
    }
  }

  pagar(): void {
    this.pagamentoAction.emit();
  }

  remover(): void {
    this.removeAction.emit();
  }

  removerValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }

  despesaEstaPaga() {
    return this.pagamentoService.despesaEstaPaga(this.statusPagamento);
  }
}
