import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartaoCredito } from 'src/app/shared/models/cartao-credito';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-detalhar-cartao',
  templateUrl: './detalhar-cartao.component.html',
  styleUrls: ['./detalhar-cartao.component.scss']
})
export class DetalharCartaoComponent implements OnInit, OnDestroy {
  cartaoForm: FormGroup;
  title = 'Cartão de Crédito';
  idCartaoCredito: number;
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
        .subscribe((cartao: CartaoCredito) => this.cartaoForm = this.cartaoCreditoService.criarFormularioCartaoCredito(cartao, this.formBuilder));
      this.subscriptions.add(obs$);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



}
