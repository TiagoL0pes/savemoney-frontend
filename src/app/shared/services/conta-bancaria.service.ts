import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContaBancaria } from '../models/conta-bancaria';
import { ContaBancariaRequest } from '../models/requests/conta-bancaria-request';
import { SaldoRequest } from '../models/requests/saldo-request';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {
  constructor(
    private http: HttpClient
  ) { }

  adicionar(request: ContaBancaria): Observable<void> {
    return this.http.post<void>(`${environment.api}/contas/bancarias`, request);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${environment.api}/contas/bancarias/${id}`);
  }

  depositar(id: number, request: SaldoRequest): Observable<any> {
    return this.http.patch(`${environment.api}/contas/bancarias/depositar/${id}`, request);
  }

  sacar(id: number, request: SaldoRequest): Observable<any> {
    return this.http.patch(`${environment.api}/contas/bancarias/sacar/${id}`, request);
  }

  criarFormulario(balance: SaldoRequest, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      valor: [balance.valor, Validators.required],
      descricao: [balance.descricao],
      transacao: [balance.transacao]
    });
  }

  criarFormularioContaBancaria(request: ContaBancariaRequest, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      agencia: [request.agencia, Validators.required],
      conta: [request.conta, Validators.required],
      saldo: [request.saldo],
      idBanco: [request.idBanco, Validators.required]
    });
  }
}
