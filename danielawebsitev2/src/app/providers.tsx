"use client";

// Providers.js
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";

// Import the scripts
import { SimplybookWidgetScript } from "../lib/scripts";
import { SessionProvider } from "next-auth/react";

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
