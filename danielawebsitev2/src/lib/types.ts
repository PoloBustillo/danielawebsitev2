interface Mensaje {
  message?: string;
  enable?: boolean;
}

export interface MensajesResponse {
  frase?: Mensaje;
  lema?: Mensaje;
  mensaje?: Mensaje;
}
