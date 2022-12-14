import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoaUrl)
    .toPromise();
  }
}
