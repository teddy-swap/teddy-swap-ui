import { Box, Button, Flex, Modal, Typography } from '@ergolabs/ui-kit';
import { Button as MatButton, Snackbar } from '@mui/material';
import { Box as MatBox } from '@mui/material';
import { Modal as MatModal } from '@mui/material';
// import { State } from '../components/POPUP/SuccessPopup';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '../../../../../assets/icons/popUp/close.svg';
import { ReactComponent as TickIcon } from '../../../../../assets/icons/popUp/tick.svg';
import { ReactComponent as Ada } from '../../../../../assets/icons/tokens/token-ada.svg';
import { ReactComponent as Teddy } from '../../../../../assets/icons/tokens/token-kushti.svg';
import { ConnectWalletButton } from '../../../../../components/common/ConnectWalletButton/ConnectWalletButton';
import { LiquidityPoolOrPositionDetailsProps } from '../../../common/types/LiquidityPoolOrPositionDetailsProps';
import Popup from '../components/POPUP/Popup';
import StackModal from '../components/StackModal/StackModal';

export const PoolOrPositionDetails: FC<
  LiquidityPoolOrPositionDetailsProps<any>
> = ({ poolMapper, item, children }) => {
  const navigate = useNavigate();

  const pool = poolMapper(item);

  const overviewPool = () => navigate(pool.id);

  const navigateToSwap = () =>
    navigate(
      `../../swap?base=${pool.x.asset.id}&quote=${pool.y.asset.id}&initialPoolId=${pool.id}`,
    );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [withOpen, setWithOpen] = React.useState(false);
  const handleWithOpen = () => {
    setWithOpen(true);
  };
  const handleWithClose = () => {
    setWithOpen(false);
  };

  const [popOpen, setPopOpen] = React.useState(false);
  const handlePopOpen = () => {
    setPopOpen(true);
  };
  const handlePopClose = () => {
    setPopOpen(false);
  };

  const [popFailOpen, setPopFailOpen] = React.useState(false);
  const handlePopFailOpen = () => {
    setPopFailOpen(true);
  };
  const handlePopFailClose = () => {
    setPopFailOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px',
  };

  const popStyle = {
    position: 'absolute',
    top: '20%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '10px',
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-[250px]">
          <div className="flex items-center">
            <div>
              <Teddy />
            </div>
            <div className="flex flex-col pt-3 ml-4">
              <Flex align="center" gap={1}>
                <Typography.Body secondary size="small">
                  Pending Kushti
                </Typography.Body>
              </Flex>
              <span style={{ color: '#31A9FF' }}>12500</span>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <Ada />
            </div>
            <div className="flex flex-col pt-3 ml-4">
              <Flex align="center" gap={1}>
                <Typography.Body secondary size="small">
                  Pending Ada
                </Typography.Body>
              </Flex>
              <span style={{ color: '#31A9FF' }}>1356</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[250px] pt-3">
          <div className="flex flex-col">
            <Flex align="center" gap={1}>
              <Typography.Body secondary size="small">
                Harvested
              </Typography.Body>
            </Flex>
            <span> 12456</span>
          </div>
          <div className="flex flex-col">
            <Flex align="center" gap={1}>
              <Typography.Body secondary size="small">
                Harvested
              </Typography.Body>
            </Flex>
            <span>28.63</span>
          </div>
        </div>

        <div className="flex" style={{ columnGap: '25px', marginLeft: '25px' }}>
          <MatButton
            variant="contained"
            // onClick={handlePopOpen}
            onClick={handlePopFailOpen}
            className={
              '!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case bg-[#217DBF]'
            }
            style={{ width: '103px' }}
          >
            Harvest
          </MatButton>
          <MatModal
            open={popOpen}
            onClose={handlePopClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <MatBox sx={{ ...popStyle, width: 400 }}>
              <Popup
                Icon={<TickIcon style={{ width: '100px', height: 'auto' }} />}
                Label="View on Explorer"
                Text="Transaction Successful"
              />
            </MatBox>
          </MatModal>

          <MatModal
            open={popFailOpen}
            onClose={handlePopFailClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <MatBox sx={{ ...popStyle, width: 400 }}>
              <Popup
                Icon={<Close style={{ width: '100px', height: 'auto' }} />}
                Label="Try Again Later"
                Text="Transaction Failed"
              />
            </MatBox>
          </MatModal>

          <MatButton
            // variant="contained"
            onClick={handleWithOpen}
            className={'!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case'}
            style={{
              backgroundColor: '#333333',
              color: 'white',
              padding: '16px',
              width: '103px',
            }}
          >
            Withdraw
          </MatButton>
          <MatModal
            open={withOpen}
            onClose={handleWithClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <MatBox sx={{ ...style, width: 400 }}>
              <StackModal Label="Withdraw Staked LP Tokens" />
            </MatBox>
          </MatModal>
          <MatButton
            // variant="contained"
            onClick={handleOpen}
            className={
              '!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case w-[200px]'
            }
            style={{
              backgroundColor: '#198FA3',
              color: 'white',
              width: '103px',
            }}
          >
            Stake
          </MatButton>
          <MatModal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <MatBox sx={{ ...style, width: 400 }}>
              <StackModal Label="Stake LP Tokens" />
            </MatBox>
          </MatModal>
        </div>
      </div>
    </>
  );
};
