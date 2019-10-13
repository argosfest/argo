import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  tipo: string;
  status: string;

  markers;

  longitude;
  latitude;
  constructor(public http: HttpClient) { }

  ngOnInit() {
    console.log(this.markers);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
    } else {
      console.log("No support for geolocation")
    }
    this.http.post('http://172.20.10.13:5000/syncronize', {id: 30, coords:{lat: this.latitude , lng: this.longitude}}).subscribe((response)=>{
      console.log(response)
      this.markers = response.events;
    })
  }

  closeData(){
    var obj = document.getElementById('dataExpand')
    obj.setAttribute('class', '');
    var obj = document.getElementById('blackbgnd')
    obj.setAttribute('class', '');
  }

  expandData(tipo:string, status:string){
    console.log(tipo)
    this.tipo = tipo;
    this.status = status;
    var obj = document.getElementById('dataExpand')
    obj.setAttribute('class', 'show');
    var obj = document.getElementById('blackbgnd')
    obj.setAttribute('class', 'show');
  }

}
