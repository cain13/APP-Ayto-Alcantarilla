import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../interfaces/usuario-interfaces';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})


export class NotificacionesService {


  numNotificaciones$ = new Subject<number>();
  numNot = 0;
  listaMensajes: Array<Notificacion> = [];

  notificacionMantoux: any;


  constructor(private db: DatabaseService, private usuarioService: UsuarioService
          ) { }

  aumentarNotificaciones() {
    this.db.obtenerTodasSinLeerNotificacion().then( resp => {
      this.numNot = resp.length;
      this.numNotificaciones$.next(this.numNot);
      console.log('aumentarNot: ', this.numNot);
      console.log(' resp.length: ',  resp.length);

    });

  }


   marcarNotificacionesLeidas() {
    if (this.numNot !== 0) {

      this.numNot = this.numNot - 1;

    } else {

      this.numNot = 0;

    }

    this.numNotificaciones$.next(this.numNot);
  }

  marcarNotificacionesTodasLeidas() {
    this.numNot = 0;
    this.numNotificaciones$.next(this.numNot);
  }

  SumaUnaNotificaciones() {
      this.numNot = this.numNot + 1;
      this.numNotificaciones$.next(this.numNot);
      console.log('aumentarNot: ', this.numNot);
  }

  AcutalizaNumNotificaciones(numNotificaciones: number) {
    this.numNot = numNotificaciones;
    this.numNotificaciones$.next(this.numNot);
    console.log('aumentarNot: ', this.numNot);
}


  RestaUnaNotificaciones() {
    this.numNot = this.numNot - 1;
    this.numNotificaciones$.next(this.numNot);
    console.log('aumentarNot: ', this.numNot);
  }

  getNotifiaciones$(): Observable<number> {
    console.log('this.numNotificaciones$.asObservable(): ', this.numNotificaciones$.asObservable());
    return this.numNotificaciones$.asObservable();

  }

  async getNotificacion(id): Promise<Notificacion> {
    let notificacion: Notificacion;
    await this.db.obtenerNotificacion(id, this.usuarioService.getUsuario().UserName, this.usuarioService.getUsuario().Password).then((noti) => {
      notificacion = noti;
    });
    return notificacion;
  }


  guardarNotMantoux(not: any) {

    this.notificacionMantoux = not;

  }

  leerNotMantoux(): any {

    return this.notificacionMantoux;

  }


}
