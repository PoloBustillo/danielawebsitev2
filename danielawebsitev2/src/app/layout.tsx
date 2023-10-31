import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

import { MensajesResponseType, TerapiasResponseType } from "@/lib/types";
import { getMensajes, getTerapias } from "@/lib/api";
import { MsgBanner } from "@/components/Banner/Msgs/MsgBanner";
import { metadataPsic } from "@/utils/constants";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"],
});
export const dynamic = "force-dynamic";
export const metadata: Metadata = metadataPsic;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const areasTerapias: TerapiasResponseType =
    (await getTerapias()) as TerapiasResponseType;
  const { mensaje }: MensajesResponseType =
    (await getMensajes()) as MensajesResponseType;

  return (
    <html lang="es">
      <body className={roboto_condensed.className}>
        <Providers>
          <MsgBanner messageData={mensaje}></MsgBanner>
          <NavBar areasTerapias={areasTerapias}></NavBar>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
