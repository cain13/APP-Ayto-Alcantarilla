export interface Noticia {
    IdNoticia:        number;
    Descripcion:      string;
    Titulo:           string;
    Url:              string;
    PathImagen:       string;
    DescripcionCorta: string;
    FechaInicio:      string;
    URLYoutube:       string;
}

export interface RespuestaAPINoticias {
    Respuesta: string;
    ImagenDestacada: Noticia;
    Noticias:  Noticia[];
    Codigo:    number;
}
