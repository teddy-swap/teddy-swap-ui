import { Flex } from '@ergolabs/ui-kit';
import { Chip } from '@mui/material';
import React, { FC } from 'react';

import { AmmPool } from '../../../../../../../common/models/AmmPool';

export interface AprColumnProps {
  readonly ammPool: AmmPool;
}

export const AprColumn: FC<AprColumnProps> = ({ ammPool }) => (
  <Flex>
    <Chip
      label={ammPool?.yearlyFeesPercent ? `${ammPool.yearlyFeesPercent}%` : '—'}
    />
  </Flex>
);
