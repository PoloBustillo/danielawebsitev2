"use client";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import Link from "next/link";

export const Logo = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => {
  const { theme } = useTheme();
  return (
    <Link href={"/"}>
      <Image
        alt="Logo de Psicologa en Puebla Daniela Diaz"
        as={NextImage}
        radius="full"
        loading="eager"
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
