import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [ ];

  pessoas = [ ];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamnetoService: LancamentoService,
    private MessageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoLancamneto = this.route.snapshot.params[`codigo`];

    if (codigoLancamneto != 'novo') {
      this.carregarLancamentos(codigoLancamneto);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando(): boolean {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamentos(codigo: number) {
    this.lancamnetoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(): any {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias
      .map((c: any) => ({ label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas
      .map((p: any) => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(lancamnetoForm: FormControl): void {
    this.lancamnetoService.adicionar(this.lancamento)
    .then(() => {
      console.log('Lançamento adicionado com sucesso!');
      lancamnetoForm.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamneto(lancamnetoForm: NgForm) {
    this.lancamnetoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.MessageService.add({
        severity: 'success',
        detail: 'Lançamento atualizado com sucesso!'
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamneto(LancamnetoForm: NgForm): void {
    this.lancamnetoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.MessageService.add({
        severity: 'success',
        detail: 'Lançamento adicionado com sucesso!'
      });

      this.router.navigate([
        '/lancamnetos',
        lancamentoAdicionado.codigo
      ]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset(new Lancamento);

    this.router.navigate([
      '/lancamentos/novo'
    ]);
  }
}
