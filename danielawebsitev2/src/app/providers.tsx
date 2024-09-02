"use client";

// Providers.js
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Import the scripts
import { SimplybookWidgetScript } from "../lib/scripts";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

export function Providers(props: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          {props.children}
          <Script
            id="simplybook"
            src="//widget.simplybook.me/v2/widget/widget.js"
          ></Script>
          <SpeedInsights />
          <Analytics />
          {path !== "/cita" && (
            <Script
              id="simplybook-call"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: SimplybookWidgetScript,
              }}
            />
          )}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
