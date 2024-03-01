import './styles.less';

import { Button, Flex, Typography } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { RankingsTable } from './RankingsTable';

export const Rankings: FC = () => {
  return (
    <Flex col className="rankings-container">
      <div className="radial-background" />
      <Flex align="flex-end" style={{ gap: '10px' }}>
        <Typography.Title level={1}>Rankings</Typography.Title>
        <Typography.Body size="large" strong style={{ color: '#26FFFF' }}>
          Live
        </Typography.Body>
      </Flex>
      <p className="rankings-description">
        The current ranking is for reference only. Data updated every 10
        minutes.The final ranking will be updated within 15 minutes after event
        ends.
      </p>
      <RankingsTable />

      <Button className="competetion-btn">Enter Competetion</Button>
    </Flex>
  );
};
