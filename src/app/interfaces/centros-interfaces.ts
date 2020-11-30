
export interface RespuestaAPICentros {
    Respuesta: string;
    Centros:   CentroAPI[];
}

export interface CentroAPI {
    IdCentroFav?:      number;
    Id:                number;
    Direccion:         string;
    DireccionCompleto: string;
    Nombre:            string;
    Localidad:         string;
    Provincia:         string;
    CodigoPostal:      string;
    Telefono:          string;
    Email:             string;
    Imagen:            string;
    Latitud:           number;
    Longitud:          number;
    Distancia:         string;
    Horario:           string;
}


