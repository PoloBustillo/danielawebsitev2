"use client";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export const Logo = ({
  width = "50px",
  height = "50px",
}: {
  width?: string;
  height?: string;
}) => {
  const { theme } = useTheme();
  return (
    <Link href={"/"}>
      <Image
        isZoomed
        height={width}
        width={height}
        src={
          theme === "dark"
            ? "/assets/logo/logo-white-bg.png"
            : "/assets/logo/logo500.webp"
        }
      ></Image>
    </Link>
  );
};
