import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { CartaoCredito } from 'src/app/shared/models/cartao-credito';
import { CartaoCreditoRequest } from 'src/app/shared/models/requests/cartao-credito-request';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-adicionar-cartao',
  templateUrl: './adicionar-cartao.component.html',
  styleUrls: ['./adicionar-cartao.component.scss']
})
export class AdicionarCartaoComponent implements OnInit, OnDestroy {
  cartaoForm: FormGroup;
  title = 'Adicionar Cartão';
  actionButton: string = 'Adicionar';
  subscriptions: Subscription;

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private storageService: StorageService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.cartaoForm = this.cartaoCreditoService.criarFormularioCartaoCredito(new CartaoCredito(), this.formBuilder);
  }

  salvar(cartao: CartaoCreditoRequest): void {
    const contaInfo = this.storageService.getContaBancariaLocal();
    cartao.contaBancaria.idContaBancaria = contaInfo.idContaBancaria;
    const obs$ = this.cartaoCreditoService.adicionar(cartao)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Cartão de crédito adicionado com sucesso!');
        this.router.navigateByUrl(Route.CARTAO_CREDITO);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
