import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from '../model/usertoken.model';
import { Policy } from '../model/policy.model';
import { FileResponse } from '../model/fileresponse.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {

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

  getDuePolicies() {
    return this.httpClient
      .get<Policy[]>('http://rsventaja.com:8080/api/Policy/duePolicies', this._httpOptions);
  }

  getPoliciesQuery(query: string, currentOnly: boolean) {
    return this.httpClient
      .get<Policy[]>(`http://rsventaja.com:8080/api/Policy?searchTerm=${query}&currentOnly=${currentOnly}`, this._httpOptions);
  }

  getPolicyFile(policyId: number) {
    return this.httpClient
      .get<FileResponse>(`http://rsventaja.com:8080/api/Policy/${policyId}/download`, this._httpOptions);
  }

  updateRenewalStarted(policyId: number, status: boolean) {
    const params = new HttpParams()
    .set('PolicyId', policyId.toString())
    .set('Status', status.toString());
    const paramsObject = params.keys().reduce((object, key) => {
        object[key] = params.get(key)
        return object
    }, {})
    return this.httpClient
      .post<boolean>('http://rsventaja.com:8080/api/Policy/updateRenewal', JSON.stringify(paramsObject), this._httpOptions);
  }

  addPolicy(name: string, additionalInfo: string, startDate: Date, endDate: Date, insurerId: number, file: string, fileName: string) {
    const params = new HttpParams()
    .set('Name', name)
    .set('AdditionalInfo', additionalInfo)
    .set('StartDate', startDate.toDateString())
    .set('EndDate', endDate.toDateString())
    .set('InsurerId', insurerId.toString())
    .set('File', file)
    .set('FileName', fileName);
    const paramsObject = params.keys().reduce((object, key) => {
        object[key] = params.get(key)
        return object
    }, {})
    return this.httpClient
      .post('http://rsventaja.com:8080/api/Policy/new', JSON.stringify(paramsObject), this._httpOptions);
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
