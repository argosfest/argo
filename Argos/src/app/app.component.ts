
import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { UserAuthService } from './user-auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status: null;
  location: string;
  denunciar;
  authService;
  isMobile;
  files: Array<{data: string, imagem: boolean}>;
  Mac;
  Dtype;
  
  arquivos: {};

  constructor(location: Location, private router: Router, private formBuilder: FormBuilder, public userAuthService: UserAuthService, deviceService: DeviceDetectorService) {
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.location = location.path();
      } else {
        this.location = "Home";
      }
    });
    this.denunciar = formBuilder.group({
      address: '',
      tipo: '',
      obs: '',
      file: [null, Validators.required]
    });
    this.authService = userAuthService;
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(){
    this.authService.afAuth.authState.subscribe((status)=>{
      console.log("------------------");
      console.log(status);
      this.status = status;
    })
    
    console.log(this.Mac);
  }

  onSubmit(data){
    console.log(data);
    console.log(status);
    console.log(this.status != null);
    console.log(data.file);
    console.log(data.file != {});
    if(this.status != null || this.files != undefined){
      var dados = data;
      this.denunciar.reset();
      this.display(true);
      this.files = null;
    }
  }

  title = 'app';

  display(open){
    console.log(this.location);
    if(!open){
      var obj = document.getElementById("blackbg");
      obj.setAttribute("class", 'show');
      obj = document.getElementById("denuncia");
      obj.setAttribute("class", 'show');
    } else{
      var obj = document.getElementById("blackbg");
      obj.setAttribute("class", '');
      obj = document.getElementById("denuncia");
      obj.setAttribute("class", '');
    }
  }
  
  fileUpload(event){
    let reader = new FileReader();
    console.log(event);

    if(event.target.files && event.target.files.length) {
      const [arquivo] = event.target.files;
      reader.readAsDataURL(arquivo);

      reader.onload = () => {
        console.log(this.files);
        if(this.files != undefined){
          this.files.push({data: reader.result.toString(), imagem: reader.result.toString().indexOf('image') == 5 });
        } else{
          this.files = [{data: reader.result.toString(), imagem: reader.result.toString().indexOf('image') == 5 }];
        }
        
        var obj = <HTMLInputElement> document.getElementById('files');
        obj.value = '';
        console.log(this.files);
      };
      
    }
  }

  videoTracks;
  abrirCam(){
    console.log(PermissionStatus);
    console.log(PermissionStatus.arguments);
    console.log(PermissionStatus.length);
    var obj = document.getElementById('camera');
    obj.setAttribute('class', 'show');
    navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment', width: 720, height: 1280}}).then((response) => {
      var player = <HTMLVideoElement> document.getElementById('player'); 
      var snapshotCanvas = document.getElementById('snapshot');
      player.srcObject = response;
      console.log(response.getVideoTracks());
      this.videoTracks = response.getVideoTracks();
    })
  }

  closeCam(){
    this.videoTracks.forEach(element => {
      element.stop();
    });
    var obj = document.getElementById('camera');
    obj.setAttribute('class', '');
  }

  capture(){
    var player = <HTMLVideoElement>document.getElementById('player');
    var accept = document.getElementById('accept');
    var deny = document.getElementById('deny'); 
    var snapshotCanvas = <HTMLCanvasElement> document.getElementById('snapshot');
    var context = snapshotCanvas.getContext('2d');
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, snapshotCanvas.width, 
        snapshotCanvas.height);
    snapshotCanvas.setAttribute('class', 'taken');
    accept.setAttribute('class', 'taken');
    deny.setAttribute('class', 'taken');
  }

  acceptPicture(){
    var snapshotCanvas = <HTMLCanvasElement> document.getElementById('snapshot');
    var accept = document.getElementById('accept');
    var deny = document.getElementById('deny');
    var context = snapshotCanvas.getContext('2d');
    var dataURL = snapshotCanvas.toDataURL("image/png");
    console.log(dataURL);
    if(this.files != undefined){
      this.files.push({data: dataURL, imagem: true });
    } else{
      this.files = [{data: dataURL, imagem: true }];
    }
    context.clearRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
    snapshotCanvas.setAttribute('class', '');
    accept.setAttribute('class', '');
    deny.setAttribute('class', '');
    this.closeCam();
  }
  
  discardPicture(){
    var snapshotCanvas = <HTMLCanvasElement> document.getElementById('snapshot');
    var accept = document.getElementById('accept');
    var deny = document.getElementById('deny');
    var context = snapshotCanvas.getContext('2d');
    context.clearRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
    snapshotCanvas.setAttribute('class', '');
    accept.setAttribute('class', '');
    deny.setAttribute('class', '');
  }
}