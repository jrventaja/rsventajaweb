import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from '../model/usertoken.model';
import { Policy } from '../model/policy.model';
import { FileResponse } from '../model/fileresponse.model';
import { environment } from '../../environments/environment';

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
      .get<Policy[]>(`${environment.apiEndpoint}/api/Policy/duePolicies`, this._httpOptions);
  }

  getPoliciesQuery(query: string, currentOnly: boolean) {
    return this.httpClient
      .get<Policy[]>(`${environment.apiEndpoint}/api/Policy?searchTerm=${query}&currentOnly=${currentOnly}`, this._httpOptions);
  }

  updateRenewalStarted(policyId: number, status: boolean) {
    var request = {
      PolicyId: policyId,
      Status: status
    };
    return this.httpClient
      .post<boolean>(`${environment.apiEndpoint}/api/Policy/updateRenewal`, JSON.stringify(request), this._httpOptions);
  }

  addPolicy(name: string, additionalInfo: string, startDate: Date, endDate: Date, insurerId: number, file: string, fileName: string) {
    var request = {
      Name: name,
      AdditionalInfo: additionalInfo,
      StartDate: startDate.toJSON(),
      EndDate: endDate.toJSON(),
      InsurerId: insurerId,
      File: file,
      FileName: fileName
    };
    return this.httpClient
      .post(`${environment.apiEndpoint}/api/Policy/new`, JSON.stringify(request), this._httpOptions);
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
