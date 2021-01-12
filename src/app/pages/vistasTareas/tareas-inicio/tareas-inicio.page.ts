import { Component, OnInit, ViewChild } from '@angular/core';
import { TareasService } from '../../../services/tareas.service';
import { UsuarioService } from '../../../services/usuario.service';
import { RespuestaTareasAPI, Tarea, EstadoTarea, Visita, Subtarea } from '../../../interfaces/interfacesTareas';
import { IonList, NavController } from '@ionic/angular';

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
      HorasSemanales: 7.5

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
      HorasSemanales: 5 
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
      HoraInicio: '12:15',
      HoraFin: '13:45',
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

  tareas: Tarea[];
  constructor(private tareasService: TareasService,
              private usuarioService: UsuarioService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.tareas = this.listaTareas;
    this.tareasService.setListaTareas(this.tareas)
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

  public definirEstado(idEstado: number ): string {

    for (const estado of this.estadosTarea) {

      if ( estado.IdEstadoTarea === idEstado) {

        if (estado.Nombre === 'Cerrada') {
          return 'Pendiente de Revisión';
        }

        return estado.Nombre;

      }

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

}
