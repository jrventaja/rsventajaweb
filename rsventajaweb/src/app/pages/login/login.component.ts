import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signForm;
  sessionStorage = sessionStorage;
  constructor(private securityService : SecurityService, private formBuilder: FormBuilder) {
    this.signForm = this.formBuilder.group({
      user: '',
      password: ''
    });
  }
  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.securityService.getToken(username, password).subscribe(userTokenData => sessionStorage.setItem("Token", userTokenData.token));
  }

  onSubmit(signForm: any) {
    this.login(signForm.user, signForm.password);
  }

}
