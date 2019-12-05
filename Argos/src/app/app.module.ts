import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';
import { MapComponent } from './map/map.component';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CadastroComponent } from './cadastro/cadastro.component';

import { UserAuthService } from './user-auth.service';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    DenunciaComponent,
    MapComponent,
    HomeComponent,
    CadastroComponent,
    ConfigComponent,
    FileUploadComponent
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
    DeviceDetectorModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UserAuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [  
  { path: 'map', component: MapComponent },
  { path: 'config', component: ConfigComponent },

  { path: '', component: HomeComponent }
];*/
