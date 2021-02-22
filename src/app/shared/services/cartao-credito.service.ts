import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filter } from '../filters/filter';
import { CartaoCredito } from '../models/cartao-credito';
import { ItemCartao } from '../models/item-cartao';
import { CartaoCreditoRequest } from '../models/requests/cartao-credito-request';
import { ItemCartaoRequest } from '../models/requests/item-cartao-request';
import { ResumoItemCartao } from '../models/resumo-item-cartao';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService extends AbstractService {
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  adicionar(request: CartaoCreditoRequest): Observable<CartaoCredito> {
    return this.http.post<CartaoCredito>(`${environment.api}/cartoes/credito`, request);
  }

  adicionarItemCartao(id: number, request: ItemCartaoRequest): Observable<ItemCartao> {
    return this.http.post<ItemCartao>(`${environment.api}/cartoes/credito/${id}/adicionar/itens`, request);
  }

  buscarPorId(id: number): Observable<CartaoCredito> {
    return this.http.get<CartaoCredito>(`${environment.api}/cartoes/credito/${id}`);
  }

  buscarItemPorId(id: number): Observable<ItemCartao> {
    return this.http.get<ItemCartao>(`${environment.api}/cartoes/credito/itens/${id}`);
  }

  getResumoItens(id: number, filter: Filter): Observable<ResumoItemCartao> {
    const params = this.queryParams(filter);
    return this.http.get<ResumoItemCartao>(`${environment.api}/cartoes/credito/${id}/resumo/itens`, { params });
  }

  listar(filter: Filter): Observable<CartaoCredito[]> {
    const params = this.queryParams(filter);
    return this.http.get<CartaoCredito[]>(`${environment.api}/cartoes/credito`, { params });
  }

  atualizar(request: CartaoCredito): Observable<CartaoCredito> {
    return this.http.put<CartaoCredito>(`${environment.api}/cartoes/credito/${request.idCartaoCredito}`, request);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/cartoes/credito/${id}`);
  }

  atualizarItemCartao(idCartao: number, idItemCartao: number, request: ItemCartaoRequest): Observable<ItemCartaoRequest> {
    return this.http.put<ItemCartaoRequest>(`${environment.api}/cartoes/credito/${idCartao}/itens/${idItemCartao}`, request);
  }

  removerItemCartao(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}/cartoes/credito/itens/${id}`);
  }

  criarFormularioCartaoCredito(cartao: CartaoCredito, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      idCartaoCredito: [cartao.idCartaoCredito],
      numero: [cartao.numero, Validators.compose([
        Validators.required,
        Validators.minLength(16)
      ])],
      diaVencimento: [cartao.diaVencimento, Validators.compose([
        Validators.required,
        Validators.pattern(/\d*/g)
      ])],
      limiteCredito: [cartao.limiteCredito],
      contaBancaria: [{
        idContaBancaria: cartao?.contaBancaria?.idContaBancaria
      }],
    });
  }

  criarFormularioItemCartao(item: ItemCartaoRequest, formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      dataCompra: [item.dataCompra, Validators.required],
      descricao: [item.descricao, Validators.maxLength(20)],
      valorTotal: [item.valorTotal, Validators.required],
      numeroParcelas: [item.numeroParcelas, Validators.required],
    });
  }
}