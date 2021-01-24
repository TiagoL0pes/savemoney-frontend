import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TipoTransacao } from 'src/app/shared/enums/tipo-transacao.enum';
import { ContaBancaria } from 'src/app/shared/models/conta-bancaria';
import { ContaBancariaInfo } from 'src/app/shared/models/conta-bancaria-info';
import { SaldoRequest } from 'src/app/shared/models/requests/saldo-request';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContaBancariaService } from 'src/app/shared/services/conta-bancaria.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit, OnDestroy {
  contaBancaria: ContaBancaria;
  saldoForm: FormGroup;
  idContaBancaria: number;
  subscriptions: Subscription;

  constructor(
    private titulo: Title,
    private contaBancariaService: ContaBancariaService,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.titulo.setTitle('Inicio');
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.idContaBancaria = +this.authService.getTokenItem('idContaBancaria');
    this.saldoForm = this.contaBancariaService.criarFormulario(new SaldoRequest(), this.formBuilder);
    this.contaBancariaService.buscarPorId(this.idContaBancaria)
      .subscribe((res: ContaBancaria) => {
        this.contaBancaria = res
        const contaInfo = new ContaBancariaInfo(res.idContaBancaria, res.agencia, res.conta);
        this.storageService.setContaBancariaLocal(contaInfo);
      });
  }

  depositar() {
    const saldo: SaldoRequest = this.saldoForm.getRawValue();
    saldo.transacao = TipoTransacao[TipoTransacao.ENTRADA];

    this.contaBancariaService.depositar(this.idContaBancaria, saldo)
      .subscribe(() => {
        this.contaBancaria.saldo = this.contaBancaria.saldo + (+saldo.valor);
        this.messageService.showSuccessMessage();
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));

    this.saldoForm.reset();
  }

  sacar() {
    const saldo: SaldoRequest = this.saldoForm.getRawValue();
    saldo.transacao = TipoTransacao[TipoTransacao.SAIDA];

    this.contaBancariaService.sacar(this.idContaBancaria, saldo)
      .subscribe(() => {
        this.contaBancaria.saldo = this.contaBancaria.saldo - (+saldo.valor);
        this.messageService.showSuccessMessage();
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));

    this.saldoForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
