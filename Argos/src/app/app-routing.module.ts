import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { MapComponent } from './map/map.component';
import { CadastroComponent } from './cadastro/cadastro.component';



const routes: Routes = [  
  { path: 'map', component: MapComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'cadastro', component: CadastroComponent},

  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
