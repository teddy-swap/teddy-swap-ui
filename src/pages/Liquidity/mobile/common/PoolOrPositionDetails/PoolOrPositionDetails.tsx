import { Box, Button, Flex } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ConnectWalletButton } from '../../../../../components/common/ConnectWalletButton/ConnectWalletButton';
import { IsCardano } from '../../../../../components/IsCardano/IsCardano';
import { IsErgo } from '../../../../../components/IsErgo/IsErgo';
import { formatToAda, formatToUSD } from '../../../../../services/number';
import { LiquidityPoolOrPositionDetailsProps } from '../../../common/types/LiquidityPoolOrPositionDetailsProps';
import { DetailRow, DetailsBox } from '../DetailsBox/DetailsBox';

const StyledButton = styled(Button)`
  width: 100%;
`;

export const PoolOrPositionDetails: FC<
  LiquidityPoolOrPositionDetailsProps<any>
> = ({ poolMapper, item, children }) => {
  const pool = poolMapper(item);

  const tvl = pool.tvl;
  const volume = pool.volume;
  const yearlyFeesPercent = pool.yearlyFeesPercent;

  const navigate = useNavigate();

  const overviewPool = () => navigate(pool.id);

  const navigateToSwap = () =>
    navigate(
      `../../swap?base=${pool.x.asset.id}&quote=${pool.y.asset.id}&initialPoolId=${pool.id}`,
    );

  return (
    <Box padding={2} bordered={false} transparent={true}>
      <Flex col>
        <DetailRow marginBottom={2}>
          <DetailsBox
            title={<Trans>Total liquidity</Trans>}
            value={
              <Flex col>
                <Flex.Item marginBottom={1} display="flex" justify="flex-end">
                  {pool.x.asset.ticker}: {pool.x.toString()}
                </Flex.Item>
                <Flex.Item display="flex" justify="flex-end">
                  {pool.y.asset.ticker}: {pool.y.toString()}
                </Flex.Item>
              </Flex>
            }
          />
        </DetailRow>
        {children && <DetailRow marginBottom={2}>{children}</DetailRow>}
        <DetailRow marginBottom={2}>
          <DetailsBox
            title={<Trans>Price</Trans>}
            value={
              <Flex col>
                <Flex.Item marginBottom={1} display="flex" justify="flex-end">
                  {pool.xRatio.toString()} {pool.xRatio.baseAsset.ticker}/
                  {pool.xRatio.quoteAsset.ticker}
                </Flex.Item>
                <Flex.Item display="flex" justify="flex-end">
                  {pool.yRatio.toString()} {pool.yRatio.baseAsset.ticker}/
                  {pool.yRatio.quoteAsset.ticker}
                </Flex.Item>
              </Flex>
            }
          />
        </DetailRow>
        <DetailRow marginBottom={2}>
          <DetailsBox
            title={<Trans>Fee</Trans>}
            value={<Trans>{pool.poolFee}%</Trans>}
          />
        </DetailRow>
        <DetailRow marginBottom={2}>
          <DetailsBox
            title={<Trans>TVL</Trans>}
            value={
              <Trans>
                {tvl ? (
                  <>
                    <IsErgo>{formatToUSD(tvl.toAmount(), 'abbr')}</IsErgo>
                    <IsCardano>{formatToAda(tvl.toAmount(), 'abbr')}</IsCardano>
                  </>
                ) : (
                  '—'
                )}
              </Trans>
            }
          />
        </DetailRow>
        <DetailRow marginBottom={2}>
          <DetailsBox
            title={<Trans>Volume 24H</Trans>}
            value={
              <Trans>
                {volume ? (
                  <>
                    <IsErgo>{formatToUSD(volume.toAmount(), 'abbr')}</IsErgo>
                    <IsCardano>
                      {formatToAda(volume.toAmount(), 'abbr')}
                    </IsCardano>
                  </>
                ) : (
                  '—'
                )}
              </Trans>
            }
          />
        </DetailRow>
        <DetailRow marginBottom={4}>
          <DetailsBox
            title={<Trans>APR</Trans>}
            value={
              <Trans>{yearlyFeesPercent ? `${yearlyFeesPercent}%` : '—'}</Trans>
            }
          />
        </DetailRow>
        <Flex.Item display="flex" align="center">
          <Flex.Item flex={1} marginRight={2}>
            <ConnectWalletButton>
              <StyledButton onClick={navigateToSwap}>
                <Trans>Swap</Trans>
              </StyledButton>
            </ConnectWalletButton>
          </Flex.Item>
          <Flex.Item flex={1}>
            <StyledButton type="primary" onClick={overviewPool}>
              <Trans>Pool Overview</Trans>
            </StyledButton>
          </Flex.Item>
        </Flex.Item>
      </Flex>
    </Box>
  );
};
