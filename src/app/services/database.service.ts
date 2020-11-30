import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform, IonItemSliding } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { UsuarioLogin, Notificacion, UsuarioLoginApi } from '../interfaces/usuario-interfaces';
import { NotificacionesService } from './notificaciones.service';
import { CentroAPI } from '../interfaces/centros-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);



  constructor(private platform: Platform, private sqlite: SQLite, private httpClient: HttpClient, private sqlPorter: SQLitePorter) {

    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'aytoAlcantarilla.db',
        location: 'default'
      })
      .then(async (db: SQLiteObject) => {
          this.storage = db;
          console.log('DB: CREMAOS LAS TABLAS...');
          await this.crearTablas();
          console.log('DB: TABLAS CREADAS');
      });
    });
   }


   async crearTablas() {

    this.httpClient.get(
      'assets/dumps.sql',
      {responseType: 'text'}
    ).toPromise().then(data => {
      this.sqlPorter.importSqlToDb(this.storage, data).then( () => {
          this.isDbReady.next(true);
        }).catch(error => console.error(error));
    });
  }


  async estadoBD() {
    return new Promise((resolve, reject) => {

      if (this.isDbReady.getValue()) {

        resolve();

      } else {

        this.isDbReady.subscribe((ready) => {

          if (ready) {

            resolve();

          }

        });

      }

    });
  }

  addUsuario(usuario: UsuarioLoginApi) {

    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    console.log('DB:addUsuario 0');
    this.estadoBD().then(async () => {
        console.log('DB:addUsuario 1');

        this.storage.executeSql('DELETE FROM usuariosTable').then(() => {
          console.log('DB: Tabla USUARIOS vacia'); }).catch(() => { console.log('DB: ERROR AL BORRAR TABLAS USUARIO'); });

        // tslint:disable-next-line: max-line-length
        const data = [usuario.UserName, usuario.Password, usuario.RememberMe, usuario.NombreCompleto, usuario.FingerID];
        // tslint:disable-next-line: max-line-length
        const respuesta = this.storage.executeSql('INSERT INTO usuariosTable (UserName, Password_, RememberMe, NombreCompleto, FingerID) VALUES (?, ?, ?, ?, ?)', data).then(() => {
          console.log('DB: Usuario creado');

        });

    }).catch( error => {

      console.log('Error al añadir el usuario a la bd: ', error);

    });


  }



  BorrarUsuario() {
    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    this.estadoBD().then(async () => {
      console.log('DB: Borramos todo el contenido de la tabla de BD...');
        this.storage.executeSql('DELETE FROM usuariosTable').then(() => {
          console.log('DB: Tabla USUARIOS vacia'); }).catch(error => { console.log('DB: ERROR AL BORRAR TABLAS USUARIO'); });
          this.storage.executeSql('DELETE FROM notificacion').then(() => {
            console.log('DB: Tabla NOTIFICACION vacia'); }).catch(error => { console.log('DB: ERROR AL BORRAR TABLAS NOTFICACION'); });
    });
  }

  async obtenerUltimoUsuario(): Promise<UsuarioLoginApi> {
    const res =  await this.storage.executeSql('SELECT * FROM usuariosTable LIMIT 1 ', []);
    if (res.rows.length !== 0) {
      return {
        UserName: res.rows.item(0).UserName,
        Password: res.rows.item(0).Password,
        NombreCompleto: res.rows.item(0).NombreCompleto,
        RememberMe: res.rows.item(0).RememberMe,
        FingerID: res.rows.item(0).FingerID
      };
    } else { return null; }

  }

  addNotificacion(notificacion: Notificacion) {

    this.estadoBD().then(async () => {
        const data = [notificacion.Titulo, notificacion.Mensaje, notificacion.Leido, notificacion.TipoDocumento, notificacion.Fecha, notificacion.Ruta, notificacion.Icono];
        const respuesta = await this.storage.executeSql('INSERT INTO notificacion (Titulo, Mensaje, Leido, TipoDocumento, Fecha,Ruta,Icono) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(() => {
          console.log('DB: Notificacion añadida');


        });
        console.log('DB: Respuesta Notificacion', respuesta);
    });
  }



  BorrarNotificacion(id) {
    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    this.estadoBD().then(async () => {
      console.log('DB: Borramos notificacion BD...');
        this.storage.executeSql('DELETE FROM notificacion WHERE IdNotificacion=' + id).then(() => {
          console.log('DB: Notificacion Borrada'); }).catch(error => { console.log('DB: ERROR AL BORRAR NOTIFICACION'); });
    });
  }


  async obtenerTodasNotificacion() {

    const sql = 'SELECT * FROM notificacion';

    try {
      const response = await this.storage.executeSql(sql, []);
      const notificaciones = [];
      console.log('obtener notificacion index ' + notificaciones);
      for (let index = 0; index < response.rows.length; index++) {
        notificaciones.push(response.rows.item(index));
        console.log('obtener notificacion index ' + response.rows.item(index));
      }
      return Promise.resolve<Notificacion[]>(notificaciones);
    } catch (error) {
      Promise.reject(error);
    }

  }


  async marcarTodasNotificacionLeidas(): Promise<Notificacion> {
    const data = [1, 0];
    // tslint:disable-next-line: max-line-length
    const res = await this.storage.executeSql('UPDATE notificacion SET Leido=? WHERE Leido = ?', data);
    return null;
  }
  async marcarNotificacionLeida(id) {
    const data = [1, id];
    // tslint:disable-next-line: max-line-length
    const res = await this.storage.executeSql('UPDATE notificacion SET Leido=? WHERE IdNotificacion = ?', data);

  }

  async obtenerNotificacion(id): Promise<Notificacion> {
    const res =  await this.storage.executeSql('SELECT * FROM notificacion WHERE IdNotificacion=' + id, []);
    if (res.rows.length !== 0) {
      return {
        IdNotificacion: res.rows.item(0).IdNotificacion,
        Titulo: res.rows.item(0).Titulo,
        Mensaje: res.rows.item(0).Mensaje,
        TipoDocumento: res.rows.item(0).TipoDocumento,
        Leido: res.rows.item(0).Leido,
        Fecha: res.rows.item(0).Fecha,
        Ruta: res.rows.item(0).Ruta,
        Icono: res.rows.item(0).Icono,
      };
    } else { return null; }

  }

  async ModificarRutaNotificacion() {
    const res =  await this.storage.executeSql('SELECT * FROM notificacion ORDER BY IdNotificacion DESC LIMIT 1', []);
    if (res.rows.length !== 0) {
      const notificacion = {
        IdNotificacion: res.rows.item(0).IdNotificacion,
        Titulo: res.rows.item(0).Titulo,
        Mensaje: res.rows.item(0).Mensaje,
        TipoDocumento: res.rows.item(0).TipoDocumento,
        Leido: res.rows.item(0).Leido,
        Fecha: res.rows.item(0).Fecha,
        Ruta: res.rows.item(0).Ruta,
        Icono: res.rows.item(0).Icono,
      };
      console.log('Notificacion.IdNotificacion ' + notificacion.IdNotificacion);
      const NuevaRuta = '/message/' + notificacion.IdNotificacion;
      const data = [NuevaRuta, notificacion.IdNotificacion];
    // tslint:disable-next-line: max-line-length
     const resultado = await this.storage.executeSql('UPDATE notificacion SET Ruta=? WHERE IdNotificacion = ?', data);
    } else { return null; }

  }


  // CENTROS FAVORITOS

  async addCentroFav(centro: CentroAPI) {

    await this.estadoBD().then(async () => {
        const data = [centro.Id, centro.Direccion, centro.DireccionCompleto, centro.Nombre, centro.Localidad, centro.Provincia, centro.CodigoPostal,
                      centro.Telefono, centro.Email, centro.Imagen, centro.Latitud, centro.Longitud, centro.Distancia, centro.Horario];
        // tslint:disable-next-line: max-line-length
        const respuesta = await this.storage.executeSql('INSERT INTO centrosFavoritos (Id, Direccion, DireccionCompleto, Nombre, Localidad, Provincia, CodigoPostal, Telefono, Email, Imagen, Latitud, Longitud, Distancia, Horario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(() => {
          console.log('DB: CentroFav añadido');


        });
        console.log('DB: Respuesta CentroFav', respuesta);
    }).catch( error => {

      console.log('DataBaseService, error al insertar CentroFAV: ', error);

    });
  }



  async borrarCentroFav(id: number) {
    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    await this.estadoBD().then(async () => {
      console.log('DB: Borramos CentroFav BD...');
        this.storage.executeSql('DELETE FROM centrosFavoritos WHERE Id=' + id).then(() => {
          console.log('DB: CentroFav Borrada'); }).catch(error => { console.log('DB: ERROR AL BORRAR CENTRO'); });
    });
  }

  async obtenerCentrosFavAll() {

    try {
      const response = await this.storage.executeSql('SELECT * FROM centrosFavoritos', []);
      console.log('Response: ', response);
      const centros = [];
      for (let index = 0; index < response.rows.length; index++) {
        centros.push(response.rows.item(index));
      }
      console.log('CENTROOOOOOS: ', response);


      return Promise.resolve<CentroAPI[]>(centros);
    } catch (error) {
      Promise.reject(error);
    }

  }

  async obtenerCentroFav(id): Promise<Notificacion> {
    const res =  await this.storage.executeSql('SELECT * FROM centrosFavoritos WHERE Id=?', [id]);
    if (res.rows.length !== 0) {
      return {
        IdNotificacion: res.rows.item(0).IdNotificacion,
        Titulo: res.rows.item(0).Titulo,
        Mensaje: res.rows.item(0).Mensaje,
        TipoDocumento: res.rows.item(0).TipoDocumento,
        Leido: res.rows.item(0).Leido,
        Fecha: res.rows.item(0).Fecha,
        Ruta: res.rows.item(0).Ruta,
        Icono: res.rows.item(0).Icono,
      };
    } else { return null; }

  }
  async obtenerTodasSinLeerNotificacion() {

    /*     const sql = 'SELECT * FROM notificacion WHERE Leido = ?';
     */
        try {
          const response = await this.storage.executeSql('SELECT * FROM notificacion WHERE Leido = ?', [0]);
          const notificaciones = [];
          for (let index = 0; index < response.rows.length; index++) {
            notificaciones.push(response.rows.item(index));
            console.log('obtener notificacion Leido2 ' + response.rows.item(index));
          }

          return Promise.resolve<Notificacion[]>(notificaciones);
        } catch (error) {
          Promise.reject(error);
        }

      }




}
