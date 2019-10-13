import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class UserAuthService {
  user;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  cadastro(formData){
    var Dados = formData;
    this.afAuth.auth.createUserWithEmailAndPassword(Dados.email, Dados.senha).then(()=>{});
  }

  login(data){
    this.afAuth.auth.signInWithEmailAndPassword(data.email, data.senha).then((user)=>{
      this.user = user;
    });
  }

  logout(){
    this.afAuth.auth.signOut()
  }

}
