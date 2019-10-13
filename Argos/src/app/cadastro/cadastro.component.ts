import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadForm;

  constructor(private formBuilder: FormBuilder, public authService: UserAuthService, public router: Router) { 
    this.cadForm = formBuilder.group({
      email: '',
      password: '',
      nome: '',
      cpf: '',
      nascimento: '',
      profpic: {},
      conf: {}
    })
  }

  ngOnInit() {
  }

  onSubmit(data){
    this.authService.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password).then(()=>{
      this.router.navigate(['/'])
    })
  }
}
