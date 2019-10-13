import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { ChamadosComponent } from './chamados/chamados.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [  
  { path: 'map', component: MapComponent },
  { path: 'chamados', component: ChamadosComponent },

  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    ChamadosComponent
  ],
  imports: [
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyChu10VWIPUubpw6ddw3vK2dXcjIn-k4hA'
    }),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
    BrowserModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
