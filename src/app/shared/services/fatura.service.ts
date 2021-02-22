import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FaturaFilter } from '../filters/fatura-filter';
import { Despesa } from '../models/despesa';
import { Fatura } from '../models/fatura';
import { FaturaRequest } from '../models/requests/fatura-request';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class FaturaService extends AbstractService {
  constructor(
    private http: HttpClient

  ) {
    super();
  }

  gerar(request: FaturaRequest): Observable<void> {
    return this.http.post<void>(`${environment.api}/faturas`, request);
  }

  atualizar(id: number, request: FaturaRequest): Observable<void> {
    return this.http.post<void>(`${environment.api}/faturas/${id}`, request);
  }

  listar(filter: FaturaFilter): Observable<Fatura[]> {
    const params = filter.createQueryParams();
    return this.http.get<Fatura[]>(`${environment.api}/faturas`, { params });
  }

  criarFormulario(despesa: Despesa, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      idDespesa: [despesa.idDespesa],
      dataEntrada: [despesa.dataEntrada, Validators.required],
      dataPagamento: [despesa.dataPagamento],
      dataVencimento: [despesa.dataVencimento],
      descricao: [despesa.descricao, Validators.required],
      valor: [despesa.valor, Validators.required],
      statusPagamento: [despesa.statusPagamento]
    });
  }
}
