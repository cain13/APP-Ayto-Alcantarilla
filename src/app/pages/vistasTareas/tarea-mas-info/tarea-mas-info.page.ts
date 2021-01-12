import { Component, OnInit } from '@angular/core';
import { Tarea, TareaAPI } from '../../../interfaces/interfacesTareas';
import { TareasService } from '../../../services/tareas.service';

@Component({
  selector: 'app-tarea-mas-info',
  templateUrl: './tarea-mas-info.page.html',
  styleUrls: ['./tarea-mas-info.page.scss'],
})
export class TareaMasInfoPage implements OnInit {

  tarea: Tarea;
  telefono: string;

  constructor(private tareaService: TareasService) { }

  ngOnInit() {

    this.tarea = this.tareaService.getTarea();
    this.telefono = 'tel:'+this.tarea.PersonaContacto1;
    console.log('TAREA: ', this.tarea);
    console.log('Telefono: ', this.telefono);

  }

}
