import React from 'react';
export default function SwapIcon(props: SwapIconProps): React.ReactElement {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M 5.198 12.565 V 4.848 L 2.428 7.617 L 0.895 6.111 L 6.273 0.733 L 11.651 6.111 L 10.119 7.617 L 7.349 4.848 V 12.565 H 5.198 Z M 12.727 22.246 L 7.349 16.868 L 8.882 15.362 L 11.651 18.132 V 10.414 H 13.803 V 18.132 L 16.572 15.362 L 18.105 16.868 L 12.727 22.246 Z"
        fill="currentColor"
      />
    </svg>
  );
}

SwapIcon.defaultProps = {};

interface SwapIconProps {
  className?: string;
}
