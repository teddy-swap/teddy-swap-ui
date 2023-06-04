import { Button, Flex, Typography } from '@ergolabs/ui-kit';
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
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-[250px]">
          <div className="flex flex-col">
            <span>Pending tedy</span>
            <span style={{ color: '#31A9FF' }}>1356</span>
          </div>
          <div className="flex flex-col pt-3">
            <span>Pending tedy</span>
            <span style={{ color: '#31A9FF' }}>1356</span>
          </div>
        </div>

        <div className="flex flex-col w-[250px] pt-3">
          <div className="flex flex-col">
            <span>Harvested</span>
            <span> 12456</span>
          </div>
          <div className="flex flex-col">
            <span>Pending tedy</span>
            <span>28.63</span>
          </div>
        </div>

        {/* <div className="flex justify-end w-full">
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
        </div> */}
        <div className="flex" style={{ columnGap: '25px', marginLeft: '25px' }}>
          <MatButton
            variant="contained"
            onClick={overviewPool}
            className={
              '!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case bg-[#217DBF]'
            }
          >
            Harvest
          </MatButton>
          <MatButton
            variant="contained"
            onClick={overviewPool}
            className={'!font-bold !rounded-md h-[30px] !mt-[4px] !normal-case'}
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Withdraw
          </MatButton>
          <MatButton
            // variant="contained"
            onClick={overviewPool}
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
        </div>
      </div>
    </>
  );
};
