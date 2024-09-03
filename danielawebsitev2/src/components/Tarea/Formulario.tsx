import React, { useEffect, useState } from "react";
import { DocumentReference, getDoc } from "firebase/firestore";
const Formulario = ({
  formularioDoc,
}: {
  formularioDoc: DocumentReference;
}) => {
  const [formularioData, setFormularioData] = useState<{} | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("Formulario", formularioDoc);
    (async () => {
      const doc = await getDoc(formularioDoc);
      setFormularioData(doc.data());
      console.log(doc.data());
    })();
  }, []);
  return <div>{JSON.stringify(formularioData)}</div>;
};

export default Formulario;
