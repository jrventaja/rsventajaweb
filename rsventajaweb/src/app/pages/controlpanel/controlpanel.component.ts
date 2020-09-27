import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Observable, Subject } from 'rxjs';
import { PolicyService } from 'src/app/services/policy.service';
import { Policy } from 'src/app/model/policy.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Insurer } from 'src/app/model/insurer.model';
import { InsurerService } from 'src/app/services/insurer.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit {
  displayedColumns: string[] = ['renewal', 'days', 'name', 'insurer', 'additional', 'start', 'end', 'download'];
  displayedColumnsCurrent: string[] = ['days', 'name', 'insurer', 'additional', 'start', 'end', 'download'];  
  displayedColumnsAll: string[] = ['name', 'insurer', 'additional', 'start', 'end', 'download'];
  signedin: boolean = false;
  policies$: Observable<Policy[]>;
  queryCurrentPolicies$: Observable<Policy[]>;
  queryCurrentForm: FormGroup;
  queryPolicies$: Observable<Policy[]>;
  insurers$: Observable<Insurer[]>;
  queryForm: FormGroup;
  insertForm: FormGroup;
  model: NgbDateStruct;
  file: string | ArrayBuffer;
  fileName: string;
  faCalendar = faCalendar;
  displayAlert = false;
  danger: 'danger';
  displayQueryCurrent = false;
  displayQueryAll = false;
  constructor(private securityService: SecurityService, private formBuilder: FormBuilder,
    private policyService: PolicyService, private insurerService: InsurerService) {
    this.queryCurrentForm = this.formBuilder.group({
      query: ''
    });
    this.queryForm = this.formBuilder.group({
      query: ''
    });
    this.insertForm = this.formBuilder.group({
      name: '',
      insurer: 0,
      additionalInfo: '',
      startDate: null,
      endDate: null,
      file: ''
    });
  }

  async ngOnInit() {
    this.signedin = await this.securityService.verifyAuthentication(sessionStorage.getItem("Token")).toPromise();
    this.loadData();
  }

  loadData() {
    this.policies$ = this.policyService.getDuePolicies();
    this.insurers$ = this.insurerService.getInsurers();
  }

  calculateDays(endDate: Date): number {
    let nowDate = new Date();
    endDate = new Date(endDate);
    return Math.floor((endDate.getTime() - nowDate.getTime()) / 1000 / 60 / 60 / 24);
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
    var blob = new Blob([view], { type: "application/octet-stream" });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = policyFile.fileName;
    anchor.href = url;
    anchor.click();
  }

  onCurrentPoliciesSubmit(queryCurrentForm: FormGroup) {
    if (queryCurrentForm.value.query.length > 0) {
      this.displayQueryCurrent = false;
      this.queryCurrentPolicies$ = this.policyService.getPoliciesQuery(queryCurrentForm.value.query, true);
      this.queryCurrentForm.reset();
    } else {
      this.displayQueryCurrent = true;
    }
  }

  onPoliciesSubmit(queryForm: FormGroup) {
    if (queryForm.value.query.length > 0) {
      this.displayQueryAll = false;
      this.queryPolicies$ = this.policyService.getPoliciesQuery(queryForm.value.query, false);
      this.queryForm.reset();
    } else {
      this.displayQueryAll = true;
    }
  }

  async updateRenewalStarted(policyId: number, evt) {
    let bool = evt.target.checked;
    await this.policyService.updateRenewalStarted(policyId, bool).toPromise();;
  }

  async onInsertSubmit(insertForm: FormGroup) {
    const form = insertForm.value;
    if (form.additionalInfo.length > 0 && form.name.length > 0 && form.insurer > 0 && form.startDate && form.endDate && form.additionalInfo.length > 0) {
      this.displayAlert = false;
      await this.policyService.addPolicy(form.name, form.additionalInfo, form.startDate, form.endDate, form.insurer, this.file as string, this.fileName).toPromise();
      insertForm.reset();
    } else {
      this.displayAlert = true;
    }
  }

  handleUpload() {
    const file = this.insertForm.value.file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.file = (reader.result as string).split(';base64,')[1];
      this.fileName = file.name;
    };
  }

  close() {
    this.displayAlert = false;
  }

  closeQueryCurrent() {
    this.displayQueryCurrent = false;
  }

  closeQueryAll() {
    this.displayQueryAll = false;
  }
}
