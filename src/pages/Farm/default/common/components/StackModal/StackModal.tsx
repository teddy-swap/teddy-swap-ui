import { Box, Button, Flex, Slider, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/react';
import { Button as MatButton } from '@mui/material';
import { Slider as MatSlider } from '@mui/material';
import React from 'react';
import ArrowBack from '../../../../../../assets/images/arrow_back.png';
import Warning from '../../../../../../assets/images/warning.png';
import { Modal as MatModal } from '@mui/material';
import { Box as MatBox } from '@mui/material';
import LoadingPopUp from '../LoadingPopUp/LoadingPopUp';
import { Label } from 'recharts';

const StackModal = ({Label}:any) => {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#274e63',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px',
  };
  return (
    <div className="flex flex-col" style={{ rowGap: '15px' }}>
      <div
        className="flex items-center justify-center"
        style={{
          fontSize: '15px',
          borderBottom: '1px solid',
          paddingBottom: '15px',
        }}
      >
        <span className=".\!justify-start mr-4">
          <img
            src={ArrowBack}
            alt="warning"
            style={{ width: '15px', height: 'auto' }}
          />
        </span>
        <span>{Label}</span>
      </div>

      <div>ADA/USDA-LP</div>
      <Flex align="center" gap={1}>
        <Typography.Body secondary size="small">
          Amount
        </Typography.Body>
      </Flex>
      <div className="flex justify-center \!text-\[20px\]" onClick={handleOpen}>0</div>
      <div style={{ marginBottom: '10px' }}>
        <MatSlider
          aria-label="Restricted values"
          defaultValue={20}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
         <MatModal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <MatBox sx={{ ...style, width: 400 }}>
              <LoadingPopUp/>
            </MatBox>
          </MatModal>
      </div>
      <div
        className="flex rounded-md p-4"
        style={{
          backgroundColor: '#1A1A1A',
          fontSize: '12px',
          columnGap: '15px',
        }}
      >
        <span>
          <img src={Warning} alt="warning" style={{ width: '20px' }} />
        </span>
        <span>
          Each Stake or Withdraw action will automatically harvest your reward!
        </span>
      </div>
      <MatButton
        variant="contained"
        // onClick={overviewPool}
        className={'!font-bold !rounded-md !mt-[4px] !normal-case bg-[#217DBF]'}
      >
        Stake
      </MatButton>
    </div>
  );
};

export default StackModal;
