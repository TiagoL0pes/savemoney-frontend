import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { DespesaDatasource } from 'src/app/shared/datasources/despesa-datasource';
import { StatusPagamento } from 'src/app/shared/enums/status-pagamento.enum';
import { Filter } from 'src/app/shared/filters/filter';
import { Columns } from 'src/app/shared/models/columns';
import { DespesaService } from 'src/app/shared/services/despesa.service';
import { PagamentoService } from 'src/app/shared/services/pagamento.service';
import { ResizeService } from 'src/app/shared/services/resize.service';
import { mesAtual } from 'src/app/shared/utils/functions';
import { MatPaginatorIntlConfig } from 'src/app/shared/utils/mat-paginator-intl-config';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlConfig }]
})
export class DespesasComponent implements OnInit, AfterViewInit {
  mes: string = '';
  ano: number;
  status = StatusPagamento;
  dataSource: DespesaDatasource;
  displayedColumns: string[];
  desktopColumns: string[] = ['dataEntrada', 'dataVencimento', 'dataPagamento', 'descricao', 'valor', 'status', 'actions'];
  mobileColumns: string[] = ['descricao', 'valor', 'status', 'actions'];

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private title: Title,
    private despesaService: DespesaService,
    private resizeService: ResizeService,
    private pagamentoService: PagamentoService
  ) {
    this.title.setTitle('Despesas');
    this.mes = mesAtual(new Date().getMonth());
    this.ano = new Date().getFullYear();
    this.displayedColumns = window.innerWidth >= 768 ?
      this.desktopColumns : this.mobileColumns;
  }

  ngOnInit(): void {
    const filtro = Filter.createFilter('descricao');
    this.dataSource = new DespesaDatasource(this.despesaService);
    this.dataSource.buscarDespesas(filtro);
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        tap(() => this.dataSource.buscarDespesas(
          new Filter(
            `${this.paginator.pageIndex}`,
            `${this.paginator.pageSize}`,
            'descricao',
            'asc')))
      ).subscribe();
  }

  onResize(event): void {
    const columns = new Columns(this.desktopColumns, this.mobileColumns);
    this.displayedColumns = this.resizeService.onResize(event, columns);
  }

  despesaEstaPaga(status) {
    return this.pagamentoService.despesaEstaPaga(status);
  }

  anterior(mes: number) {
    this.ano = mes === 11 ? this.ano - 1 : this.ano;
    this.mes = mesAtual(mes);
    const filter = Filter.createFilter('descricao', mes, this.ano);
    this.dataSource.buscarDespesas(filter);
  }

  proximo(mes) {
    this.ano = mes === 0 ? this.ano + 1 : this.ano;
    this.mes = mesAtual(mes);
    const filter = Filter.createFilter('descricao', mes, this.ano);
    this.dataSource.buscarDespesas(filter);
  }


}
