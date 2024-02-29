import './styles.less';

import { Flex } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { RankingsData } from './RankingsData';
import { RankingsTableHeader } from './RankingsTableHeader';
import { RankingsTableRow } from './RankingTableRow';

export const RankingsTable: FC = () => {
  return (
    <Flex col className="rankings-table">
      <RankingsTableHeader />
      <Flex col className="rankings-table-body">
        {RankingsData.map((data, index) => {
          return <RankingsTableRow key={index} {...data} />;
        })}
        H
      </Flex>
    </Flex>
  );
};
