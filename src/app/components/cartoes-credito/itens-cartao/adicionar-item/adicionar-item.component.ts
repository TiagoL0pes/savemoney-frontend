import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemCartaoRequest } from 'src/app/shared/models/requests/item-cartao-request';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { formatarData } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.scss']
})
export class AdicionarItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  title = 'Adicionar Item';
  actionButton: string = 'Adicionar';
  subscriptions: Subscription;
  idCartao: number;

  constructor(
    private cartaoService: CartaoCreditoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.itemForm = this.cartaoService.criarFormularioItemCartao(new ItemCartaoRequest(), this.formBuilder);
    this.idCartao = this.activatedRoute.snapshot.params.idCartao;
  }

  salvar(item: ItemCartaoRequest): void {
    item.dataCompra = formatarData(item.dataCompra);

    const obs$ = this.cartaoService.adicionarItemCartao(this.idCartao, item)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Item salvo com sucesso!');
        this.router.navigateByUrl(`card/items/${this.idCartao}`);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
