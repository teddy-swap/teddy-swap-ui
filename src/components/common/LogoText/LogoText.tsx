import React from 'react';

export default function LogoText(props: LogoProps): React.ReactElement {
  return (
    <div className="text-white font-bold" style={{ fontSize: '25px' }}>
      TeddySwap
    </div>
  );
}

// TeddyLogo.defaultProps = {};

interface LogoProps {
  className?: string;
}
