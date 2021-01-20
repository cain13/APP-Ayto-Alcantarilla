// Generated by https://quicktype.io

export interface RespuestaTareasAPI {
    ListaTarea: Tarea[];
}

export interface Visita {
    IdCentro: number;
    Nombre: string;
}

export interface DatosAddUbicacion {

    IdUsuario: number;
    Latitud: number;
    Longitud: number;
    Pin: string;

}

export interface EstadoTarea {
    IdEstadoTarea: number;
    Nombre: string;
}

export interface Tarea {
    IdTarea: number;
    Nombre?: string;
    Descripcion?: string;
    Observaciones?: string;
    IdEstado?: number;
    HoraFin?: string;
    Grado?: number;
    SubtareasLista?: Subtarea[];
    HoraInicio?: string;
    IdEmpleado?: number;
    ViveSolo?: string;
    Edad?: number;
    TelefonoCliente?: string;
    DireccionTarea?: string;
    IdPersonaAsistida?: number;
    PersonaContacto1?: string;
    PersonaContacto2?: string;
    PersonaContacto3?: string;
    HorasSemanales?: number;
    Latitud?: number;
    Longitud?: number;
    AuxiliarTitular?: string;
    TelAuxiliarTitular?: string
}

export interface RespuestaTiposIncidenciasAPI {
    ListaTipoIncidencias: TipoIncidencia[];
}

export interface TipoIncidencia {

    IdIncidencia: number;
    Nombre: string;

}

export interface Subtarea {
    IdSubtarea: number;
    IdTarea: number;
    Nombre: string;
    Descripcion: string;
}

export interface TipoHora {
    IdTipoHora: number;
    Tipo: string;
}

export interface EliminarSubTareaAPI {

    estado: number;
    idSubtarea: number;

}

export interface TareaAPI {

    Nombre: string;
    Descripcion: string;
    IdCentro: number;
    IdEmpleado: number;
    FechaInicio: string;
    IdEstado: number;
}

export interface TareaAPIActualizar {
    IdTarea: number;
    Nombre: string;
    Descripcion: string;
    IdCentro: number;
    IdEmpleado: number;
    FechaInicio: string;
    IdEstado: number;
}

export interface SubtareaAPI {
    IdTarea: number;
    Nombre: string;
    Descripcion: string;
    IdTipoHora: number;
    FechaInicio: string;
    FechaFin: string;
    Estado: number;
}

export interface SubtareaAPIactualizar {
    IdTarea: number;
    IdSubtarea: number;
    Nombre: string;
    Descripcion: string;
    IdTipoHora: number;
    FechaInicio: string;
    FechaFin: string;
    Estado: number;
}

export interface RespuestaCRUDTareaAPI {
    Respuesta: string;
    Id: number;
}

export interface CerrarTareaAPI {

    idEstado: number;
    idTarea: number;

}




