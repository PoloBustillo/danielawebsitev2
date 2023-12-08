import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase-config";
import { cache } from "react";

export const getMensajes = cache(async () => {
  const mensajeRef = collection(db, "mensaje");
  const mesajeDocs = await getDocs(mensajeRef);
  let mensajes = {};
  mesajeDocs.forEach((doc) => {
    mensajes[doc.id] = doc.data();
  });
  return mensajes;
});

export const getTerapias = cache(async () => {
  const terapiasRef = collection(db, "terapias");
  const docSnaps = await getDocs(terapiasRef);
  let terapias = [];
  docSnaps.forEach((terapia) => {
    terapias.push(terapia.data());
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
  return terapiasReduced;
});

export const getPreguntas = cache(async () => {
  const preguntasRef = collection(db, "preguntas");
  const docSnaps = await getDocs(preguntasRef);
  let preguntas = [];
  docSnaps.forEach((pregunta) => {
    preguntas.push(pregunta.data());
  });
  return preguntas;
});

export const getBannerImages = cache(async () => {
  const bannerRef = collection(db, "banner");

  const bannerDocs = await getDocs(bannerRef);

  let response = [];
  await bannerDocs.forEach(async (doc) => {
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
});

export const getWebData = cache(async () => {
  const docRef = doc(db, "data", "psicologa");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
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

export const getCarouselData = cache(async () => {
  const collectionRef = collection(db, "carousel");
  const docSnaps = await getDocs(collectionRef);

  let response = [];
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
  return responseWithUrls;
});
