"use client";

// Providers.js
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";

// Import the scripts
import {
  MessengerSDKScript,
  MessengerTagScript,
  SimplybookWidgetScript,
} from "../lib/scripts";

export function Providers(props: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {props.children}
        {/* <!-- Messenger Chat plugin Code --> */}
        <div id="fb-root"></div>
        {/* <!-- Your Chat plugin code --> */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
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
        <Script
          id="messenger-tag"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: MessengerTagScript,
          }}
        ></Script>
        <Script
          id="messenger-sdk"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: MessengerSDKScript,
          }}
        ></Script>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
