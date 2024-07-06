import { DocumentReference, Timestamp } from "firebase/firestore";

export interface MensajeType {
  message: string;
  enable?: boolean;
}

export interface UserWithAttributes {
  email: string | undefined;
  id?: string | undefined;
  role?: string | undefined;
  name?: string | undefined;
  apellidoPaterno?: string | undefined;
  apellidoMaterno?: string | undefined;
  celular?: string | undefined;
}
export interface NavBarProps {
  areasTerapias: TerapiasResponseType;
  pageName: string;
  logged: boolean;
}

export interface TerapiaType {
  imageBanner?: string;
  name?: string;
  type: string;
  duration: number;
  costos: { type: string; values: string }[];
  imageDescription: string;
  longDescription: string;
  description: string;
  id: string;
}

export interface BlogArticleType {
  header_image?: string;
  id: string;
  ref: DocumentReference;
  autor: string;
  created_on?: Timestamp;
  views?: number;
  resumen: string;
  card_image?: string;
  tags?: [string];
  name?: string;
  content?: [any];
}
export interface BlogDataType {
  video: { url?: string; msg?: string };
}
export interface CarouselResponseType {
  image?: string;
  content?: string;
  title?: string;
}

export interface CommentType {
  blogId: DocumentReference;
  userId: DocumentReference;
  id: string;
  commentText: string;
  status: string;
  replies: [DocumentReference] | [];
  created_on: any;
  likes: number;
  dislikes: number;
  reports: number;
}
export interface CommentTypeExtended {
  id: string;
  username: string;
  userAvatar: string;
  commentText: string;
  status: string;
  created_on: any;
  likes: number;
  dislikes: number;
  reports: number;
}
export interface PageDataType {
  enabled: boolean;
  priority: number;
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

export interface InstitutionType {
  events: [{ type: string; values: string }];
  image: string;
  shortDescription: string;
}
