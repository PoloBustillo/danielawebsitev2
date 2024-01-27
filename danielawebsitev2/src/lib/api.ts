import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { cache } from "react";
import { db, storage } from "./firebase-config";
import {
  BannerResponse,
  CarouselResponseType,
  MensajesResponseType,
  PreguntasResponseType,
  TerapiasResponseType,
} from "./types";

const MESSAGE_INITIAL_STATE = {
  frase: { enable: false, message: "" },
  lema: { enable: false, message: "" },
  mensaje: { enable: false, message: "" },
};

export const getMensajes: () => Promise<MensajesResponseType> = cache(
  async () => {
    const mensajeRef = collection(db, "mensaje");
    const mesajeDocs = await getDocs(mensajeRef);
    let mensajes: MensajesResponseType = MESSAGE_INITIAL_STATE;
    mesajeDocs.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        console.log(doc.id);
        if (doc.id == "frase") {
          console.log(data);
          mensajes.frase = {
            enable: data.enable,
            message: data.message,
          };
        }
        if (doc.id == "lema") {
          mensajes.lema = {
            enable: data.enable,
            message: data.message,
          };
        }
        if (doc.id == "mensaje") {
          mensajes.mensaje = {
            enable: data.enable,
            message: data.message,
          };
        }
      }
    });
    return mensajes;
  }
);

export const getTerapias: () => Promise<TerapiasResponseType | {}> = cache(
  async () => {
    const terapiasRef = collection(db, "terapias");
    const docSnaps = await getDocs(terapiasRef);

    let terapias = new Array();

    docSnaps.forEach((terapia) => {
      terapias.push({ ...terapia.data(), id: terapia.id });
    });

    let terapiasWithUrls = await Promise.all(
      terapias.map(async (data) => {
        return {
          ...data,
          imageBanner: await getDownloadURL(ref(storage, data.imageBanner)),
        };
      })
    );
    const terapiasReduced = terapiasWithUrls.reduce((a, v) => {
      let vType = v.type;
      if (a[vType]) {
        a[vType] = a[vType].concat(v);
      } else {
        a[v.type] = [v];
      }
      return a;
    }, {});
    return terapiasReduced as Promise<TerapiasResponseType>;
  }
);

export const getPreguntas: () => Promise<PreguntasResponseType[]> = cache(
  async () => {
    const preguntasRef = collection(db, "preguntas");
    const docSnaps = await getDocs(preguntasRef);
    let preguntas = new Array();
    docSnaps.forEach((pregunta) => {
      preguntas.push(pregunta.data());
    });
    return preguntas;
  }
);

export const getBannerImages: () => Promise<BannerResponse[]> = cache(
  async () => {
    const bannerRef = collection(db, "banner");

    const bannerDocs = await getDocs(bannerRef);

    let response = new Array();
    bannerDocs.forEach(async (doc) => {
      response.push({
        url: doc.data().url,
        description: doc.data().description,
        image: doc.data().image,
      });
    });
    let responseWithUrls = await Promise.all(
      response.map(async (data) => {
        return {
          ...data,
          image: await getDownloadURL(ref(storage, data.image)),
        };
      })
    );

    return responseWithUrls;
  }
);

export const getWebData = cache(async () => {
  const docRef = doc(db, "data", "psicologa");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
});

export const getTerapia = cache(async (id: string) => {
  const docRef = doc(db, "terapias", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = docSnap.data();
    let image = await getDownloadURL(ref(storage, data?.image));
    return { ...data, image };
  } else {
    return {};
  }
});

export const getBio = cache(async () => {
  const docRef = doc(db, "info", "daniela");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = docSnap.data();
    let image = await getDownloadURL(ref(storage, data?.image));
    return { ...data, image };
  } else {
    return {};
  }
});

export const getCarouselData: () => Promise<CarouselResponseType[]> = cache(
  async () => {
    const collectionRef = collection(db, "carousel");
    const docSnaps = await getDocs(collectionRef);

    let response = new Array();
    await docSnaps.forEach(async (doc) => {
      if (doc.data().enable)
        response.push({
          content: doc.data().content,
          title: doc.data().title,
          image: doc.data().image,
        });
    });

    let responseWithUrls = await Promise.all(
      response.map(async (data) => {
        return {
          ...data,
          image: await getDownloadURL(ref(storage, data.image)),
        };
      })
    );
    return responseWithUrls as CarouselResponseType[];
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
