import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusPagamento } from 'src/app/shared/enums/status-pagamento.enum';
import { Filter } from 'src/app/shared/filters/filter';
import { ResumoItemCartao } from 'src/app/shared/models/resumo-item-cartao';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { mesAtual } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-itens-cartao',
  templateUrl: './itens-cartao.component.html',
  styleUrls: ['./itens-cartao.component.scss']
})
export class ItensCartaoComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  mes: string = '';
  ano: number;
  status = StatusPagamento;
  idCartao: number;
  resumo: ResumoItemCartao;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private cartaoService: CartaoCreditoService,
    private dialog: MatDialog
  ) {
    this.subscriptions = new Subscription();
    this.title.setTitle('Itens do cartão');
    this.mes = mesAtual(new Date().getMonth());
    this.ano = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.idCartao = this.activatedRoute.snapshot.params.idCartao;
    const filter = Filter.createFilter('descricao');
    const obs$ = this.cartaoService.getResumoItens(this.idCartao, filter)
      .subscribe(resumo => this.resumo = resumo);
    this.subscriptions.add(obs$);
  }

  getStatusPagamento(status: StatusPagamento) {
    return StatusPagamento[status];
  }

  estaPago(status: string): boolean {
    return StatusPagamento.PAGO === StatusPagamento[status];
  }

  anterior(mes: number) {
    this.ano = mes === 11 ? this.ano - 1 : this.ano;
    this.mes = mesAtual(mes);
    const filter = Filter.createFilter('descricao', mes, this.ano);
    const obs$ = this.cartaoService.getResumoItens(this.idCartao, filter)
      .subscribe(resumo => this.resumo = resumo);
    this.subscriptions.add(obs$);
  }

  proximo(mes) {
    this.ano = mes === 0 ? this.ano + 1 : this.ano;
    this.mes = mesAtual(mes);
    const filter = Filter.createFilter('descricao', mes, this.ano);
    const obs$ = this.cartaoService.getResumoItens(this.idCartao, filter)
      .subscribe(resumo => this.resumo = resumo);
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
