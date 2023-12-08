export interface MensajeType {
  message?: string;
  enable?: boolean;
}
export interface TerapiaType {
  imageBanner?: string;
  name?: string;
  type: string;
  costos: { type: string; values: string }[];
  imageDescription: string;
  longDescription: string;
  description: string;
}
export interface CarouselResponseType {
  image?: string;
  content?: string;
  title?: string;
}

export interface TerapiasResponseType {
  [key: string]: TerapiaType[];
}
export interface MensajesResponseType {
  frase?: MensajeType;
  lema?: MensajeType;
  mensaje: MensajeType;
}

export interface BannerResponse {
  image?: string;
  description?: string;
  url?: string;
}

export interface PreguntasResponseType {
  respuesta: string;
  orden: number;
  pregunta: string;
}
export interface WebDataType {
  email: string;
  telefono: string;
  slogan: string;
  name: string;
  tags: [string];
  extraData: [{ name: string; value: string; icon: string }];
  googleMapUrl: string;
  address: [{ values: string; type: string }];
  website: string;
  socialNetwork: [{ values: string; red: string }];
}
