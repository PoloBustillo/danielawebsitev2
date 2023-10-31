"use client";
import NewCard from "@/components/Newest/NewCard";
import React, { Suspense } from "react";

export const WithSkeleton = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <NewCard></NewCard>
    </Suspense>
  );
};
