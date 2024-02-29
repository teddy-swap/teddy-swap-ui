import './styles.less';

import { Flex } from '@ergolabs/ui-kit';
import { FC } from 'react';

import { participateData } from './participateData';
import { SingleParticipateBox } from './SingleParticipateBox';

export const HowToParticipate: FC = () => {
  return (
    <Flex col className="howtoParticipate-container">
      <div className="radial-background" />
      <Flex align="center" justify="center">
        <h1 style={{ textAlign: 'center' }} className="heading-container">
          How to participate
        </h1>
      </Flex>
      <Flex
        align="center"
        className="participate-container"
        justify="space-between"
      >
        {participateData.map((val, ind) => {
          return (
            <Flex.Item key={ind}>
              <SingleParticipateBox {...val} />
            </Flex.Item>
          );
        })}
      </Flex>
    </Flex>
  );
};
