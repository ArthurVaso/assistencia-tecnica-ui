import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ouathTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor( private http: HttpClient,
               private jwtHelper: JwtHelperService
             ) {
              this.carregarToken();
              }


  private carregarToken(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/x-www-form-urlencoded')
    .append('Authorization', 'Basic Y2xpZW50OmNsaWVudA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.ouathTokenUrl, body, { headers })
    .toPromise()
    .then(response => {
      console.log(response);
    })
    .catch(response => {
      if (response.status === 400) {
        if (response.error === 'invalid_grant') {
          return Promise.reject('Usuário e/ou senha inválida!');
        }
      }

      return Promise.reject(response);
    });
  }

}

