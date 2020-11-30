
export interface RespuestaAPIGetDatos {

  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerDatosConsultorResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerDatosConsultorResult': [
              {
                'Nombre': [
                  string
                ],
                'Tipo': [
                  string
                ]
              }
            ]
          }
        ]
      }
    ]
  };

}

export interface RespuestAPIMantoux {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerResultadoTestMantouxResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerResultadoTestMantouxResult': [
              {
                'ResultadoTestMantouxInfo': [
                  {
                    'DatosMantoux': [ DatosMantoux ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerResultadoTestMantouxResult {

  DatosMantoux: DatosMantoux;

}

export interface DatosMantoux {

  RespuestaTestMantouxInfo: RespuestaTestMantouxInfo[];

}

export interface RespuestaTestMantouxInfo {

  FechaFoto: string;
  Foto: string;
  EsPositivo: boolean;
  EsNegativo: boolean;
  FechaInoculacion: string;

}
export interface VistaTimeLineDatos {

  datosPrueba: DatosMantoux;
  avisos?: AvisoMantoux[];

}

export interface AvisoMantoux {

  fechaAviso: string;
  textoAviso: string;

}

export interface ObtenerDatosConsultorResult {

  Nombre: string;
  Tipo: string;
  EsBuzo: boolean;
  EsGuardiaCivil: boolean;
  RequiereMantoux: boolean;
  Email: string;
  Movil: string;
  Telefono: string;
  Tests?: Tests;
  TerminosAceptados?: boolean;

}

export interface RespuestaEditarPerfil {

  RespuestaEditarPerfil;

}

export interface Tests {

  EstadoTestInfo: EstadoTestInfo[];

}

export interface EstadoTestInfo {

  NombreTest: string;
  HacerTest: boolean;

}


export interface RespuestaAPIGetDocumentos {

  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerDocumentosTrabajadorResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerDocumentosTrabajadorResult': [
              {
                'DocumentoInfo': Documento[]
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerDocumentosTrabajadores {

  DocumentoInfo: Documento[];

}

export interface Documento {

  Id: number;
  Descripcion: string;
  FechaDocumento: string;

}

export interface RespuestaDocumentosTrabajador {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerTrabajadorRelacionDocumentosResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerTrabajadorRelacionDocumentosResult': [
              {
                'DocumentoInfo': [
                  {
                    'Id': number,
                    'Descripcion': string,
                    'FechaDocumento': string
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}


export interface RespuestaDocumentoPDFTrabajador {
'soap:Envelope': {
  '$': {
    'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
  },
  'soap:Body': [
    {
      'ObtenerTrabajadorPdfResponse': [
        {
          '$': {
            'xmlns': 'http://tempuri.org/'
          },
          'ObtenerTrabajadorPdfResult': [
            {
              'NombreFichero': string,
              'Datos': Uint8Array
            }
          ]
        }
      ]
    }
  ]
};
}
export interface ObtenerDocumentoPDFTrabajador {

NombreFichero: string;
Datos: any;

}

export interface RespuestaGetAPICertificadosAptitud {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerCertificadosAptitudRelacionDocumentosResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerCertificadosAptitudRelacionDocumentosResult': [
              {
                'CertificadoAptitudInfo': Certificado[]
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerCertificados {

  CertificadoAptitudInfo: Certificado[];

}

export interface Certificado {

  'Id': string;
  'Descripcion': string;
  'FechaDocumento': string;
  'CentroTrabajo': string;
  'IdCentroTrabajo': number;
  'DomicilioCentroTrabajo': string;
  'TipoCentroTrabajo': string;
}

export interface RespuestaObtenerCertPDF {
 'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerCertificadoAptitudPdfResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerCertificadoAptitudPdfResult': [
              {
                'NombreFichero': string
                'Datos': Uint8Array;
              }
            ]
          }
        ]
      }
    ]
  };
}


export interface CertificadoPDF {

  NombreFichero: string;
  Datos: any;

}

export interface RespuestaGetCentrosTrabajo {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerCentrosTrabajoResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerCentrosTrabajoResult': [
              {
                'CentroTrabajoInfo': Centro[];
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerCentros {

  CentroTrabajoInfo: Centro[];

}

export interface Centro {

  IdCentroTrabajo: string;
  NombreCentroTrabajo: string;

}
export interface CambioPassword {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'CambiarPasswordResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            }
          }
        ]
      }
    ]
  };
}

export interface RecuentoNotificacionesResponse {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerRecuentoDocumentosNuevosResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerRecuentoDocumentosNuevosResult': [

            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerHistoricoNotificacionesRelacionDocumentos {
  'soap:Envelope': {
    '$': {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
    },
    'soap:Header': [
      {
        'AuthHeader': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'Usuario': string,
            'Password': string
          }
        ]
      }
    ],
    'soap:Body': [
      {
        'ObtenerHistoricoNotificacionesRelacionDocumentos': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'FiltroNot': [
              {
                'FechaDesde': string,
                'FechaHasta': string,
                'NifClienteConsultor': string
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface FiltroNot {
  FechaDesde: string;
  FechaHasta: string;
  NifClienteConsultor: string;
}

export interface RespuestaHistorial {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerHistoricoNotificacionesRelacionDocumentosResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerHistoricoNotificacionesRelacionDocumentosResult': [
              {
                HistoricoNotificacionInfo: Notificacion[];
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface ObtenerHistoriaDocumentos {

  HistoricoNotificacionInfo: Notificacion[];

}
export interface Notificacion {
  Referencia: string;
  FechaNotificacion: string;
  TipoDocumento: string;
  IdDocumento: number;
}

export interface RespuestaAsistencia {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerAsistenciasRelacionResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerAsistenciasRelacionResult': Asistencia[]
          }
        ]
      }
    ]
  };
}

export interface RespuestaAsistenciaInfo {

  AsistenciaInfo: Asistencia[];

}

export interface Asistencia {
    Trabajador: string;
    NifTrabajador: string;
    FechaDocumento: string;
    NombreCentroMedico: string;
    SituacionReconocimientoMedico: string;
}

export interface RespuestaCitasPendientes {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerCitasPendientesRelacionResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerCitasPendientesRelacionResult':  Asistencia[]
          }
        ]
      }
    ]
  };
}

export interface RespuestaCitasInfo {

