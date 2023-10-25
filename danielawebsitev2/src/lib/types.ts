export interface MensajeType {
  message?: string;
  enable?: boolean;
}
export interface TerapiaType {
  imageBanner?: string;
  name?: string;
  type: string;
  costos?: [];
  imageDescription: string;
  longDescription: string;
  description: string;
}
export interface TerapiasResponseType {
  [key: string]: TerapiaType[];
}
export interface MensajesResponseType {
  frase?: MensajeType;
  lema?: MensajeType;
  mensaje?: MensajeType;
}

export interface BannerResponse {
  image?: string;
  description?: string;
  url?: string;
}
