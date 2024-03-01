import { Flex } from '@ergolabs/ui-kit';

export const RankingsTableHeader = () => {
  return (
    <Flex align="center" className="rankings-table-header">
      <span>Rank</span>
      <span>Testnet Address</span>
      <span>Mainnet Address</span>
      <span>Points</span>
      <span>Bonus</span>
      <span>Total Rewards</span>
    </Flex>
  );
};
