import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemCartao } from 'src/app/shared/models/item-cartao';
import { ItemCartaoRequest } from 'src/app/shared/models/requests/item-cartao-request';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-detalhar-item',
  templateUrl: './detalhar-item.component.html',
  styleUrls: ['./detalhar-item.component.scss']
})
export class DetalharItemComponent implements OnInit, OnDestroy {
  itemForm: FormGroup;
  title = 'Itens do cartão';
  idCartao: number;
  idItem: number;
  subscriptions: Subscription;

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
        .subscribe((item: ItemCartao) => this.itemForm =
          this.cartaoService.criarFormularioItemCartao(this.criarItemRequest(item), this.formBuilder));
      this.subscriptions.add(obs$);
    }
  }

  criarItemRequest(item: ItemCartao) {
    return new ItemCartaoRequest(
      item.dataCompra,
      item.descricao,
      item.valor,
      item.numeroParcelas
    );
  }

  remover(event) {
    this.messageService.showConfirmDialog('Remover Item', 'Tem certeza que você deseja remover esse item ?', 'Sim, remover!')
      .subscribe((res: SweetAlertResult) => {
        if (res.value === true) {
          const obs$ = this.cartaoService.removerItemCartao(this.idItem)
            .subscribe(() => {
              this.messageService.showSuccessMessage('Item removido com sucesso!');
              this.router.navigateByUrl(`item/cartao/${this.idCartao}`);
            }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
          this.subscriptions.add(obs$);
        }
      }, error => console.error(error));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
