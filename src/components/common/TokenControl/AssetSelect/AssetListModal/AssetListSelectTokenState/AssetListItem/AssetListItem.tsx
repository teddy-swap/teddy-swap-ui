import { Box, Flex, Typography } from '@ergolabs/ui-kit';
import SearchIcon from '@mui/icons-material/Search';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import styled, { css } from 'styled-components';

import { AssetInfo } from '../../../../../../../common/models/AssetInfo';
import { Currency } from '../../../../../../../common/models/Currency';
import { useAssetsBalance } from '../../../../../../../gateway/api/assetBalance';
import { AssetIcon } from '../../../../../../AssetIcon/AssetIcon';
import { ConvenientAssetView } from '../../../../../../ConvenientAssetView/ConvenientAssetView';
import { Truncate } from '../../../../../../Truncate/Truncate';

interface TokenListItemProps {
  asset: AssetInfo;
  active?: boolean;
  className?: string;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const _AssetListItem: React.FC<TokenListItemProps> = ({
  asset,
  onClick,
  className,
  height,
  active,
}) => {
  const [balance] = useAssetsBalance();
  return (
    <ListItem
      disablePadding
      onClick={active ? undefined : onClick}
      className={`${className} !m-0`}
    >
      <ListItemButton>
        <ListItemIcon>
          <AssetIcon asset={asset} size="large" />
        </ListItemIcon>
        <div className="flex w-full">
          <div className="flex flex-col">
            <Typography.Title level={4}>
              <Truncate limit={20}>{asset.ticker}</Truncate>
            </Typography.Title>
            {asset.name && (
              <Typography.Body secondary size="small">
                {asset.name}
              </Typography.Body>
            )}
          </div>

          <div className="flex flex-col w-full justify-end">
            <div className="flex flex-col text-right">
              <Typography.Body strong size="large">
                {balance.get(asset).toString()}
              </Typography.Body>
              {!!Number(balance.get(asset).toAmount()) ? (
                <Typography.Body secondary size="small">
                  <ConvenientAssetView value={balance.get(asset)} prefix="~" />
                </Typography.Body>
              ) : (
                <Typography.Body secondary size="small">
                  ~
                </Typography.Body>
              )}
            </div>
          </div>
        </div>
      </ListItemButton>
    </ListItem>
  );
};

export const AssetListItem = styled(_AssetListItem)`
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      opacity: 0.5;
    `}
`;
