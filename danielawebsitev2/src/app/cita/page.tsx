"use client";
import Script from "next/script";
import React, { useEffect, useRef } from "react";

const CitaPage = () => {
  const widgetContainerRef = useRef(null);
  useEffect(() => {}, []);
  return (
    <>
      <Script
        id="simplybook"
        src="//widget.simplybook.me/v2/widget/widget.js"
      ></Script>
      <Script
        id="simplybook-call"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: ` new SimplybookWidget({
            widget_type: "iframe",
            url: "https://psicdaniela.simplybook.me",
            theme: "minimal",
            theme_settings: {
              timeline_show_end_time: "1",
              timeline_modern_display: "as_slots",
              hide_company_label: "0",
              timeline_hide_unavailable: "1",
              hide_past_days: "0",
              sb_base_color: "#cb8d75",
              btn_color_1: "#8c6d34,#5c3828,#fc591e",
              link_color: "#cb8d75",
              display_item_mode: "block",
              body_bg_color: "#ffffff",
              sb_review_image: "",
              dark_font_color: "#403733",
              light_font_color: "#ffffff",
              sb_company_label_color: "#aa5939",
              hide_img_mode: "0",
              sb_busy: "#c7b3b3",
              sb_available: "#2b212b",
            },
            timeline: "modern",
            datepicker: "top_calendar",
            is_rtl: false,
            app_config: {
              clear_session: 0,
              allow_switch_to_ada: 0,
              predefined: [],
            },
            container_id: "sbw_tfw6yr",
          });
  `,
        }}
      />
      <div id="sbw_tfw6yr" className="" ref={widgetContainerRef}></div>
    </>
  );
};

export default CitaPage;
