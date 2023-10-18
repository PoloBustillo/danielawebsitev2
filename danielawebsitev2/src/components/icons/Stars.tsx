import React from "react";

const Stars = ({ color }: { color: string }) => {
  return (
    <svg
      width="70"
      height="12"
      className="block my-auto"
      viewBox="0 0 70 12"
      fill="#666"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z"
        fill={color}
      />
      <path
        d="M20.5 0L21.9593 4.1459H26.6819L22.8613 6.7082L24.3206 10.8541L20.5 8.2918L16.6794 10.8541L18.1387 6.7082L14.3181 4.1459H19.0407L20.5 0Z"
        fill={color}
      />
      <path
        d="M35 0L36.3471 4.1459H40.7063L37.1796 6.7082L38.5267 10.8541L35 8.2918L31.4733 10.8541L32.8204 6.7082L29.2937 4.1459H33.6529L35 0Z"
        fill={color}
      />
      <path
        d="M49.5 0L50.9593 4.1459H55.6819L51.8613 6.7082L53.3206 10.8541L49.5 8.2918L45.6794 10.8541L47.1387 6.7082L43.3181 4.1459H48.0407L49.5 0Z"
        fill={color}
      />
      <path
        d="M64 1.61803L64.8716 4.30041L64.9838 4.6459H65.3471H68.1675L65.8857 6.3037L65.5918 6.51722L65.7041 6.86271L66.5757 9.54508L64.2939 7.88729L64 7.67376L63.7061 7.88729L61.4243 9.54508L62.2959 6.86271L62.4082 6.51722L62.1143 6.3037L59.8325 4.6459H62.6529H63.0162L63.1284 4.30041L64 1.61803Z"
        fill={color}
        stroke={color}
      />
      <mask
        id="mask0_5_9713"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="58"
        y="0"
        width="12"
        height="11"
      >
        <path
          d="M64 0L65.3471 4.1459H69.7063L66.1796 6.7082L67.5267 10.8541L64 8.2918L60.4733 10.8541L61.8204 6.7082L58.2937 4.1459H62.6529L64 0Z"
          fill={color}
        />
      </mask>
      <g mask="url(#mask0_5_9713)">
        <rect x="65" y="-1" width="6" height="14" fill="#DCC9B8" />
      </g>
    </svg>
  );
};

export default Stars;
