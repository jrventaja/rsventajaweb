import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit {
signedin: boolean = false;
  constructor(private securityService : SecurityService) {
    
  }

  async ngOnInit() {
    this.signedin = await this.securityService.verifyAuthentication(sessionStorage.getItem("Token")).toPromise();
  }

}
