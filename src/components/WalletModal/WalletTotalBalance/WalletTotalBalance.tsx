import { Box, Flex, LoadingOutlined, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Paper, useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { Currency } from '../../../common/models/Currency';
import { AssetIcon } from '../../AssetIcon/AssetIcon';
import { ConvenientAssetView } from '../../ConvenientAssetView/ConvenientAssetView';

interface WalletTotalBalanceProps {
  balance?: Currency;
}

const BalanceLoading = styled(LoadingOutlined)`
  font-size: 24px;
`;

export const WalletTotalBalance: React.FC<WalletTotalBalanceProps> = ({
  balance,
}) => {
  const theme = useTheme();
  return (
    <Flex col>
      <Flex.Item marginBottom={2}>
        <Typography.Body strong>
          <Trans>Total balance</Trans>
        </Typography.Body>
      </Flex.Item>
      <Paper
        className="!p-2 !px-4"
        elevation={3}
        sx={{ background: theme.palette.background.default }}
      >
        {balance?.toCurrencyString() ? (
          <Flex row align="center">
            <Flex.Item marginRight={2}>
              <AssetIcon asset={balance?.asset} />
            </Flex.Item>
            <Flex.Item flex={1} display="flex">
              <Flex.Item marginRight={1}>
                <Typography.Title level={4}>
                  {balance.toCurrencyString()}
                </Typography.Title>
              </Flex.Item>
            </Flex.Item>
            <Flex.Item>
              <Typography.Body secondary size="small" strong>
                <ConvenientAssetView value={balance} prefix="~" />
              </Typography.Body>
            </Flex.Item>
          </Flex>
        ) : (
          <BalanceLoading />
        )}
      </Paper>
    </Flex>
  );
};
