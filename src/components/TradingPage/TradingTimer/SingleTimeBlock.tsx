import './styles.less';

import { Flex } from '@ergolabs/ui-kit';
import { FC } from 'react';

interface SingleTimerBlockProps {
  time: string;
}

const SingleTimerBlock: FC<SingleTimerBlockProps> = ({ time }) => {
  return (
    <Flex align="center" justify="center" className="singleTimerBlock">
      <span>{time}</span>
    </Flex>
  );
};

export default SingleTimerBlock;
