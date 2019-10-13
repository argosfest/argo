import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  location: string;
  longitude;
  latitude;
  
  constructor(location: Location, router: Router, public http: HttpClient){
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.location = location.path();
      } else {
        this.location = "Home";
      }
    });
  }

  ngOnInit(){
    
  }
}
