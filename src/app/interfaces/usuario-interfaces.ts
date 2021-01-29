import { TipoIncidencia } from './interfacesTareas';


export interface UsuarioLoginApi {

    UserName: string;
    Password?: string;
    IdEmpleado: number;
    NombreCompleto: string;
    Respuesta?: string;
    HorasSemanales: number;
    Email: string;
    Telefono: string;
    TipoIncidencias?: TipoIncidencia[]
    NotificacionesPendientes?: NotificacionesPendientes[]
}

export interface NotificacionesPendientes {

    IdNotificacion: number;
    Titulo: string;
    Mensaje: string;
    Fecha: string;

}

export interface UsuarioLoginAPP {

    UserName: string;
    Password: string;
    Token: String
}

export interface RespuestaAPIBasica {

    Respuesta: string;
    Mensaje?: string;

}

export interface DatosActualziarPassApi {

    UserName: string,
    PassOld: string,
    PassNueva: string,

}

export interface MandarTokenAPI {

    Usuario: string;
    Token: string;
    TipoUsuario: string;

  }

export interface EnviosPendientes {
    IdEnvioPendiente: number;
    Url: string;
    Contenido: string;
    TipoJsonPendiente: string;

}


export interface Notificacion {
    IdNotificacion?: number;
    Titulo: string;
    Mensaje: string;
    Leido: number;
    Fecha: string;
    Ruta: string;
    Icono: string;
}


export interface CambiarPassword {

    PassOld: string;
    PassNew: string;
    PassConfirmada: string;
}

export interface Notificaciones {

    Cantidad: number;
    ListaNotificaciones: NotificacionesMensajes[];
}

export interface NotificacionesMensajes {

    Icono: string;
    Ruta: string;
    Mensaje: string;
    Fecha: string;
    Id: number;
}
