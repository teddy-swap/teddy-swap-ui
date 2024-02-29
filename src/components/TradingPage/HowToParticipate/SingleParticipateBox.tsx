import './styles.less';

import { Flex, useDevice } from '@ergolabs/ui-kit';
import { FC } from 'react';

export interface SingleParticipateBoxProps {
  description: string;
  scaled: boolean;
  image?: any;
}

export const SingleParticipateBox: FC<SingleParticipateBoxProps> = ({
  description,
  image,
  scaled,
}) => {
  const { s } = useDevice();

  return (
    <Flex
      col
      style={{ gap: '20px' }}
      align="center"
      justify="center"
      className="participatebox-container"
    >
      <Flex
        align="center"
        justify="center"
        className="participation-circle"
        style={{
          transform: scaled && !s ? 'scale(1.2)' : 'scale(1)',
          marginTop: scaled && !s ? '-50px' : '0px',
        }}
      >
        <Flex.Item align="center" justify="center">
          <img
            src={image}
            alt={'Elephant'}
            style={{ width: '100%', height: '100%' }}
          />
        </Flex.Item>
      </Flex>
      <span
        style={{
          marginTop: scaled && !s ? '60px' : '0px',
        }}
      >
        {description}
      </span>
    </Flex>
  );
};
