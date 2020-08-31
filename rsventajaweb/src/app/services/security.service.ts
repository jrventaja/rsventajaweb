import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from '../model/usertoken.model';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
  };

  getToken(username: string, password: string) {
    const params = new HttpParams()
    .set('Username', username)
    .set('Password', password);
    const paramsObject = params.keys().reduce((object, key) => {
        object[key] = params.get(key)
        return object
    }, {})
    return this.httpClient
      .post<UserToken>('https://localhost:44350/api/Authentication/token', JSON.stringify(paramsObject), this._httpOptions);
  }

  verifyAuthentication(token: string) {
    const params = new HttpParams()
    .set('token', token);
    const paramsObject = params.keys().reduce((object, key) => {
        object[key] = params.get(key)
        return object
    }, {})
    return this.httpClient
      .post<UserToken>('https://localhost:44350/api/Authentication/token/verify', JSON.stringify(paramsObject), this._httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError.bind(this)));
  }

  private extractData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: any) {
    if (error.status === 401) {
      throw error;
    } else {
      throw error;
    }
  }
}
