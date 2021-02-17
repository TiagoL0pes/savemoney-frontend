import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartaoCredito } from 'src/app/shared/models/cartao-credito';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html',
  styleUrls: ['./cartao-credito.component.scss']
})
export class CartaoCreditoComponent implements OnInit {
  @Input() public title: string;
  @Input() public actionButton: string;
  @Input() public cartaoForm: FormGroup;
  @Output() public executeAction: EventEmitter<CartaoCredito>;
  @Output() public removeAction: EventEmitter<void>;
  exibirAoEditar: boolean;

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private formBuilder: FormBuilder
  ) {
    this.exibirAoEditar = location.pathname.indexOf('/adicionar/') >= 0
      || location.pathname.indexOf('/detalhar/') >= 0;
    this.executeAction = new EventEmitter();
    this.removeAction = new EventEmitter();
  }

  ngOnInit(): void {
    this.cartaoForm = this.cartaoCreditoService.criarFormularioCartaoCredito(new CartaoCredito(), this.formBuilder);
    if (this.exibirAoEditar) {
      this.removerValidators(this.cartaoForm);
    }
  }

  execute(): void {
    if (this.cartaoForm.valid) {
      this.executeAction.emit(this.cartaoForm.value);
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
