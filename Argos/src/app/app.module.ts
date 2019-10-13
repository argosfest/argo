import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { UserAuthService } from './user-auth.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';



const appRoutes: Routes = [  
  { path: 'map', component: MapComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'cadastro', component: CadastroComponent},

  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DenunciaComponent,
    MapComponent,
    HomeComponent,
    ConfigComponent,
    FileUploadComponent,
    CadastroComponent
  ],
  imports: [
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChu10VWIPUubpw6ddw3vK2dXcjIn-k4hA'
    }),
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    DeviceDetectorModule.forRoot()
  ],
  providers: [UserAuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
