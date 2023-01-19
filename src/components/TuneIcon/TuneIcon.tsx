import React from 'react';
export default function TuneIcon(props: TuneIconProps): React.ReactElement {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_5_472"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="29"
        height="29"
      >
        <rect
          x="0.515137"
          y="0.378784"
          width="27.9697"
          height="27.9697"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5_472)">
        <path
          d="M 13.192 24.826 V 17.834 H 15.522 V 20.165 H 24.844 V 22.495 H 15.522 V 24.826 H 13.192 Z M 3.87 22.495 V 20.165 H 10.861 V 22.495 H 3.87 Z M 8.531 17.834 V 15.504 H 3.87 V 13.173 H 8.531 V 10.842 H 10.861 V 17.834 H 8.531 Z M 13.192 15.504 V 13.173 H 24.844 V 15.504 H 13.192 Z M 17.853 10.842 V 3.851 H 20.183 V 6.181 H 24.844 V 8.512 H 20.183 V 10.842 H 17.853 Z M 3.87 8.512 V 6.181 H 15.522 V 8.512 H 3.87 Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

TuneIcon.defaultProps = {};

interface TuneIconProps {
  className?: string;
}
