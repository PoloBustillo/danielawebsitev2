"use client";
import { db } from "@/lib/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";

const Views = ({
  views,
  created,
  blogId,
}: {
  views: number;
  created: string;
  blogId: string;
}) => {
  useEffect(() => {
    if (blogId) {
      const docRef = doc(db, "blog", blogId);
      setDoc(docRef, { views: views + 1 }, { merge: true });
    }
  }, []);
  return (
    <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
      {`${views + 1} vistas  • ${created}`}
    </p>
  );
};

export default Views;
