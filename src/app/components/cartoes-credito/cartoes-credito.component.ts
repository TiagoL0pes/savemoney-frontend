import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { CartaoCreditoDatasource } from 'src/app/shared/datasources/cartao-credito-datasource';
import { Filter } from 'src/app/shared/filters/filter';
import { Columns } from 'src/app/shared/models/columns';
import { CartaoCreditoService } from 'src/app/shared/services/cartao-credito.service';
import { ResizeService } from 'src/app/shared/services/resize.service';

@Component({
  selector: 'app-cartoes-credito',
  templateUrl: './cartoes-credito.component.html',
  styleUrls: ['./cartoes-credito.component.scss']
})
export class CartoesCreditoComponent implements OnInit, AfterViewInit {
  dataSource: CartaoCreditoDatasource;
  displayedColumns: string[];
  desktopColumns: string[] = ['numero', 'diaVencimento', 'limiteCredito', 'limiteDisponivel', 'actions'];
  mobileColumns: string[] = ['numero', 'limiteCredito', 'actions'];

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private title: Title,
    private resizeService: ResizeService,
    private cartaoService: CartaoCreditoService
  ) {
    this.title.setTitle('Cartões');
    this.displayedColumns = window.innerWidth >= 768 ?
      this.desktopColumns : this.mobileColumns;
  }

  ngOnInit(): void {
    const filter = Filter.createFilter('numero');
    this.dataSource = new CartaoCreditoDatasource(this.cartaoService);
    this.dataSource.buscarCartoesCredito(filter);
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        tap(() => this.dataSource.buscarCartoesCredito(
          new Filter(
            `${this.paginator.pageIndex}`,
            `${this.paginator.pageSize}`,
            'numero',
            'asc')))
      ).subscribe();
  }

  onResize(event): void {
    const columns = new Columns(this.desktopColumns, this.mobileColumns);
    this.displayedColumns = this.resizeService.onResize(event, columns);
  }

}
