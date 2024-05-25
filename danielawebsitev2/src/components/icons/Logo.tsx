"use client";
import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import Link from "next/link";

export const Logo = ({
  width = 60,
  height = 60,
}: {
  width?: number;
  height?: number;
}) => {
  const { theme } = useTheme();
  return (
    <Link href={"/"}>
      <Image
        classNames={{ zoomedWrapper: ["w-[50px]"] }}
        alt="Logo de Psicologa en Puebla Daniela Diaz"
        as={NextImage}
        radius="full"
        loading="lazy"
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
