"use client";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
export const AcmeLogo = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Link href={"/"}>
      <Image
        isZoomed
        height={"50px"}
        width={"50px"}
        src={
          theme === "dark"
            ? "/assets/logo/logo-white-bg.png"
            : "/assets/logo/logo500.webp"
        }
      ></Image>
    </Link>
  );
};
