import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemCartao } from 'src/app/shared/models/item-cartao';
import { ItemCartaoRequest } from 'src/app/shared/models/requests/item-cartao-request';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { formatarData } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.scss']
})
export class EditarItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  title = 'Editar Item';
  actionButton: string = 'Atualizar';
  subscriptions: Subscription;
  idCartao: number;
  idItem: number;

  constructor(
    private cartaoService: CartaoCreditoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.itemForm = this.cartaoService.criarFormularioItemCartao(new ItemCartaoRequest(), this.formBuilder);
    this.idCartao = this.activatedRoute.snapshot.params.idCartao;
    this.idItem = this.activatedRoute.snapshot.params.idItem;
    if (this.idItem) {
      const obs$ = this.cartaoService.buscarItemPorId(this.idItem)
        .subscribe((cartao: ItemCartao) => this.itemForm =
          this.cartaoService.criarFormularioItemCartao(this.criarCartaoRequest(cartao), this.formBuilder),
          handler => this.messageService.showErrorMessage('Ops', handler.error.message));
      this.subscriptions.add(obs$);
    }
  }

  atualizar(item: ItemCartaoRequest): void {
    item.dataCompra = formatarData(item.dataCompra);

    const obs$ = this.cartaoService.atualizarItemCartao(this.idCartao, this.idItem, item)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Item atualizado com sucesso!');
        this.router.navigateByUrl(`item/cartao/${this.idCartao}`);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  criarCartaoRequest(item: ItemCartao) {
    return new ItemCartaoRequest(
      item.dataCompra,
      item.descricao,
      item.valor,
      item.numeroParcelas
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
