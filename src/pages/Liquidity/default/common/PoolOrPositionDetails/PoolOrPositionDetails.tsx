import { Button, Flex, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Button as MatButton } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConnectWalletButton } from '../../../../../components/common/ConnectWalletButton/ConnectWalletButton';
import { LiquidityPoolOrPositionDetailsProps } from '../../../common/types/LiquidityPoolOrPositionDetailsProps';

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

  return (
    <>
      <div className="flex">
        <div className="flex flex-col w-[250px]">
          <ConnectWalletButton
            analytics={{ location: 'pool-list' }}
            className={'!font-bold !rounded-md h-[30px] !mt-[8px]'}
          >
            <MatButton
              variant="outlined"
              onClick={navigateToSwap}
              className={
                '!font-bold !rounded-md h-[30px] !mt-[8px] !normal-case'
              }
            >
              <Trans>Swap</Trans>
            </MatButton>
          </ConnectWalletButton>
          <MatButton
            variant="contained"
            onClick={overviewPool}
            className={'!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case'}
          >
            <Trans>Pool Overview</Trans>
          </MatButton>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex flex-col mr-4 mt-2">
            <Typography.Body size="small" secondary>
              <Trans>Total liquidity</Trans>
            </Typography.Body>
            <Typography.Body strong>
              {pool.x.asset.ticker}: {poolMapper(item).x.toString()}
            </Typography.Body>
            <Typography.Body strong>
              {pool.y.asset.ticker}: {poolMapper(item).y.toString()}
            </Typography.Body>
          </div>

          <div className="flex flex-col mr-4 mt-2">
            <Typography.Body size="small" secondary>
              <Trans>Price</Trans>
            </Typography.Body>
            <Typography.Body strong>
              {pool.xRatio.toString()} {pool.xRatio.baseAsset.ticker}/
              {pool.xRatio.quoteAsset.ticker}
            </Typography.Body>
            <Typography.Body strong>
              {pool.yRatio.toString()} {pool.yRatio.baseAsset.ticker}/
              {pool.yRatio.quoteAsset.ticker}
            </Typography.Body>
          </div>
        </div>
      </div>
    </>
  );
};