  AsistenciaInfo: Asistencia[];

}


export interface RespuestaCitasEmpleado {
  'soap:Envelope': {
    '$': {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/'
    },
    'soap:Body': [
      {
        'ObtenerTrabajadorCitasPendientesRelacionResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerTrabajadorCitasPendientesRelacionResult': [
              {
                'AsistenciaInfo':  Asistencia[]
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface RespuestaCitasEmpleadoaInfo {

  AsistenciaInfo: Asistencia[];

}
export interface Asistencia {
  Trabajador: string;
  NifTrabajador: string;
  FechaDocumento: string;
  NombreCentroMedico: string;
  SituacionReconocimientoMedico: string;
}


export interface RespuestaCentrosMPE {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerCentrosMpeResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerCentrosMpeResult': [
              {
                'CentroMpeInfo': CentroMPE[]
              }
            ]
          }
        ]
      }
    ]
  };
}



export interface RespuestaCentroMPEInfo {

  CentroMpeInfo: CentroMPE[];

}

export interface CentroMPE {
  Nombre: string;
  Direccion: string;
  CodigoPostal: string;
  Localidad: string;
  Provincia: string;
  Horario: string;
  Telefono: string;
  Email: string;
  Latitud: string;
  Longitud: string;
  Imagen: string;
}

export interface RespuestaClientes {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerListadoClientesResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerListadoClientesResult': [
              {
                'ClienteInfo': [
                  {
                    'Nif': [
                      'B32169831'
                    ],
                    'NombreCliente': [
                      'EXCLUSIVAS VILA, S.L.'
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface RespuestaClienteInfo {
  ClienteInfo: Cliente[];
}

export interface Cliente {
    Nif: string;
    NombreCliente: string;

}

export interface RespuestaAPITest {
  'soap:Envelope': {
    '$': {
      'xmlns:soap': 'http://schemas.xmlsoap.org/soap/envelope/',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    },
    'soap:Body': [
      {
        'ObtenerTestsResponse': [
          {
            '$': {
              'xmlns': 'http://tempuri.org/'
            },
            'ObtenerTestsResult': [
              {
                'TestInfo': TestInfo[];
              }
            ]
          }
        ]
      }
    ]
  };
}

export interface TestInfo {

  Nombre: String;
  Permiso: String;
  HacerTest: Boolean;
  Preguntas?: PreguntaInfo;

}

export interface PreguntaInfo {

  PreguntaInfo: Pregunta[];


}
export interface Pregunta {

  IdPregunta: number;
  Pregunta: string;
  Respuestas: RespuestaInfo;

}


export interface RespuestaInfo {

  RespuestaInfo: Respuesta[];

}

export interface Respuesta {

  Respuesta: string;
  Valor: String;
  SubRespuestas: SubRespuestaInfo;
  ValorCheck: boolean;

}

export interface SubRespuestaInfo {

  IdPregunta: number;
  RespuestaSubPreguntas: RespuestaSubPreguntas;

}

export interface RespuestaSubPreguntas {

  RespuestaSubPreguntaInfo: RespuestaSubPreguntaInfo[];

}

export interface RespuestaSubPreguntaInfo {

  IdRespuesta: string;
  Respuesta: string;
  ValorCheck: boolean;

}

export interface RespuestasTestAPI {

  Usuario: String;
  Password: String;
  NombreTest: String;
  Permiso: String;
  FechaRealizacion: String;
  Respuestas?: RespuestaTest[];
  ImagenesMantoux?: ImagenesMantoux[];
}

export interface ImagenesMantoux {

  FechaFoto; String;
  Foto: any;

}

export interface RespuestaTest {

  IdPregunta: string;
  ValorRespuesta: string;
  SubRespuesta?: string[];

}

export interface MandarTokenAPI {

  Usuario: string;
  Token: string;
  TipoUsuario: string;

}

export interface RespuestaAPItoken {

  Codigo: number;
  Mensaje: string;

}


export interface InfoCentrosMapa {

  Nombre: string;
  Direccion: string;
  CodigoPostal: number;
  Localidad: string;
  Provincia: string;
  Horario: string;
  Telefono: number;
  Email: string;
  Latitud: number;
  Longitud: number;
}

export interface RespuestaAPINoticias {
  Respuesta: string;
  ImagenDestacada: Noticia;
  Noticias:  Noticia[];
  Promocion: Noticia[];
  Codigo:    number;
}

export interface Noticia {
  IdNoticia:        number;
  Descripcion:      string;
  Titulo:           string;
  Url:              string;
  PathImagen:       string;
  DescripcionCorta: string;
  TipoNoticia:      string;
  TipoEmpleado:     string;
  FechaInicio:      string;
  FechaFin:         string;
  URLYoutube:       string;
}

export interface RespuestaAPIDocumentos {
  error: boolean;
  Mensaje: string;
}



export interface ImagenTestMantoux {
  numeroPregunta: number;
  foto: string;
  fechaFoto: string;

}