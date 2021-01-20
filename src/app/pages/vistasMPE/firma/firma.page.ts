import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { FirmaService } from '../../../services/firma.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Tarea } from '../../../interfaces/interfacesTareas';
import { TareasService } from '../../../services/tareas.service';
import { DatabaseService } from '../../../services/database.service';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';

@Component({
  selector: 'app-firma',
  templateUrl: './firma.page.html',
  styleUrls: ['./firma.page.scss'],
})

export class FirmaPage implements OnInit {

  
  @ViewChild('sPad', {static: true}) signaturePad;
  signPad: any;
  res: any;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  tarea: Tarea;
  usuario: UsuarioLoginApi;
  constructor(private camera: Camera,
              private firmaService: FirmaService,
              private file: File,
              private tareaService: TareasService,
              private usuarioService: UsuarioService,
              private dbService: DatabaseService
              ) {}

  ngOnInit(): void {
    this.tarea = this.tareaService.getTarea();
    this.usuario = this.usuarioService.getUsuario();
  }

  ngAfterViewInit(): void {
    this.signPad = new SignaturePad(this.signaturePad.nativeElement);
  }


  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  async firmar() {
    this.usuarioService.present('Enviando firma...');
    const firmaBase64 = this.signPad.toDataURL();
    await this.firmaService.enviarFirmaAPI(this.usuario.IdUsuario, this.tarea.IdTarea, firmaBase64).then( data => {

      if(data.Ok) {

        this.usuarioService.dismiss();

      } else {
        const blob = this.dataURLToBlob(firmaBase64);
        
        this.dbService.addFirmaPendiente(this.usuario.IdUsuario, this.tarea.IdTarea, blob)
        this.usuarioService.dismiss();

      }

    }).catch( error => {

      const blob = this.dataURLToBlob(firmaBase64);
        
      this.dbService.addFirmaPendiente(this.usuario.IdUsuario, this.tarea.IdTarea, blob)
      this.usuarioService.dismiss();

    }); 

    /* const blob = this.dataURLToBlob(firmaBase64);
    const name = new Date().getTime() + '.png';
    const path = this.file.dataDirectory;
    const options: IWriteOptions = { replace: true };
    console.log('BLOB: ', blob);
    this.file.writeFile(path, name, blob, options).then(res => {
      this.res = res;
      this.file.resolveLocalFilesystemUrl(res.nativeURL).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
      console.log(this.res);
    }); */
  }
  borrar() {
    this.signPad.clear();
  }

  /* readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
    });
    const formData = new FormData();
    formData.append('name', 'Hello');
    formData.append('file', imgBlob, file.name);
      
    };
    reader.readAsArrayBuffer(file);
  } */
}

