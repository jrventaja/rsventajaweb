import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from '../model/usertoken.model';
import { Policy } from '../model/policy.model';
import { FileResponse } from '../model/fileresponse.model';
import { Insurer } from '../model/insurer.model';

@Injectable({
  providedIn: 'root',
})
export class InsurerService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
        'Token' : sessionStorage.getItem("Token")
    })
  };

  getInsurers() {
    return this.httpClient
      .get<Insurer[]>('http://rsventaja.com:8080/api/Insurer', this._httpOptions);
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
