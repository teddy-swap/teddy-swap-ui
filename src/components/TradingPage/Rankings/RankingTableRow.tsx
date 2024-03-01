import './styles.less';

import { Button, Flex } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { DotsIcon } from '../../common/Icons/DotsIcon';

interface RankingsTableRowProps {
  rank: number;
  testnetAddress: string;
  mainnetAddress: string;
  points: number;
  bonus: number;
  totalRewards: number;
}

export const RankingsTableRow: FC<RankingsTableRowProps> = ({
  bonus,
  points,
  mainnetAddress,
  rank,
  testnetAddress,
  totalRewards,
}) => {
  return (
    <Flex align="center" className="rankings-table-row" justify="space-between">
      <span>#{rank}</span>
      <span>{testnetAddress}</span>
      <span>{mainnetAddress}</span>
      <span>{points}</span>
      <span>{bonus}</span>
      <span className="total-rewards">
        {totalRewards} $TEDY
        <span>
          <Button size="small">
            <DotsIcon />
          </Button>
        </span>
      </span>
    </Flex>
  );
};
