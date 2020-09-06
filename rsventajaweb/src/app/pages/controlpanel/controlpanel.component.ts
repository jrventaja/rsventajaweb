import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Observable, Subject } from 'rxjs';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/model/policy.model';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit {
  signedin: boolean = false;
  policies$: Observable<Policy[]>;
  constructor(private securityService: SecurityService,
    private policyService: PolicyService) { }

  async ngOnInit() {
    this.signedin = await this.securityService.verifyAuthentication(sessionStorage.getItem("Token")).toPromise();
    this.loadData();
  }

  loadData() {
    this.policies$ = this.policyService.getDuePolicies();
  }

  async download(policyId: number) {
    let policyFile = await this.policyService.getPolicyFile(policyId).toPromise();
    var binary = atob(policyFile.encodedFileData.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }         
    var blob = new Blob([view], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
}
