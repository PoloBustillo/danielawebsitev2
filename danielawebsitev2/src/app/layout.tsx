import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

import {
  MensajesResponseType,
  TerapiaType,
  TerapiasResponseType,
} from "@/lib/types";
import { getMensajes, getTerapias } from "@/lib/api";
import { MsgBanner } from "@/components/Banner/Msgs/MsgBanner";

const inter = Inter({ subsets: ["latin"] });
const roboto_condensed = Roboto_Condensed({
  weight: "400",
  subsets: ["latin"],
});
export const revalidate = 30;
export const metadata: Metadata = {
  title: "Psicologa Daniela Diaz",
  description: "Servicios de Terapias psicológicas al mejor precio.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let terapiasResponse: TerapiaType[] = await getTerapias();
  const { mensaje }: MensajesResponseType =
    (await getMensajes()) as MensajesResponseType;

  let areasTerapias: TerapiasResponseType = terapiasResponse?.reduce(
    (a: TerapiasResponseType, v) => {
      let vType: string & keyof typeof a = v.type;
      if (a[vType]) {
        a[vType] = a[vType].concat(v);
      } else {
        a[v.type] = [v];
      }
      return a;
    },
    {}
  );

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
