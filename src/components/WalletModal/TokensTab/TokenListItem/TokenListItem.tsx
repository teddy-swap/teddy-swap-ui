import { Box, Flex, Typography } from '@ergolabs/ui-kit';
import { Paper, useTheme } from '@mui/material';
import React from 'react';

import { Currency } from '../../../../common/models/Currency';
import { AssetIcon } from '../../../AssetIcon/AssetIcon';
import { ConvenientAssetView } from '../../../ConvenientAssetView/ConvenientAssetView';
import { Truncate } from '../../../Truncate/Truncate';

interface TokenListItemProps {
  readonly currency: Currency;
}

export const TokenListItem: React.FC<TokenListItemProps> = ({ currency }) => {
  const theme = useTheme();
  return (
    <Paper
      className="!p-2 !px-4 !rounded-md"
      elevation={3}
      sx={{ background: theme.palette.background.default }}
    >
      <Flex align="center" stretch>
        <Flex.Item marginRight={2}>
          <AssetIcon asset={currency.asset} />
        </Flex.Item>
        <Flex.Item display="flex" col justify="center">
          <Typography.Body size="large" strong>
            <Truncate limit={10}>{currency.asset.ticker}</Truncate>
          </Typography.Body>
          <Typography.Body size="small" secondary>
            {currency.asset.name}
          </Typography.Body>
        </Flex.Item>
        <Flex.Item
          display="flex"
          col
          justify="center"
          flex={1}
          align="flex-end"
        >
          <Typography.Body strong>{currency.toString()}</Typography.Body>
          <Typography.Body size="small" secondary>
            <ConvenientAssetView value={currency} prefix="~" />
          </Typography.Body>
        </Flex.Item>
      </Flex>
    </Paper>
  );
};
