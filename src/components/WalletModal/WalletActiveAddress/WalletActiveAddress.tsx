import { Box, Flex, Typography } from '@ergolabs/ui-kit';
import { Spin } from '@ergolabs/ui-kit';
import { t, Trans } from '@lingui/macro';
import { Paper, useTheme } from '@mui/material';
import React from 'react';

import { useSettings } from '../../../gateway/settings/settings';
import { splitStr } from '../../../utils/string/splitStr';
import { CopyButton } from '../../common/CopyButton/CopyButton';
import { ExploreButton } from '../../common/ExploreButton/ExploreButton';
import { InfoTooltip } from '../../InfoTooltip/InfoTooltip';

export const WalletActiveAddress = (): JSX.Element => {
  const { address } = useSettings();
  const [addressBegin, addressSuffix] = splitStr(address);
  const theme = useTheme();
  return (
    <Flex col>
      <Flex.Item marginBottom={2}>
        <InfoTooltip
          secondary
          content={t`All output assets will be received at this address.`}
        >
          <Typography.Body strong>
            <Trans>Active address</Trans>
          </Typography.Body>
        </InfoTooltip>
      </Flex.Item>
      <Paper
        className="!p-2 !px-4 !rounded-md"
        elevation={3}
        sx={{ background: theme.palette.background.default }}
      >
        {address ? (
          <Flex align="center">
            <Flex.Item marginRight={2} style={{ width: 1 }} flex={1}>
              <Typography.Title
                level={4}
                ellipsis={{
                  rows: 1,
                  suffix: addressSuffix,
                }}
              >
                {addressBegin}
              </Typography.Title>
            </Flex.Item>
            <Flex.Item marginRight={1} display="flex">
              <CopyButton text={address} />
            </Flex.Item>
            <Flex.Item display="flex">
              <ExploreButton to={address} />
            </Flex.Item>
          </Flex>
        ) : (
          <Spin size="small" />
        )}
      </Paper>
    </Flex>
  );
};
