import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { EnviosPendientes, Notificacion, NotificacionesPendientes, RespuestaAPIBasica, UsuarioLoginApi } from '../interfaces/usuario-interfaces';
import { TipoIncidencia } from '../interfaces/interfacesTareas';
import { UsuarioService } from './usuario.service';

const url =  'https://intranet-ayto.com/api';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  header = new HttpHeaders().set('Content-Type', 'application/json');


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

        resolve(true);

      } else {

        this.isDbReady.subscribe((ready) => {

          if (ready) {

            resolve(ready);

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
        const data = [usuario.UserName, usuario.Password, usuario.IdEmpleado, usuario.HorasSemanales, usuario.NombreCompleto, usuario.Telefono, usuario.Email, usuario.TomarLocalizacion, usuario.EsAdministrador];
        // tslint:disable-next-line: max-line-length
        const respuesta = this.storage.executeSql('INSERT INTO usuariosTable (UserName, Pass, IdEmpleado, HorasSemanales, NombreCompleto, Telefono, Email, TomarLocalizacion, EsAdministrador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(() => {
          console.log('DB: Usuario creado');

        });

    }).catch( error => {

      console.log('Error al añadir el usuario a la bd: ', error);

    });


  }

  guardarArrayIncidencias(arrayIncidencias: TipoIncidencia[]) {

    console.log('DB:arrayIncidencias 0');

    if( arrayIncidencias !== null || arrayIncidencias !== undefined){

      this.estadoBD().then(async () => {
        console.log('DB:addUsuario 1');

        this.storage.executeSql('DELETE FROM incidenciasTable').then(() => {
          console.log('DB: Tabla Incidencias vacia'); }).catch(() => { console.log('DB: ERROR AL BORRAR TABLAS INCIDENCIAS'); });

        // tslint:disable-next-line: max-line-length

        for (const incidencia of arrayIncidencias) {

          const data = [incidencia.IdIncidencia, incidencia.Nombre];
          // tslint:disable-next-line: max-line-length
          const respuesta = this.storage.executeSql('INSERT INTO incidenciasTable (IdIncidenciaAPI, NombreIncidencia) VALUES (?, ?)', data).then(() => {
            console.log('DB: Incidencia creado');
  
          }).catch(error => {

            console.log('Error, al crear incidencia');

          });

        }

    }).catch( error => {

      console.log('Error al añadir el usuario a la bd: ', error);

    });

    }
    

  }

  async obtenerListaTiposIncidencia(): Promise<TipoIncidencia[]> {
    const sql = 'SELECT * FROM incidenciasTable';

    try {
      const response = await this.storage.executeSql(sql, []);
      const incidencias = [];
      console.log('obtener incidencias index ' + incidencias);
      for (let index = 0; index < response.rows.length; index++) {
        incidencias.push(response.rows.item(index));
        console.log('obtener motivo index ' + response.rows.item(index));
      }
      return Promise.resolve<TipoIncidencia[]>(incidencias);
    } catch (error) {
      Promise.reject(error);
    }
  }



  BorrarUsuario() {
    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    this.estadoBD().then(async () => {
      console.log('DB: Borramos todo el contenido de la tabla de BD...');
        this.storage.executeSql('DELETE FROM usuariosTable').then(() => {
          console.log('DB: Tabla USUARIOS vacia'); }).catch(error => { console.log('DB: ERROR AL BORRAR TABLAS USUARIO'); });
          this.storage.executeSql('DELETE FROM notificacionTable').then(() => {
            console.log('DB: Tabla NOTIFICACION vacia'); }).catch(error => { console.log('DB: ERROR AL BORRAR TABLAS NOTFICACION'); });
    });
  }

  async obtenerUltimoUsuario(): Promise<UsuarioLoginApi> {
    
    const res =  await this.storage.executeSql('SELECT * FROM usuariosTable LIMIT 1 ', []);
    console.log('PRUEBA')
    if (res.rows.length !== 0) {
      console.log('usuario: ', res.rows.item(0))
      return {
        UserName: res.rows.item(0).UserName,
        Password: res.rows.item(0).Pass,
        IdEmpleado: res.rows.item(0).IdEmpleado,
        HorasSemanales: res.rows.item(0).HorasSemanales,
        NombreCompleto: res.rows.item(0).NombreCompleto,
        Telefono: res.rows.item(0).Telefono,
        Email: res.rows.item(0).Email,
        TomarLocalizacion: res.rows.item(0).TomarLocalizacion,
        EsAdministrador: res.rows.item(0).EsAdministrador
      };
    } else { return null; }

  }

  async addNotificacionesPendientes(arrayNotificacionesPendientes: NotificacionesPendientes[]) {

    let notificacionesBD: Notificacion[];

    await this.obtenerTodasNotificacion().then( resp => {

      if(resp.length === 0) {

        notificacionesBD = null

      } else {

        notificacionesBD = resp;

        for( const notPendiente of arrayNotificacionesPendientes) {

          const notificacion : Notificacion = {
    
            IdNotificacionAPI: notPendiente.IdNotificacion,
            Titulo: notPendiente.Titulo,
            Mensaje: notPendiente.Mensaje,
            Leido: 0,
            Fecha: notPendiente.Fecha,
            Icono: 'mail-outline',
            Ruta: '/message/'
    
          }

          if ( notificacionesBD.find( not => not.IdNotificacionAPI === notificacion.IdNotificacionAPI) === undefined) {
            this.estadoBD().then(async () => {
              const data = [notificacion.IdNotificacionAPI, notificacion.Titulo, notificacion.Mensaje, notificacion.Leido, notificacion.Fecha, notificacion.Ruta, notificacion.Icono, notificacion.IdNotificacionAPI];
              const respuesta = await this.storage.executeSql('INSERT INTO notificacionTable (IdNotificacionAPI, Titulo, Mensaje, Leido, Fecha, Ruta, Icono, IdNotificacionAPI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data).then(() => {
                console.log('DB: Notificacion añadida');
      
      
              });
              console.log('DB: Respuesta Notificacion', respuesta);
            });
          } else {

            console.log('Notificacion ya en base de datos');

          }
    
         
    
        }

      }

    })

    

  }

  addNotificacion(notificacion: Notificacion) {
    console.log('notificacion 2: ',notificacion);
    this.estadoBD().then(async () => {
        const data = [notificacion.Titulo, notificacion.Mensaje, notificacion.Leido, notificacion.Fecha, notificacion.Ruta, notificacion.Icono, notificacion.IdNotificacionAPI];
        const respuesta = await this.storage.executeSql('INSERT INTO notificacionTable (Titulo, Mensaje, Leido, Fecha, Ruta, Icono, IdNotificacionAPI) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(() => {
          console.log('DB: Notificacion añadida');


        });
        console.log('DB: Respuesta Notificacion', respuesta);
    });
  }



  BorrarNotificacion(id) {
    // La siguiente sentencia SQL borra todo el contenido de la tabla:
    this.estadoBD().then(async () => {
      console.log('DB: Borramos notificacion BD...');
        this.storage.executeSql('DELETE FROM notificacionTable WHERE IdNotificacion=' + id).then(() => {
          console.log('DB: Notificacion Borrada'); }).catch(error => { console.log('DB: ERROR AL BORRAR NOTIFICACION'); });
    });
  }


  async obtenerTodasNotificacion() {

    const sql = 'SELECT * FROM notificacionTable';

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

  
   async marcarTodasNotificacionesLeidasAPI(username, password) {

    const sql = 'SELECT * FROM notificacionTable WHERE Leido = 0';
    

    let notificacion: Notificacion;
    let aux: any
    try {

      const response = await this.storage.executeSql(sql, []);
      const notificaciones: Notificacion[] = [];
      for (let index = 0; index < response.rows.length; index++) {
        notificaciones.push(response.rows.item(index));
      }

      for ( const not of notificaciones ) {
        const notificacion = {
          UserName: username,
          Password: password,
          IdNotificacion: not.IdNotificacionAPI
        }
        await this.httpClient.post<RespuestaAPIBasica>(`${url}/Ayto/NotificacionLeida`, notificacion, {headers: this.header}).timeout(20000).toPromise().then( data => {
          console.log('CHECK NOTIFICACION API, ', data);
          if (data.Respuesta.toString().toLocaleUpperCase() !== 'OK') {

             aux = {
              UserName: username,
              Password: password,
              IdNotificacion: not.IdNotificacionAPI
            };

            console.log('ERROR AL MANDAR NOTIFICACION API, ', data);
            const contenido = JSON.stringify(notificacion);
            const urlPendiente = 'https://intranet-ayto.com/api/Ayto/NotificacionLeida';
            const tipoJsonPendiente = 'NOTIFICACION';
      
            this.addJsonPendiente(urlPendiente, contenido,  tipoJsonPendiente);
          }

    
        }).catch( error => {
          console.log('ERROR AL MANDAR NOTIFICACION API 2, ', error);

           aux = {
              UserName: username,
              Password: password,
              IdNotificacion: not.IdNotificacionAPI
            };
          const contenido = JSON.stringify(notificacion);
          const urlPendiente = 'https://intranet-ayto.com/api/Ayto/NotificacionLeida';
          const tipoJsonPendiente = 'NOTIFICACION';
    
          this.addJsonPendiente(urlPendiente, contenido,  tipoJsonPendiente);     
    
        });


      }
     
      return Promise.resolve<Notificacion[]>(notificaciones);
    } catch (error) {
      console.log('errorrrrrr: ', error);
      Promise.reject(error);
    }

  }


  async marcarTodasNotificacionLeidas(): Promise<Notificacion> {
    const data = [1, 0];
    // tslint:disable-next-line: max-line-length
    const res = await this.storage.executeSql('UPDATE notificacionTable SET Leido=? WHERE Leido = ?', data);
    return null;
  }

  async  marcarNotificacionLeida(id) {
    const data = [1, id];
    // tslint:disable-next-line: max-line-length
    const res = await this.storage.executeSql('UPDATE notificacionTable SET Leido=? WHERE IdNotificacion = ?', data);

  }

  async obtenerNotificacion(id,username: string, password: string): Promise<Notificacion> {
    const res =  await this.storage.executeSql('SELECT * FROM notificacionTable WHERE IdNotificacion=' + id, []);

    const not = {
      UserName: username,
      Password: password,
      IdNotificacion: res.rows.item(0).IdNotificacionAPI
    }

    let notificacion: Notificacion;
    let aux: any
    


    if (res.rows.length !== 0) {
      notificacion =  {
        IdNotificacion: res.rows.item(0).IdNotificacion,
        IdNotificacionAPI: res.rows.item(0).IdNotificacionAPI,
        Titulo: res.rows.item(0).Titulo,
        Mensaje: res.rows.item(0).Mensaje,
        Leido: res.rows.item(0).Leido,
        Fecha: res.rows.item(0).Fecha,
        Ruta: res.rows.item(0).Ruta,
        Icono: res.rows.item(0).Icono,
      };
    } else { 
      notificacion = null; 
    }
    console.log('obtener Notificacion: ', not)

    
    await this.httpClient.post<RespuestaAPIBasica>(`${url}/Ayto/NotificacionLeida`, not, {headers: this.header}).timeout(7000).toPromise().then( data => {
      console.log('obtener Notificacion: THEN ', data)
      if (data.Respuesta.toString().toLocaleUpperCase() !== 'OK') {
         aux = {
          UserName: username,
          Password: password,
          IdNotificacion: id
        };
        console.log('ERROR AL MANDAR NOTIFICACION API, ', data);
        const contenido = JSON.stringify(notificacion);
        const urlPendiente = 'https://intranet-ayto.com/api/Ayto/NotificacionLeida';
        const tipoJsonPendiente = 'NOTIFICACION';
  
        this.addJsonPendiente(urlPendiente, contenido,  tipoJsonPendiente);
      }

    }).catch( error => {
      console.log('obtener Notificacion: CATCH', error)
      aux = {
        UserName: username,
        Password: password,
        IdNotificacion: id

      };
      const contenido = JSON.stringify(notificacion);
      const urlPendiente = 'https://intranet-ayto.com/api/Ayto/NotificacionLeida';
      const tipoJsonPendiente = 'NOTIFICACION';

      this.addJsonPendiente(urlPendiente, contenido,  tipoJsonPendiente);     

    });

    return notificacion;
   

  }


  /* async ModificarRutaNotificacion() {
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

  } */


  async obtenerTodasSinLeerNotificacion() {

    /*     const sql = 'SELECT * FROM notificacion WHERE Leido = ?';
     */
        try {
          const response = await this.storage.executeSql('SELECT * FROM notificacionTable WHERE Leido = ?', [0]);
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


  //Json Pendientes

  addJsonPendiente(urlEnvio: string, contenido: string, tipoJsonPendiente: string) {
    
  
    this.estadoBD().then(async () => {
        const data = [urlEnvio, contenido, tipoJsonPendiente];
        const respuesta = await this.storage.executeSql('INSERT INTO enviosPendientesTable (UrlEnvio, Contenido, TipoJsonPendiente) VALUES (?, ?, ?)', data).then(() => {
          console.log('DB: JsonPendiente añadido');
        });
        console.log('DB: Respuesta JsonPendiente', respuesta);
    });
  }

  async obtenerTodosJsonPendientes(): Promise<EnviosPendientes[]> {

    const sql = 'SELECT * FROM enviosPendientesTable';

    try {
      const response = await this.storage.executeSql(sql, []);
      const enviosPendientes = [];
      console.log('obtener enviosPendientes index ' + enviosPendientes);
      for (let index = 0; index < response.rows.length; index++) {
        enviosPendientes.push(response.rows.item(index));
        console.log('obtener EnviosPendientes index ' + response.rows.item(index));
      }
      return Promise.resolve<EnviosPendientes[]>(enviosPendientes);
    } catch (error) {
      Promise.reject(error);
    }

  } 
  
  async borrarJSONPendiente(id) {

    const respuestaBD = await this.storage.executeSql('DELETE FROM enviosPendientesTable WHERE IdEnvioPendiente = ?', [id]);
  }

}
