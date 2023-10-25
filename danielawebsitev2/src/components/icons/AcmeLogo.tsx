import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
export const AcmeLogo = () => (
  <Link href={"/"}>
    <Image
      isZoomed
      height={"50px"}
      width={"50px"}
      src="/assets/logo/logo500.webp"
    ></Image>
  </Link>
);
