export interface Mensaje {
  message?: string;
  enable?: boolean;
}

export interface MensajesResponse {
  frase?: Mensaje;
  lema?: Mensaje;
  mensaje?: Mensaje;
}

export interface BannerResponse {
  image?: string;
  description?: string;
  url?: string;
}
