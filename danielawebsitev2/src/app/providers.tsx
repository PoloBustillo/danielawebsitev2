"use client";
import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Script from "next/script";

export function Providers(props: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
      >
        {props.children}
        {/* <!-- Messenger Chat plugin Code --> */}
        <div id="fb-root"></div>
        {/* <!-- Your Chat plugin code --> */}
        <div id="fb-customer-chat" className="fb-customerchat"></div>
        <Script
          id="messenger-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "106715554719583");
            chatbox.setAttribute("attribution", "biz_inbox");}`,
          }}
        ></Script>
        <Script
          id="messenger-sdk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: ` window.fbAsyncInit = function() {
                FB.init({
                  xfbml            : true,
                  version          : 'v18.0'
                });
              };
        
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));`,
          }}
        ></Script>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
