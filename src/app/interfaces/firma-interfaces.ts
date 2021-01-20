export interface FirmaAPI {
    IdUsuario: number;
    IdTarea: number;
    FirmaBase64: string;
}

export interface FirmaPendiente {
    IdUsuario: number;
    IdTarea: number;
    FirmaBase64: Blob;
}
