"use client";
import React, { ReactElement, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

interface WrapperType {
  children: ReactNode | ReactElement;
}

const DesktopWrapper = ({ children }: WrapperType) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
  return <>{isTabletOrMobile ? null : children}</>;
};
export default DesktopWrapper;
