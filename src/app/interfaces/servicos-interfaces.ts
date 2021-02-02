
export interface RespuestaAPIServicios {
    Respuesta: string;
    Mensaje?:   string;
    Servicios: Servicio[];
}

export interface Servicio {
    Colectivo:           Colectivo;
    Empleado:            Empleado;
    Empleado2:           Empleado;
    EmpleadoTitular:     Empleado;
    Empresa:             Empresa;
    Grado:               Grado;
    Prestador:           Colectivo;
    Servicio:            Colectivo;
    Unidad:              Colectivo;
    Usuario:             Usuario;
    IdEventoServicio:    number;
    IdEmpleado:          number;
    IdEmpleado2:         number;
    IdEmpleadoTitular:   number;
    IdEmpresa:           number;
    IdUsuario:           number;
    IdPrestador:         number;
    IdGrado:             number;
    IdUnidad:            number;
    IdColectivo:         number;
    IdServicio:          number;
    FechaInicio:         string;
    FechaFin:            string;
    ColorEvento:         string;
    BackGroundEvento:    any;
    Descripcion:         string;
    Rendering:           any;
    EsDiaCompleto:       any;
    PendienteAprovacion: any;
    HoraAD:              number;
    HoraAP:              number;
    HoraMunicipal:       number;
    Computable:          boolean;
}

export interface Colectivo {
    Empresa:                 Empresa;
    IdColectivo?:            number;
    Descripcion:             string;
    Abreviatura:             string;
    Baja:                    boolean;
    IdEmpresa:               number;
    IdCategoriaProfesional?: number;
    IdPrestador?:            number;
    IdServicio?:             number;
    IdUnidad?:               number;
}

export interface Empresa {
    IdEmpresa:              number;
    Nombre:                 Nombre;
    RazonSocial:            RazonSocial;
    Direccion:              Direccion;
    CP:                     string;
    Municipio:              Municipio;
    Provincia:              Provincia;
    CIF:                    Cif;
    Telefono:               string;
    Email:                  Email;
    Activa:                 boolean;
    FechaAlta:              string;
    CCC:                    any;
    FechaPagoUltimaFactura: string;
    Asesoria:               string;
    IdAsesoria:             number;
}

export enum Cif {
    The12345690A = "12345690A",
}

export enum Direccion {
    EstaDireccion = "Esta direccion",
}

export enum Email {
    EmailEmailCOM = "email@email.com",
}

export enum Municipio {
    Alcantarilla = "Alcantarilla",
}

export enum Nombre {
    Empresa2 = "Empresa 2",
}

export enum Provincia {
    ElOtro = "el otro",
}

export enum RazonSocial {
    Empresa2SL = "Empresa 2 S.L.",
}

export interface Empleado {
    CategoriaProfesional:   Colectivo;
    Empresa:                Empresa;
    TipoEmpleado:           any;
    IdEmpleado:             number;
    Nombre:                 string;
    Apellidos1:             string;
    Apellidos2:             string;
    DNI:                    string;
    Telefono:               string;
    Email:                  string;
    Baja:                   boolean;
    IdEmpresa:              number;
    FechaAlta:              string;
    EsAdministrador:        boolean;
    IdTipoEmpleado:         number;
    IdCategoriaProfesional: number;
    Direccion:              string;
    CIPR:                   string;
    NSS:                    string;
    FechaNacimiento:        null | string;
    FechaAltaContrato:      null | string;
    CasosAsignados:         number;
    HorasSemanales:         number;
    ApellidosCompletos:     string;
    NombreCompleto:         string;
}

export interface Grado {
    Empresa:      Empresa;
    IdGrado:      number;
    Descripcion:  string;
    GradoUsuario: number;
    Baja:         boolean;
    IdEmpresa:    number;
}

export interface Usuario {
    Colectivo:          Colectivo;
    Empleado:           Empleado;
    Empleado2:          Empleado;
    EmpleadoTitular:    Empleado;
    Empresa:            Empresa;
    Grado:              Grado;
    Motivo:             any;
    Prestador:          Colectivo;
    Unidad:             Colectivo;
    IdUsuario:          number;
    Expediente:         string;
    DNI:                string;
    Nombre:             string;
    Apellido1:          string;
    Apellido2:          string;
    FechaNacimiento:    string;
    Edad:               number;
    Sexo:               boolean;
    Direccion:          string;
    Telefono1:          string;
    Telefono2:          string;
    Telefono3:          string;
    Latitud:            number;
    Longitud:           number;
    IdColectivo:        number;
    IdUnidad:           number;
    IdGrado:            number;
    IdPrestador:        number;
    HorasAP:            number;
    HorasAD:            number;
    HorasMunicipal:     number;
    FechaAlta:          string;
    FechaBaja:          string;
    FechaAltaIMAS:      string;
    FechaBajaIMAS:      string;
    FechaAltaMunicipal: string;
    FechaBajaMunicipal: string;
    IdMotivo:           number;
    IdEmpleado:         number;
    IdEmpleado2:        number;
    Observaciones:      string;
    Seguimiento:        boolean;
    Intervencion:       boolean;
    Conversion:         string;
    IdEmpresa:          number;
    Baja:               boolean;
    IdEmpleadoTitular:  number;
    ApellidosCompletos: string;
    SexoTexto:          string;
    SeguimientoTexto:   string;
    IntervencionTexto:  string;
}
