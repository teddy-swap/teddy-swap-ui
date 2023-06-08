import { Box, Button, Flex, Slider, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/react';
import { Button as MatButton } from '@mui/material';
import { Slider as MatSlider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import CloseIcon from '../../../../../../assets/images/close.png';
import Warning from '../../../../../../assets/images/warning.png';

const LoadingPopUp = () => {
  const marks = [
    {
      value: 0,
      // label: '25%',
    },
    {
      value: 25,
      label: '25%',
    },
    {
      value: 50,
      label: '50%',
    },
    {
      value: 75,
      label: '75%',
    },
    {
      value: 100,
      label: '100%',
    },
  ];

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-between"
        style={{
          fontSize: '15px',
          borderBottom: '1px solid',
          paddingBottom: '7px',
        }}
      >
        <span>Waiting for confirmation</span>
        <span>
          <img
            src={CloseIcon}
            alt="warning"
            style={{ width: '50px', height: 'auto' }}
          />
        </span>
      </div>
      <div className="flex flex-col items-center justify-center" style={{ rowGap: '15px',paddingTop:"35px" }}>
      <div style={{paddingBottom:"20px"}}>
        <CircularProgress />
      </div>
      <div>Stake 194,397,193 ADA / USDA LP</div>
      <Flex align="center" gap={1}>
        <Typography.Body secondary size="small">
          Confirm this transaction in your wallet
        </Typography.Body>
      </Flex>
    </div>
    </div>
  );
};

export default LoadingPopUp;
