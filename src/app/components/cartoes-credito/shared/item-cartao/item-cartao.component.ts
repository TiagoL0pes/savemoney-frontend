import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemCartao } from 'src/app/shared/models/item-cartao';
import { ItemCartaoRequest } from 'src/app/shared/models/requests/item-cartao-request';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';

@Component({
  selector: 'app-item-cartao',
  templateUrl: './item-cartao.component.html',
  styleUrls: ['./item-cartao.component.scss']
})
export class ItemCartaoComponent implements OnInit {
  @Input() public title: string;
  @Input() public valor: number;
  @Input() public actionButton: string;
  @Input() public itemForm: FormGroup;
  @Output() public executeAction: EventEmitter<ItemCartao>;
  @Output() public removeAction: EventEmitter<void>;
  ocultarAoDetalhar: boolean;
  mostrarAoEditar: boolean;

  constructor(
    private cartaoService: CartaoCreditoService,
    private formBuilder: FormBuilder
  ) {
    this.ocultarAoDetalhar = location.pathname.indexOf('/detalhar/') >= 0;
    this.mostrarAoEditar = location.pathname.indexOf('/editar/') >= 0;
    this.executeAction = new EventEmitter();
    this.removeAction = new EventEmitter();
  }

  ngOnInit(): void {
    this.itemForm = this.cartaoService.criarFormularioItemCartao(new ItemCartaoRequest(), this.formBuilder);
    if (this.ocultarAoDetalhar) {
      this.removerValidators(this.itemForm);
    }
  }

  execute(): void {
    if (this.itemForm.valid) {
      this.executeAction.emit(this.itemForm.value);
    }
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

}
