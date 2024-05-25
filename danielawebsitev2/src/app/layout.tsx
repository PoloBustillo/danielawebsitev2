import { MsgBanner } from "@/components/Banner/Msgs/MsgBanner";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { getMensajes, getTerapias, getWebData } from "@/lib/api";
import type {
  MensajesResponseType,
  TerapiasResponseType,
  WebDataType,
} from "@/lib/types";
import { metadataPsic } from "@/utils/constants";
import type { Metadata } from "next";
import {
  Italianno,
  Roboto_Condensed,
  Yanone_Kaffeesatz,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inter",
});
const italliano = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
});
const barlow = Yanone_Kaffeesatz({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barlow",
});
export const dynamic = "force-dynamic";
export const metadata: Metadata = metadataPsic;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [webData, mensajes, areasTerapias]: [
    webData: WebDataType,
    mensajes: MensajesResponseType,
    areasTerapias: TerapiasResponseType
  ] = await Promise.all([getWebData(), getMensajes(), getTerapias()]);
  const { mensaje } = mensajes;

  return (
    <html lang="es">
      <body
        className={`${roboto_condensed.variable} ${italliano.variable} ${barlow.variable} font-sans`}
      >
        <Providers>
          {mensaje?.enable && (
            <MsgBanner messageData={mensaje.message}></MsgBanner>
          )}
          <NavBar
            areasTerapias={areasTerapias}
            pageName={webData.name}
          ></NavBar>
          {children}
          <Footer webData={webData} />
        </Providers>
      </body>
    </html>
  );
}
