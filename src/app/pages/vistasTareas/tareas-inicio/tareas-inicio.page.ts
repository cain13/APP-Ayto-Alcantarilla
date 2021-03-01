import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../../../services/tareas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { RespuestaTareasAPI, Tarea, EstadoTarea, Visita, Subtarea, TipoIncidencia } from '../../../interfaces/interfacesTareas';
import { IonList, NavController } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';


import * as moment from 'moment';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';
import { DatabaseService } from '../../../services/database.service';
import { Servicio } from 'src/app/interfaces/servicos-interfaces';
import { NotificacionesService } from '../../../services/notificaciones.service';


@Component({
  selector: 'app-tareas-inicio',
  templateUrl: './tareas-inicio.page.html',
  styleUrls: ['./tareas-inicio.page.scss'],
})
export class TareasInicioPage implements OnInit {

  @ViewChild('lista', {static: false}) lista: IonList;


  isOpenFiltros = false;
  isMenuOpen = false;
  public estadoTareaSelec: number
  public visitaSeleccionada: number;
  searchKey = '';
  subtareasEjemplo: Subtarea[] = [ 
    {
      IdTarea: 5,
      IdSubtarea: 115,
      Descripcion:'Hacer la compra',
      Nombre: 'Pepe Moreno Muñoz',
    },
    {
      IdTarea: 5,
      IdSubtarea: 116,
      Descripcion:'Pasear',
      Nombre: 'Pepe Moreno Muñoz',
    }
  ]

  estadosTarea: EstadoTarea[] = [
    {
      Nombre: 'Terminada',
      IdEstadoTarea: 0,
    },
    {
      Nombre: 'Pendiente',
      IdEstadoTarea: 1,
    },
    {
      Nombre: 'En proceso',
      IdEstadoTarea: 2,
    },
    {
      Nombre: 'No definir',
      IdEstadoTarea: 999,
    },
  ];

  mesesEnEspanol = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  tareas: Servicio[];
  usuario: UsuarioLoginApi;
  datePickerMin = Date.now().toString();
  datePicker: Date = new Date();
  verfechaInicial: boolean = true;
  isTareaVacia: boolean = false;
  fecha: Date;

  tokenAPI: string;

  constructor(private tareasService: TareasService,
              private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private dataBaseService: DatabaseService,
              private notificacionesService: NotificacionesService,
              private fcm: FCM
              ) { 
                this.usuario = this.usuarioService.getUsuario();

              }

