import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";
import { getTerapias } from "@/lib/api";
import { TerapiasResponseType } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Psicologa Daniela Diaz",
  description: "Servicios de Terapias psicológicas al mejor precio.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const terapiasResponse = await getTerapias();
  let areasTerapias: TerapiasResponseType = terapiasResponse?.reduce((a, v) => {
    if (a[v.type]) {
      a[v.type] = a[v.type].concat(v);
    } else {
      a[v.type] = [v];
    }
    return a;
  }, {});

  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="bg-purple px-4 py-3 text-white">
            <p className="text-center text-sm font-medium">
              Actualizando página web&nbsp;&nbsp;
              <a href="/blogs" className="inline-block underline">
                Revisa el nuevo blog!!
              </a>
            </p>
          </div>
          <NavBar areasTerapias={areasTerapias}></NavBar>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
