"use client";
import { CalendarCheck2 } from "lucide-react";
import React from "react";
import { WhatsappShareButton, FacebookShareButton } from "react-share";

const Buttons = ({ pageUrl }: { pageUrl: string }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/terapia/${pageUrl}`;
  return (
    <div className="flex flex-wrap py-6 gap-2 border-t border-dashed dark:border-gray-400">
      <a
        rel="noopener noreferrer"
        href="/cita"
        className="px-3 py-1 rounded-sm hover:underline bg-rose-400 text-gray-900"
      >
        <CalendarCheck2 />
      </a>
      <a
        rel="noopener noreferrer"
        href="#"
        className="px-3 py-1 rounded-sm hover:underline bg-rose-400 text-gray-900"
      >
        <span className="sr-only"> Whatsapp </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke={"black"}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
          <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"></path>
        </svg>
      </a>
      <a
        rel="noopener noreferrer"
        href="#"
        className="px-3 py-1 rounded-sm hover:underline bg-rose-400 text-gray-900"
      >
        <FacebookShareButton url={shareUrl}>#Angular</FacebookShareButton>
      </a>
    </div>
  );
};

export default Buttons;
