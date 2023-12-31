import React from "react";

export const Stairs = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={`${props.className} icon icon-tabler icon-tabler-stairs`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M22 5h-5v5h-5v5h-5v5h-5"></path>
  </svg>
);
