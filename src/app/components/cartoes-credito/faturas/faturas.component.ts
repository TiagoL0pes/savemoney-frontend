import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FaturaDatasource } from 'src/app/shared/datasources/fatura-datasource';
import { StatusPagamento } from 'src/app/shared/enums/status-pagamento.enum';
import { FaturaFilter } from 'src/app/shared/filters/fatura-filter';
import { Fatura } from 'src/app/shared/models/fatura';
import { FaturaRequest } from 'src/app/shared/models/requests/fatura-request';
import { PagamentoRequest } from 'src/app/shared/models/requests/pagamento-request';
import { FaturaService } from 'src/app/shared/services/fatura.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PagamentoService } from 'src/app/shared/services/pagamento.service';
import { gerarMeses } from 'src/app/shared/utils/functions';
import { SweetAlertResult } from 'sweetalert2';
import { ParcelaDialogComponent } from '../shared/parcela-dialog/parcela-dialog.component';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss']
})
export class FaturasComponent implements OnInit, OnDestroy {
  dataSource: FaturaDatasource;
  displayedColumns: string[] = ['dataVencimento', 'status', 'total', 'actions'];
  idCartao: string;
  status = StatusPagamento;
  meses: any[];
  mesFormControl: FormControl;
  anos: number[];
  anoFormControl: FormControl;
  subscriptions: Subscription;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private FaturaService: FaturaService,
    private statusPagamento: PagamentoService,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    this.title.setTitle('Faturas');
    this.mesFormControl = new FormControl();
    this.anoFormControl = new FormControl();
    this.meses = gerarMeses();
    this.anos = this.gerarAnos();
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.idCartao = this.activatedRoute.snapshot.params.idCartao;
    const filter = FaturaFilter.createFilter('dataVencimento', this.idCartao);
    this.dataSource = new FaturaDatasource(this.FaturaService, this.messageService);
    this.dataSource.buscarFaturas(filter);
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        tap(() => this.dataSource
          .buscarFaturas(FaturaFilter.createFilter('dataVencimento', this.idCartao)))
      ).subscribe();
  }

  adicionarFatura() {
    this.messageService.showConfirmDialog('Fechar Fatura', 'Tem certeza que você deseja fechar essa fatura ?', 'Sim, fechar!')
      .subscribe((res: SweetAlertResult) => {
        if (res.value === true) {
          const invoice = new FaturaRequest(this.idCartao, this.mesFormControl.value, this.anoFormControl.value);
          const obs$ = this.FaturaService.gerar(invoice)
            .subscribe(() => {
              this.messageService.showSuccessMessage('Fatura fechada com sucesso!');
              this.resetForm();
              this.dataSource.buscarFaturas(FaturaFilter.createFilter('dataVencimento', this.idCartao));
            }, handler => {
              this.messageService.showErrorMessage('Ops', handler.error.message);
              this.resetForm();
            });
          this.subscriptions.add(obs$);
        }
      }, error => console.error(error));
  }

  pagar(idFatura): void {
    const request = new PagamentoRequest(this.idCartao);
    this.messageService.showConfirmDialog('Pagar Fatura', 'Tem certeza que você deseja pagar essa fatura ?', 'Sim, pagar!')
      .subscribe((res: SweetAlertResult) => {
        if (res.value === true) {
          const obs$ = this.statusPagamento.pagarFatura(idFatura, request)
            .subscribe(() => {
              this.messageService.showSuccessMessage('Fatura paga com sucesso!');
              this.dataSource.buscarFaturas(FaturaFilter.createFilter('dataVencimento', this.idCartao));
            }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
          this.subscriptions.add(obs$);
        }
      }, error => console.error(error));
  }

  atualizar(idFatura): void {
    this.messageService.showConfirmDialog('Você tem certeza ?', 'Você não conseguirá reverter essa operação!', 'Sim, atualizar!')
      .subscribe(res => {
        if (res.value === true) {
          this.FaturaService.atualizar(idFatura, new FaturaRequest(this.idCartao))
            .subscribe(() => {
              this.messageService.showSuccessMessage('Fatura atualizada com sucesso!');
              this.dataSource.buscarFaturas(FaturaFilter.createFilter('dataVencimento', this.idCartao));
            }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
        }
      }, error => console.error(error))
  }

  openDialog(faturas: Fatura[]): void {
    let dialogRef = this.dialog.open(ParcelaDialogComponent, {
      maxWidth: '1400px',
      width: '90%',
      data: faturas,
      disableClose: true,
      position: { top: '0' },
      panelClass: 'app-full-bleed-dialog'
    });
    dialogRef.componentInstance.event.subscribe(response => console.log(response));
  }

  gerarAnos(): number[] {
    const currentYear = new Date().getFullYear() - 10;
    return Array.from({ length: 90 }, (_, i) => currentYear + i);
  }

  resetForm(): void {
    this.mesFormControl.reset();
    this.anoFormControl.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
