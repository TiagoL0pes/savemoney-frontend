import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Route } from 'src/app/shared/enums/route.enum';
import { Despesa } from 'src/app/shared/models/despesa';
import { DespesaService } from 'src/app/shared/services/despesa.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { formatarData } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.scss']
})
export class AdicionarDespesaComponent implements OnInit, OnDestroy {
  despesaForm: FormGroup;
  title = 'Adicionar despesa';
  actionButton: string = 'Adicionar';
  subscriptions: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private despesaService: DespesaService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.despesaForm = this.despesaService.criarFormulario(new Despesa(), this.formBuilder);
  }

  salvar(despesa: Despesa): void {
    despesa.dataEntrada = formatarData(despesa.dataEntrada);
    despesa.dataVencimento = formatarData(despesa.dataVencimento);

    const obs$ = this.despesaService.adicionar(despesa)
      .subscribe(response => {
        this.messageService.showSuccessMessage('Despesa adicionada com sucesso!');
        this.router.navigateByUrl(Route.DESPESA);
      }, handler => this.messageService.showErrorMessage('Ops', handler.error.message));
    this.subscriptions.add(obs$);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
