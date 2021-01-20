import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../../../services/tareas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { RespuestaTareasAPI, Tarea, EstadoTarea, Visita, Subtarea, TipoIncidencia } from '../../../interfaces/interfacesTareas';
import { IonList, NavController } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';


import * as moment from 'moment';
import { UsuarioLoginApi } from '../../../interfaces/usuario-interfaces';


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
  listaTareas: Tarea[] = [
    {
      Descripcion: 'COMIDA, LIMPIEZA Y ASEO',
      DireccionTarea: 'C/ Ramón y Cajal nº 32 - 1º B',
      Edad: 81,
      Grado: 2,
      HoraInicio: '8:00',
      HoraFin: '9:00',
      IdEmpleado: 225,
      IdEstado: 0,
      IdTarea: 5,
      Nombre: 'JOSE NAVARRETE MARTINEZ',
      SubtareasLista: this.subtareasEjemplo,
      TelefonoCliente: '968555112',
      ViveSolo: 'SI',
      IdPersonaAsistida: 1,
      PersonaContacto1: '666123453',
      HorasSemanales: 7.5,
      AuxiliarTitular: 'Juana Gonzalez Ruiz',
      TelAuxiliarTitular: '685425565'

    },
    {
      Descripcion: 'Atención personal, apoyo al aseo, tareas domésticas básicas y acompañamiento dentro y fuera del domicilio.',
      DireccionTarea: 'C/Mayor 190 3ºA',
      Edad: 45,
      Grado: 1,
      HoraInicio: '9:15',
      HoraFin: '10:45',
      IdEmpleado: 225,
      IdEstado: 1,
      IdTarea: 5,
      Nombre: 'DIEGO ROSIQUE MENARGUEZ',
      SubtareasLista: null,
      TelefonoCliente: '968111222',
      ViveSolo: 'NO',
      IdPersonaAsistida: 2,
      PersonaContacto1: '666123453',
      PersonaContacto2: '678951233',
      HorasSemanales: 5,
      Latitud: 37.9694,
      Longitud: -1.2171
    },
    {
      Descripcion: 'Apoyo a aseo y atención doméstica. Hacer camas Limpieza vivienda. Tender ropa y acompañamiento a compras si precisa',
      DireccionTarea: 'C/ Santiago, 41 - bajo',
      Edad: 81,
      Grado: 2,
      HoraInicio: '11:00',
      HoraFin: '12:00',
      IdEmpleado: 225,
      IdEstado: 2,
      IdTarea: 5,
      Nombre: 'ANTONIA MENGUAL JIMENEZ',
      SubtareasLista: this.subtareasEjemplo,
      TelefonoCliente: '968555112',
      ViveSolo: 'SI',
      IdPersonaAsistida: 1

    },
    {
      Descripcion: 'Apoyo a aseo y atención doméstica. Hacer camas Limpieza vivienda. Tender ropa y acompañamiento a compras si precisa',
      DireccionTarea: 'C/ Santiago, 41 - bajo',
      Edad: 81,
      Grado: 2,
      HoraInicio: '17:15',
      HoraFin: '19:45',
      IdEmpleado: 225,
      IdEstado: 2,
      IdTarea: 5,
      Nombre: 'ANA Mª VÁZQUEZ SÁNCHEZ',
      SubtareasLista: this.subtareasEjemplo,
      TelefonoCliente: '968555112',
      ViveSolo: 'SI',
      IdPersonaAsistida: 1
    }
  ];
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

  fecha: string;
  tareas: Tarea[];
  usuario: UsuarioLoginApi;
  constructor(private tareasService: TareasService,
              private usuarioService: UsuarioService,
              private navCtrl: NavController,
              ) { 
                this.usuario = this.usuarioService.getUsuario();

              }

  async ngOnInit() {
    // await this.usuarioService.present('Cargando tareas...');
    this.fecha = moment().locale('es').format('DD/MM/YYYY');
/*     await this.tareasService.obtenerTareas(this.usuario.IdUsuario, this.fecha).then( resp => {
 */
      this.tareas = this.listaTareas;
      this.definirEstado(this.listaTareas[0]);
      this.tareasService.setListaTareas(this.tareas);

    /* }).catch( error => {

      console.log('ERROR getTareas: ', error);

    }) */


    /* await this.tareasService.obtenerListaTiposIncidencia(this.usuario.IdUsuario).then( resp => {

      this.tareasService.guardarListaIncidencias(resp.ListaTipoIncidencias);
      this.usuarioService.dismiss();

    }).catch( error => {

      console.log('ERROR getIncidencias: ', error);
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('Error','No se han podido cargar todos los datos.', 'Compruebe su conexión a internet');

    }) */
    

  }

  addIncidencia(tarea: Tarea) {
    this.tareasService.guardarTarea(tarea);
    this.lista.closeSlidingItems();
    this.navCtrl.navigateForward('incidencias');

  }

  masInformacion(tarea: Tarea) {

    this.tareasService.guardarTarea(tarea);
    this.navCtrl.navigateForward('tarea-mas-info');

  }

  async filtrar() {
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
    this.usuarioService.dismiss();

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
  }); */

  }

  public abirFiltros(): void {
    this.isOpenFiltros = !this.isOpenFiltros;
  }

  public definirEstado(tarea: Tarea ) {

    const fecha_actual = moment();
    const horaTareaInicio = tarea.HoraInicio.split(':')[0];
    const minutosTareaInicio = tarea.HoraInicio.split(':')[1];
    const fechaTareaInicio = moment().set({hour: parseInt(horaTareaInicio, 10), minute: parseInt(minutosTareaInicio, 10), second: 0});

    const horaTareaFin = tarea.HoraFin.split(':')[0];
    const minutosTareaFin = tarea.HoraFin.split(':')[1];
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
    /* await this.usuarioService.present('Actualizando tareas...');
    let respuestaAPI: RespuestaTareasAPI;
    await this.tareasService.obtenerTareas().then(res => {
      try {
        respuestaAPI = JSON.parse(res.toString());

      } catch (error) {
        respuestaAPI = res;
      }
      this.tareas = respuestaAPI.ListaTarea;
      this.usuarioService.dismiss();
    }).catch( error => {
      this.usuarioService.dismiss();
      this.usuarioService.presentAlert('ERROR', 'Fallo al actualizar', 'Revise su conexión a internet');

    }); */
    this.searchKey = '';
    this.tareas = this.listaTareas;
  }

  async diaAnterior() {
    const aux = moment(this.fecha, 'DD/MM/YYYY').subtract(1, 'day');
    this.fecha = aux.format('DD/MM/YYYY');

    /* await this.tareasService.obtenerTareas( this.usuario.IdUsuario, this.fecha).then( resp => {
 */
      this.tareas = this.listaTareas;
      this.definirEstado(this.listaTareas[0]);
      this.tareasService.setListaTareas(this.tareas);

    /* }) */

  }

  async diaSiguiente() {
    const aux = moment(this.fecha, 'DD/MM/YYYY').add(1, 'day');
    this.fecha = aux.format('DD/MM/YYYY');

    /* await this.tareasService.obtenerTareas( this.usuario.IdUsuario, this.fecha).then( resp => {
 */
      this.tareas = this.listaTareas;
      this.definirEstado(this.listaTareas[0]);
      this.tareasService.setListaTareas(this.tareas);
/* 
    }) */
  }

  async doRefresh(event) {

    /* let respuestaAPI: RespuestaTareasAPI;
    await this.tareasService.obtenerTareas().then(res => {
      try {
        respuestaAPI = JSON.parse(res.toString());

      } catch (error) {
        respuestaAPI = res;

      }
      this.tareas = respuestaAPI.ListaTarea;
      event.target.complete();
    }).catch(error => {
      this.usuarioService.presentAlert('ERROR', 'Fallo al actualizar', 'Revise su conexión a internet');

    }); */

    this.tareas = this.listaTareas;
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
    this.listaTareas = this.tareasService.getListaTareas();

  }

  firmar(tarea: Tarea) {
    this.tareasService.guardarTarea(tarea);
    this.navCtrl.navigateForward('firma');

  }

}
