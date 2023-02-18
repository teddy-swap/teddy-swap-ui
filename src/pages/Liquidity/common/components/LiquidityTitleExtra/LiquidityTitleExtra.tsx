import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { panalytics } from '../../../../../common/analytics';
import { useObservable } from '../../../../../common/hooks/useObservable';
import { isWalletSetuped$ } from '../../../../../gateway/api/wallets';

export const LiquidityTitleExtra: FC = () => {
  const navigate = useNavigate();
  const [isWalletConnected] = useObservable(isWalletSetuped$);

  const navigateToAddLiquidity = () => {
    navigate('add');
    panalytics.liquidityAdd();
  };

  return (
    <>
      {isWalletConnected && (
        <Button
          variant="contained"
          onClick={navigateToAddLiquidity}
          className={'!font-bold !rounded-md h-[30px] !mt-[8px] !normal-case'}
        >
          <Trans>Add Liquidity</Trans>
        </Button>
      )}
    </>
  );
};
