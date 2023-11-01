"use client";
import React, { ReactNode, Suspense } from "react";

export const WithSkeleton = ({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
