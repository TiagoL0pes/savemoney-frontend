import { Component, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusPagamento } from 'src/app/shared/enums/status-pagamento.enum';
import { Parcela } from 'src/app/shared/models/parcela';

@Component({
  selector: 'app-parcela-dialog',
  templateUrl: './parcela-dialog.component.html',
  styleUrls: ['./parcela-dialog.component.scss']
})
export class ParcelaDialogComponent {
  public event: EventEmitter<any>;

  constructor(
    public dialogRef: MatDialogRef<ParcelaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Parcela[],
  ) {
    this.event = new EventEmitter();
  }

  fechar(): void {
    this.dialogRef.close();
  }

  estaPago(status: string): boolean {
    return StatusPagamento.PAGO === StatusPagamento[status];
  }

  getStatusPagamento(status: StatusPagamento) {
    return StatusPagamento[status];
  }

}
