import { Lancamento } from './../core/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://8080/lancamentos'

  constructor( private http: HttpClient ) { }

  listar(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}`)
    .toPromise()
    .then(response => {
      return response;
    });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.post<any>(this.lancamentosUrl,
      Lancamento.toJson(lancamento), { headers })
      .toPromise();
  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,
    Lancamento.toJson(lancamento),
    { headers })
    .toPromise()
    .then((response: any) => {
      const lancamentoAlterado = response;

      this.converterStringParaDatas([lancamentoAlterado]);

      return lancamentoAlterado;
    });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then((response: any) => {
      const lancamneto = response;

      this.converterStringParaDatas([lancamneto]);

      return lancamneto;
    })
  }

  converterStringParaDatas(lancamentos: Lancamento[]): void {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(
        lancamento.dataVencimento,
        'DD/MM/YYYY'
      ).toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(
          lancamento.dataPagamento,
          'DD/MM/YYYY'
        ).toDate();
      }
    }
  }
}
