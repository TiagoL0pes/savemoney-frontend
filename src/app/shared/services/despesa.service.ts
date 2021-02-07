import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../filters/filter';
import { Despesa } from '../models/despesa';
import { DespesaRequest } from '../models/requests/despesa-request';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class DespesaService extends AbstractService {

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  adicionar(request: DespesaRequest): Observable<Despesa> {
    return this._http.post<Despesa>(`${environment.api}/despesas`, request);
  }

  listar(filter: Filter): Observable<Despesa[]> {
    const params = this.queryParams(filter);
    return this._http.get<Despesa[]>(`${environment.api}/despesas`, { params });
  }

  buscarPorId(id: number): Observable<any> {
    return this._http.get(`${environment.api}/despesas/${id}`);
  }

  atualizar(request: Despesa) {
    return this._http.put<Despesa>(`${environment.api}/despesas/${request.idDespesa}`, request);
  }

  remover(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.api}/despesas/${id}`);
  }

  criarFormulario(despesa: Despesa, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      idDespesa: [despesa.idDespesa],
      dataEntrada: [despesa.dataEntrada, Validators.required],
      dataPagamento: [despesa.dataPagamento],
      dataVencimento: [despesa.dataVencimento],
      descricao: [despesa.descricao, Validators.required],
      valor: [despesa.valor, Validators.required],
      status: [despesa.statusPagamento]
    });
  }
}
