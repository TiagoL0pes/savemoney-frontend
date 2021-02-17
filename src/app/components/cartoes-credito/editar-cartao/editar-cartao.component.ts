import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { CartaoCredito } from 'src/app/shared/models/cartao-credito';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-editar-cartao',
  templateUrl: './editar-cartao.component.html',
  styleUrls: ['./editar-cartao.component.scss']
})
export class EditarCartaoComponent implements OnInit, OnDestroy {
  cartaoForm: FormGroup;
  title = 'Editar Cartão';
  idCartaoCredito: number;
  actionButton: string = 'Atualizar';
  subscriptions: Subscription;

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.cartaoForm = this.cartaoCreditoService.criarFormularioCartaoCredito(new CartaoCredito(), this.formBuilder);
    this.idCartaoCredito = this.activatedRoute.snapshot.params.idCartao;

    if (this.idCartaoCredito) {
      const obs$ = this.cartaoCreditoService.buscarPorId(this.idCartaoCredito)
        .subscribe((cartao: CartaoCredito) =>
          this.cartaoForm = this.cartaoCreditoService.criarFormularioCartaoCredito(cartao, this.formBuilder),
          handler => this.messageService.showErrorMessage('Ops', handler.error.message));
      this.subscriptions.add(obs$);
    }
  }

  atualizar(cartao: CartaoCredito): void {
    const obs$ = this.cartaoCreditoService.atualizar(cartao)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Cartão de crédito atualizado com sucesso!');
        this.router.navigateByUrl(Route.CARTAO_CREDITO);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
