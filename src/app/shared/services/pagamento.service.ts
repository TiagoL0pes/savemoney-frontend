import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatusPagamento } from '../enums/status-pagamento.enum';
import { PagamentoRequest } from '../models/requests/pagamento-request';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(
    private _http: HttpClient
  ) { }

  pagarDespesa(id: number): Observable<any> {
    return this._http.post(`${environment.api}/pagamentos/despesa/${id}`, {});
  }

  pagarFatura(id: number, request: PagamentoRequest): Observable<any> {
    return this._http.post(`${environment.api}/pagamentos/fatura/${id}`, request);
  }

  criarFormulario(payment: PagamentoRequest, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      idCartao: [payment.idCartaoCredito]
    });
  }

  despesaEstaPaga(status) {
    return status === StatusPagamento.PAGO;
  }
}