  async ngOnInit() {
    
    await this.fcm.getToken().then(token => {
      console.log('TOKEN: ', token);
      this.tokenAPI = token;
    });

    await this.usuarioService.present('Cargando datos...');
    console.log('usuario mandado:', this.usuario.UserName, this.usuario.Password, this.tokenAPI);

    await this.usuarioService.loginAPI(this.usuario.UserName, this.usuario.Password, this.tokenAPI).then( resp => {

      console.log('Login Correcto API.');
      this.ComprobarRespuestDeAPI(resp);
      this.notificacionesService.AcutalizaNumNotificaciones(resp.NotificacionesPendientes.length);

    }).catch(error => {

      console.log('Error al hacer login api: ', error);


    });




    await this.usuarioService.enviarEnviosPendientes().then(data => {
      console.log('Envios pendientes mandados correctamente');
    }).catch(error => {

      console.log('ERROR AL MANDAR JSON PENDIENTE: ', error);

    });
    
    console.log('FECHA: ', moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));

    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('RESPUESTA API GET TAREAS: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {

        this.tareas = resp.Servicios;
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
        
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })


    await this.dataBaseService.obtenerListaTiposIncidencia().then( resp => {

      const listaIncidencias: TipoIncidencia[] = resp;

      if(listaIncidencias.length !== 0) {

        this.tareasService.guardarListaIncidencias(listaIncidencias);

      }
      this.usuarioService.dismiss();

    }).catch( error => {

      console.log('ERROR getIncidencias: ', error);
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error','No se han podido cargar todos los datos.', 'Compruebe su conexión a internet.');

    })
    

  }


  ComprobarRespuestDeAPI(res: UsuarioLoginApi) {


    const JSONrespuesta = JSON.stringify(res);

    if (!JSONrespuesta.includes('Respuesta>k__BackingField')) {
      const pass = this.usuario.Password;
      try {

        this.usuario = JSON.parse(res.toString());

      } catch (error) {

        this.usuario = res;

      }
      this.usuario.Password = pass;
      console.log('LOGIN-DNI: Usuario de API: ', this.usuario);
      
      this.usuarioService.guardarUsuarioBD(this.usuario); // this.botonHuella.checked);
      console.log('LOGIN: ', this.usuario);


    }

  }

  addIncidencia(tarea: Servicio) {
    this.tareasService.guardarTarea(tarea);
    this.lista.closeSlidingItems();
    this.navCtrl.navigateForward('incidencias');

  }

  masInformacion(tarea: Servicio) {

    this.tareasService.guardarTarea(tarea);
    this.navCtrl.navigateForward('tarea-mas-info');

  }

  async filtrarPorFecha() {
    this.verfechaInicial = false;
    console.log('datepicker: ', this.datePicker);
    console.log('FECHA mandada: ', moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));

    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('resp: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {
        this.tareas = resp.Servicios;
        console.log('THIS. TAREAS: ', this.tareas);
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.isTareaVacia = false;
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })
  }

  /* async filtrar() {
    console.log(this.estadoTareaSelec);
    console.log(this.visitaSeleccionada);
    await this.usuarioService.present('Filtrando tareas...');
    let arrayAux: Tarea[] = [];
    if ( this.estadoTareaSelec !== 999) {
      if ( this.visitaSeleccionada !== 999999999) {

        for (const tarea of this.listaTareas) {
          if (tarea.IdEstado === this.estadoTareaSelec && tarea.IdPersonaAsistida === this.visitaSeleccionada) {

            arrayAux.push(tarea);

          }

        }

      } else {

        for (const tarea of this.listaTareas) {

          if ( tarea.IdEstado === this.estadoTareaSelec) {

            arrayAux.push(tarea);

          }

        }


      }

    } else {

      if (this.visitaSeleccionada !== 999999999) {

        for (const tarea of this.tareas) {

          if (tarea.IdPersonaAsistida === this.visitaSeleccionada) {

            arrayAux.push(tarea);

          }

        }

      } else {
        arrayAux = this.listaTareas;


      }
    }
    console.log(arrayAux);
    this.tareas = arrayAux;
    this.usuarioService.dismiss(); */

    /* await this.tareasService.obtenerTareas().then(res => {
      try {
        respuestaAPI = JSON.parse(res.toString());
      } catch (error) {
        respuestaAPI = res;
      }
      this.tareas = respuestaAPI.ListaTarea;
      let arrayAux: Tarea[] = [];
      if ( this.estadoTareaSelec !== 999) {
        if ( this.visitaSeleccionada !== 999) {

          for (const tarea of this.tareas) {
            if (tarea.IdEstado === this.estadoTareaSelec && tarea.IdPersonaAsistida === this.visitaSeleccionada) {

              arrayAux.push(tarea);

            }

          }

        } else {

          for (const tarea of this.tareas) {

            if ( tarea.IdEstado === this.estadoTareaSelec) {

              arrayAux.push(tarea);

            }

          }


        }

      } else {

        if (this.visitaSeleccionada !== 999) {

          for (const tarea of this.tareas) {

            if (tarea.IdPersonaAsistida === this.visitaSeleccionada) {

              arrayAux.push(tarea);

            }

          }

        } else {
          arrayAux = this.tareas;


        }
      }
      console.log(arrayAux);
      this.tareas = arrayAux;
      this.usuarioService.dismiss();

  }).catch( error => {
    this.usuarioService.dismiss();
    this.usuarioService.presentAlert('ERROR','Fallo al filtrar.', 'Revise su conexión a internet.');
  }); 
  }*/


  public abirFiltros(): void {
    this.isOpenFiltros = !this.isOpenFiltros;
  }

  public definirEstado(servicio: Servicio ) {

    const fecha_actual = moment();
    const horaTareaInicio = moment(servicio.FechaInicio).format('HH');
    const minutosTareaInicio = moment(servicio.FechaInicio).format('mm');
    const fechaTareaInicio = moment().set({hour: parseInt(horaTareaInicio, 10), minute: parseInt(minutosTareaInicio, 10), second: 0});

    const horaTareaFin = moment(servicio.FechaFin).format('HH')
    const minutosTareaFin = moment(servicio.FechaFin).format('mm')
    const fechaTareaFin = moment().set({hour: parseInt(horaTareaFin, 10), minute: parseInt(minutosTareaFin, 10), second: 0});

    if ( fecha_actual > fechaTareaInicio) {
      if (fechaTareaFin > fecha_actual ) {
        return 1
      } else {
        return 0
      }
    } else {
      return 2
    }

  }

  public toggleAccordion(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async actualizar() {
    await this.usuarioService.present('Actualizando tareas...');
    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('resp: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {
        this.tareas = resp.Servicios;
        console.log('THIS. TAREAS: ', this.tareas);
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.isTareaVacia = false;
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })
    this.searchKey = '';
  }

  async diaAnterior() {
    this.verfechaInicial = false;
    await this.usuarioService.present('Actualizando tareas...');
    const aux = new Date(moment(this.datePicker).subtract(1, 'day').toDate())
    /* const aux = moment(this.datePicker, 'DD/MM/YYYY').subtract(1, 'day');
    this.datePicker = new Date(aux.toString()); */
    this.datePicker = aux;
    console.log(this.datePicker);

    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('resp: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {
        this.tareas = resp.Servicios;
        console.log('THIS. TAREAS: ', this.tareas);
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.isTareaVacia = false;
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })

  }

  async diaSiguiente() {
    this.verfechaInicial = false;
    await this.usuarioService.present('Actualizando tareas...');
    const aux = new Date(moment(this.datePicker).add(1, 'day').toDate())
    /* const aux = moment(this.datePicker, 'DD/MM/YYYY').subtract(1, 'day');
    this.datePicker = new Date(aux.toString()); */
    this.datePicker = aux;
    console.log(this.datePicker);
    console.log('moment: ', moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));
    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('resp: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {
        this.tareas = resp.Servicios;
        console.log('THIS. TAREAS: ', this.tareas);
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.isTareaVacia = false;
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })
  }

  async doRefresh(event) {

    await this.usuarioService.present('Actualizando tareas...');
    await this.tareasService.obtenerListaTareas(this.usuario.UserName,this.usuario.Password, moment(this.datePicker).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')).then( resp => {
      console.log('resp: ', resp)
      if(resp.Respuesta.toString().toLocaleUpperCase() === 'OK') {
        this.tareas = resp.Servicios;
        console.log('THIS. TAREAS: ', this.tareas);
        if(this.tareas.length !== 0) {

          this.definirEstado(this.tareas[0]);
          this.isTareaVacia = false;
          this.tareasService.setListaTareas(this.tareas);
          this.usuarioService.dismiss();  

        } else {

          this.isTareaVacia = true;
          this.usuarioService.dismiss();  

        }
      } else {

        this.usuarioService.dismiss();
        console.log('ERROR mensaje: ', resp.Mensaje);

        this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      }
      

    }).catch( error => {

      console.log('ERROR getTareas: ', error);
      this.usuarioService.presentAlert('ERROR', 'Fallo al cargar los servicios.', 'Compruebe su conexión a internet.');

      this.usuarioService.dismiss();

    })
    this.searchKey = '';
    event.target.complete();

  }

  onInput(event) {
    console.log(event.target.value);
    this.tareasService.findByName(event.target.value)
        .then(data => {
            this.tareas = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }


  onCancel(event) {
    this.findAll();
  }


  findAll() {
    this.tareas = this.tareasService.getListaTareas();

  }

  devolverHora(fecha: string) {

    return moment(fecha).locale('es').format('HH:mm');

  }

  firmar(tarea: Servicio) {
    this.tareasService.guardarTarea(tarea);
    this.lista.closeSlidingItems();
    this.navCtrl.navigateForward('firma');

  }

}
