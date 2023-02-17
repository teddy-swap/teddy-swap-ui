import { Flex } from '@ergolabs/ui-kit';
import { Chip } from '@mui/material';
import React, { FC } from 'react';

import { AnalyticsData } from '../../../../../../../services/new/analytics';
import { formatToUSD } from '../../../../../../../services/number';
import { renderFractions } from '../../../../../../../utils/math';

export interface TvlOrVolume24Column {
  readonly usd?: AnalyticsData;
}

export const TvlOrVolume24Column: FC<TvlOrVolume24Column> = ({ usd }) => (
  <Flex>
    <Chip
      label={
        usd
          ? formatToUSD(
              renderFractions(usd.value, usd.units.currency.decimals),
              'abbr',
            )
          : '—'
      }
    />
  </Flex>
);
