import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firebase from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase-config";
import {
  BannerResponse,
  BlogArticleType,
  BlogDataType,
  CarouselResponseType,
  InstitutionType,
  MensajesResponseType,
  PageDataType,
  PreguntasResponseType,
  TareasType,
  TerapiaType,
  TerapiasResponseType,
  WebDataType,
} from "./types";

import { Timestamp } from "firebase-admin/firestore";
import { cache } from "react";

const MESSAGE_INITIAL_STATE: MensajesResponseType = {
  frase: { enable: false, message: "" },
  lema: { enable: false, message: "" },
  mensaje: { enable: false, message: "" },
};

export const getFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

export async function saveAvatarImageToStorage(url: any, path: string) {
  try {
    const storageRef = ref(storage, `avatars/${path}.jpg`);
    const res = await uploadBytes(storageRef, url);
    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
}

export async function saveTareasToStorage(url: any, path: string) {
  try {
    const storageRef = ref(storage, `tareas/${path}`);
    const res = await uploadBytes(storageRef, url);
    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
}

export const saveTareasToFirestore = async (tareaId: string, data: {}) => {
  try {
    const docRef = doc(db, "tareas", tareaId);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    throw error;
  }
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

export const getPageSkeleton: () => Promise<(PageDataType & { id: string })[]> =
  cache(async () => {
    const pageSkeleton = collection(db, "page-configs");
    const pageSkeletonDocs = await getDocs(pageSkeleton);
    let pageData = new Array<PageDataType & { id: string }>();
    pageSkeletonDocs.forEach((doc) => {
      const data = doc.data() as PageDataType;
      const id = doc.id;
      pageData.push({ enabled: data.enabled, priority: data.priority, id: id });
    });
    pageData = pageData.filter((data) => {
      return data.enabled;
    });
    pageData.sort((data, data2) => {
      return data2.priority - data.priority;
    });
    return pageData;
  });

export const getTerapias: () => Promise<TerapiasResponseType | {}> = cache(
  async () => {
    try {
      const terapiasRef = collection(db, "terapias");
      const docSnaps = await getDocs(terapiasRef);

      const terapias: TerapiaType[] = docSnaps.docs.map((terapia) => {
        const data = terapia.data();

        return {
          id: terapia.id,
          name: data.name,
          type: data.type,
          duration: data.duration,
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

export const saveImageForUser = async (userId: string, urlImage: string) => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { image: urlImage }, { merge: true });
  } catch (error) {
    throw error;
  }
};

export const saveDataForUser = async (userId: string, data: {}) => {
  try {
    const docRef = doc(db, "users", userId);

    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar los datos");
  }
};
export const getWebData: () => Promise<WebDataType> = cache(async () => {
  try {
    const docRef = doc(db, "data", "psicologa");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as WebDataType;
    } else {
      return {
        email: "",
        telefono: "",
        slogan: "",
        name: "",
        tags: [""],
        extraData: [{ name: "", value: "", icon: "" }],
        googleMapUrl: "",
        address: [{ values: "", type: "" }],
        website: "",
        socialNetwork: [{ values: "", red: "" }],
      };
    }
  } catch (error) {
    return {
      email: "",
      telefono: "",
      slogan: "",
      name: "",
      tags: [""],
      extraData: [{ name: "", value: "", icon: "" }],
      googleMapUrl: "",
      address: [{ values: "", type: "" }],
      website: "",
      socialNetwork: [{ values: "", red: "" }],
    };
  }
});

export const getBlogsData: () => Promise<BlogDataType | {}> = cache(
  async () => {
    try {
      const docRef = doc(db, "blogs", "blog");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        return data;
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  }
);

export const getBlogs: () => Promise<BlogArticleType[] | []> = cache(
  async () => {
    try {
      let blogsCollection = collection(db, "blog");
      const queryblogs = query(
        blogsCollection,
        where("status", "==", "published")
      );
      const docSnap = await getDocs(queryblogs);

      let blogs = [] as any;
      docSnap.forEach(async (docData) => {
        let blog = docData.data();
        blogs.push({ ...blog, id: docData.id });
      });
      blogs = await Promise.all(
        blogs.map(async (blog: BlogArticleType) => {
          return {
            ...blog,
            header_image: await getFile(blog.header_image!),
            card_image: await getFile(blog.card_image!),
          };
        })
      );
      return blogs;
    } catch (error) {
      return [];
    }
  }
);

export const getTareas: (userId: string) => Promise<TareasType[]> = cache(
  async (userId: string) => {
    let tareasCollection = collection(db, "tareas-usuario-respuestas");
    const queryTareasUsuarios = query(
      tareasCollection,
      where("user", "==", doc(db, "users", userId))
    );
    let tareasDocs = await getDocs(queryTareasUsuarios);
    let tareasUsuarios: any[] = [];
    tareasDocs.forEach((doc) => {
      tareasUsuarios.push(doc.data());
    });

    let tareas: TareasType[] = await Promise.all(
      tareasUsuarios.map(async (tareaUsuario) => {
        const tareaRef = await doc(db, "tareas", tareaUsuario.tarea.id);
        const tareaData = (await getDoc(tareaRef)).data();
        return {
          start: tareaUsuario.rangeDate[0],
          end: tareaUsuario.rangeDate[1],
          status: tareaUsuario.status,
          id: tareaUsuario.tarea.id,
          name: tareaData?.name,
          descripcion: tareaData?.explicacion,
          explicacion: tareaData?.explicacion,
          tareasContent: tareaData?.type,
          users: [], // Add the missing property 'users'
          actions: [], // Add the missing property 'actions'
          type: [""], // Update the type of 'type' property to allow for a string value
        };
      })
    );

    tareas = tareas.filter((tarea) => {
      return (tarea.start as Timestamp).seconds < new Date().getTime() / 1000;
    });

    return tareas;
  }
);

export const getTerapia: (id: string) => Promise<TerapiaType | {}> = cache(
  async (id: string) => {
    try {
      let terapiasCollection = collection(db, "terapias");
      const queryTerapia = query(
        terapiasCollection,
        where("name", "==", decodeURIComponent(id))
      );
      const docSnap = await getDocs(queryTerapia);

      let terapia = {};
      docSnap.forEach(async (docData) => {
        terapia = docData.data();

        terapia = { ...terapia };
      });
      let imageUrl = await getFile((terapia as TerapiaType).imageDescription!);
      terapia = { ...terapia, imageDescription: imageUrl };
      return terapia;
    } catch (error) {
      return {};
    }
  }
);

export const getTarea: (id: string) => Promise<TareasType | {}> = cache(
  async (id: string) => {
    const docRef = doc(db, "tareas", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id };
    } else {
      return {};
    }
  }
);

export const getBlog: (id: string) => Promise<BlogArticleType | {}> = cache(
  async (id: string) => {
    try {
      let blogCollection = collection(db, "blog");
      const queryTerapia = query(
        blogCollection,
        where("name", "==", decodeURIComponent(id))
      );
      const docSnap = await getDocs(queryTerapia);

      let blogData = {};
      docSnap.forEach(async (docData) => {
        blogData = docData.data();

        blogData = { ...blogData, id: docData.id, ref: docData.ref };
      });
      let imageHeader = await getFile(
        (blogData as BlogArticleType).header_image!
      );
      blogData = { ...blogData, header_image: imageHeader };
      return blogData;
    } catch (error) {
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
