import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-listagem',
  templateUrl: './lancamentos-listagem.component.html',
  styleUrls: ['./lancamentos-listagem.component.css']
})
export class LancamentosListagemComponent implements OnInit {

  lancamentos = [ ];

  constructor(
    private lancamentoService: LancamentoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.lancamentoService.listar()
    .then(resultado => {
      this.lancamentos = resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(lancamento: any): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamneto: any): void {
    this.lancamentoService.excluir(lancamneto.codigo)
    .then(() => {
      this.listar();
      this.messageService.add({
        severity: 'success',
        detail: 'Lançamento ecluído com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
