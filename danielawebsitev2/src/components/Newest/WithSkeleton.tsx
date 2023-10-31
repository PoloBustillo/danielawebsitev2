"use client";
import NewCard from "@/components/Newest/NewCard";
import React, { Suspense } from "react";

export const WithSkeleton = () => {
  return (
    <Suspense key={crypto.randomUUID()} fallback={<>Loading</>}>
      <NewCard></NewCard>
    </Suspense>
  );
};
