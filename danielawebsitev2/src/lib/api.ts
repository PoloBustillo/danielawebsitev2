import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { cache } from "react";
import { db, storage } from "./firebase-config";
import {
  BannerResponse,
  CarouselResponseType,
  InstitutionType,
  MensajesResponseType,
  PreguntasResponseType,
  TerapiaType,
  TerapiasResponseType,
  WebDataType,
} from "./types";

const MESSAGE_INITIAL_STATE: MensajesResponseType = {
  frase: { enable: false, message: "" },
  lema: { enable: false, message: "" },
  mensaje: { enable: false, message: "" },
};

// Extract common logic for fetching data from a Firestore collection
async function fetchDataFromCollection<T>(
  collectionName: string
): Promise<T[]> {
  const collectionRef = collection(db, collectionName);
  const docSnaps = await getDocs(collectionRef);
  return docSnaps.docs.map((doc) => doc.data() as T);
}

export const getMensajes: () => Promise<MensajesResponseType> = cache(
  async () => {
    const mensajes: MensajesResponseType = { ...MESSAGE_INITIAL_STATE };
    const mensajeRef = collection(db, "mensaje");
    const mesajeDocs = await getDocs(mensajeRef);

    mesajeDocs.forEach((doc) => {
      const data = doc.data();
      if (doc.id === "frase") {
        mensajes.frase = { enable: data.enable, message: data.message };
      }
      if (doc.id === "lema") {
        mensajes.lema = { enable: data.enable, message: data.message };
      }
      if (doc.id === "mensaje") {
        mensajes.mensaje = { enable: data.enable, message: data.message };
      }
    });

    return mensajes;
  }
);

export const getTerapias: () => Promise<TerapiasResponseType | {}> = cache(
  async () => {
    try {
      const terapiasRef = collection(db, "terapias");
      const docSnaps = await getDocs(terapiasRef);

      const terapias: TerapiaType[] = docSnaps.docs.map((terapia) => {
        const data = terapia.data();
        console.log(data);
        return {
          id: terapia.id,
          name: data.name,
          type: data.type,
          costos: data.costos,
          imageDescription: data.imageDescription,
          longDescription: data.longDescription,
          description: data.description,
          imageBanner: data.imageBanner,
        };
      });

      const terapiasWithUrls = await Promise.all(
        terapias.map(async (data) => ({
          ...data,
          imageBanner: await getDownloadURL(ref(storage, data.imageBanner)),
        }))
      );

      const terapiasReduced = terapiasWithUrls.reduce<TerapiasResponseType>(
        (a, v) => {
          const vType = v.type;
          a[vType] = (a[vType] || []).concat(v);
          return a;
        },
        {}
      );

      return terapiasReduced;
    } catch (error) {
      console.error("Error fetching terapias:", error);
      return {};
    }
  }
);

export const getPreguntas: () => Promise<PreguntasResponseType[]> = cache(
  async () => {
    const preguntas = await fetchDataFromCollection<PreguntasResponseType>(
      "preguntas"
    );
    return preguntas;
  }
);

export const getBannerImages: () => Promise<BannerResponse[]> = cache(
  async () => {
    const banner = await fetchDataFromCollection<BannerResponse>("banner");

    const responseWithUrls = await Promise.all(
      banner.map(async (data) => ({
        ...data,
        image: await getDownloadURL(ref(storage, data.image)),
      }))
    );
    return responseWithUrls;
  }
);

export const getWebData: () => Promise<WebDataType | {}> = cache(async () => {
  try {
    const docRef = doc(db, "data", "psicologa");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as WebDataType;
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching web data:", error);
    return {};
  }
});

export const getTerapia: (id: string) => Promise<TerapiaType | {}> = cache(
  async (id: string) => {
    try {
      const docRef = doc(db, "terapias", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const image = await getDownloadURL(ref(storage, data?.image));
        return { ...data, image };
      } else {
        return {};
      }
    } catch (error) {
      console.error(`Error fetching terapia with ID ${id}:`, error);
      return {};
    }
  }
);

export const getBio: () => Promise<InstitutionType | {}> = cache(async () => {
  try {
    const docRef = doc(db, "info", "daniela");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const image = await getDownloadURL(ref(storage, data?.image));
      return { ...data, image };
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error fetching bio data:", error);
    return {};
  }
});

export const getCarouselData: () => Promise<CarouselResponseType[]> = cache(
  async () => {
    try {
      const collectionRef = collection(db, "carousel");
      const docSnaps = await getDocs(collectionRef);

      const response: CarouselResponseType[] = [];

      docSnaps.forEach((doc) => {
        if (doc.data().enable) {
          response.push({
            content: doc.data().content,
            title: doc.data().title,
            image: doc.data().image,
          });
        }
      });

      const responseWithUrls = await Promise.all(
        response.map(async (data) => ({
          ...data,
          image: await getDownloadURL(ref(storage, data.image)),
        }))
      );

      return responseWithUrls;
    } catch (error) {
      console.error("Error fetching carousel data:", error);
      return [];
    }
  }
);

// utils/getURL.ts
const IS_SERVER = typeof window === "undefined";
export default function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.NEXT_PUBLIC_SITE_URL
    : window.location.origin;
  return new URL(path, baseURL).toString();
}
