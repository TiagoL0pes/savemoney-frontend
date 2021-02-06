import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mesPorNome } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-month-paginator',
  templateUrl: './month-paginator.component.html',
  styleUrls: ['./month-paginator.component.scss']
})
export class MonthPaginatorComponent {
  @Input() public mes: string
  @Input() public ano: string
  @Output() public anteriorAction: EventEmitter<number>;
  @Output() public proximoAction: EventEmitter<number>;

  constructor() {
    this.mes = '';
    this.ano = '';
    this.anteriorAction = new EventEmitter();
    this.proximoAction = new EventEmitter();
  }

  anterior(): void {
    const numeroMes = mesPorNome(this.mes);
    this.anteriorAction.emit(numeroMes === 0 ? 11 : numeroMes - 1);
  }

  proximo(): void {
    const numeroMes = mesPorNome(this.mes);
    this.proximoAction.emit(numeroMes === 11 ? 0 : numeroMes + 1);
  }

}
