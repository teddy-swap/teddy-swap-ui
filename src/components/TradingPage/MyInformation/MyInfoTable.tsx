import './styles.less';

import { Button, Flex } from '@ergolabs/ui-kit';
import { FC } from 'react';

export const MyInfoTable: FC = () => {
  return (
    <Flex col className="info-table">
      <Flex
        align="center"
        className="info-table-header"
        // justify="space-between"
      >
        <span>Trading Volume</span>
        <span>Points</span>
        <span>Bonus</span>
        <span>Total Rewards</span>
        <Button size="large" className="trade-btn">
          Trade
        </Button>
      </Flex>
      <Flex align="center" className="info-table-row">
        <span>--</span>
        <span>--</span>
        <span>--</span>
        <span>--</span>
      </Flex>
    </Flex>
  );
};
