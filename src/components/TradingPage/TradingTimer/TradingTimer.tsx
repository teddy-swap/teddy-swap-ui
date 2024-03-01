import { Flex, Typography } from '@ergolabs/ui-kit';
import { FC } from 'react';

import SingleTimerBlock from './SingleTimeBlock';

const TradingTimer: FC = () => {
  return (
    <Flex className="timer-container" align="center">
      <Flex.Item>
        <SingleTimerBlock time={'00'} />
      </Flex.Item>
      <Flex.Item>
        <Typography.Title level={2}>:</Typography.Title>
      </Flex.Item>
      <Flex.Item>
        <SingleTimerBlock time={'00'} />
      </Flex.Item>
      <Flex.Item>
        <Typography.Title level={2}>:</Typography.Title>
      </Flex.Item>
      <Flex.Item>
        <SingleTimerBlock time={'00'} />
      </Flex.Item>
      <Flex.Item>
        <Typography.Title level={2}>:</Typography.Title>
      </Flex.Item>
      <Flex.Item>
        <SingleTimerBlock time={'00'} />
      </Flex.Item>
    </Flex>
  );
};

export default TradingTimer;
