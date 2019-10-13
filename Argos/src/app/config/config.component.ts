import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  configForms;
  logForm;

  constructor(private formBuilder: FormBuilder, public authService: UserAuthService) {
    this.configForms = formBuilder.group({
      nome: '',
      cpf: '',
      nascimento: '',
      profpic: {}
    })
    this.logForm = formBuilder.group({
      email: '',
      senha: ''
    })
    console.log(authService)
  }

  onSubmit(data){
    var dados = data;
  }

  login(data){
    this.authService.login(data);
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit() {
  }

}
