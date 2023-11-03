"use client";
import Script from "next/script";
import React, { useEffect, useRef } from "react";

const CitaPage = () => {
  const widgetContainerRef = useRef(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//widget.simplybook.me/v2/widget/widget.js";
    script.onload = () => {
      new SimplybookWidget({
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
          btn_color_1: "#f8ad31,#fc591e,#fc591e",
          link_color: "#cb8d75",
          display_item_mode: "block",
          body_bg_color: "#f5f5f5",
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
        container_id: "sbw_x5a3ue",
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div id="sbw_x5a3ue" className="" ref={widgetContainerRef}></div>
    </>
  );
};

export default CitaPage;
