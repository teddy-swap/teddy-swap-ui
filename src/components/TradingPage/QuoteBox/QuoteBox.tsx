import './styles.less';

import { Button, Flex, Typography, useDevice } from '@ergolabs/ui-kit';
import { FC } from 'react';

import Discord from '../../../assets/icons/social/DiscordWhite.svg';
import Medium from '../../../assets/icons/social/MediumWhite.svg';
import Reddit from '../../../assets/icons/social/RedditWhite.svg';
import Twitter from '../../../assets/icons/social/TwitterWhite.svg';

export const QuoteBox: FC = () => {
  const { s } = useDevice();

  const imgStyle = {
    transform: s ? 'scale(0.75)' : 'scale(1)',
  };

  return (
    <Flex col className="quote-container">
      <Typography.Title level={1}>
        Together, we drive financial freedom and opportunity to all
      </Typography.Title>
      <Typography.Body className="quote-text">
        Join a dedicated community and shape the future of finance -
        decentralized, non-custodial and efficient.
      </Typography.Body>
      <Flex.Item align="center" justify="center" className="btnIcon-container">
        <Button className="btnIcon">
          <img src={Twitter} alt="Twitter" style={imgStyle} />
        </Button>
        <Button className="btnIcon">
          <img src={Discord} alt="Discord" style={imgStyle} />
        </Button>
        <Button className="btnIcon">
          <img src={Reddit} alt="Reddit" style={imgStyle} />
        </Button>
        <Button className="btnIcon">
          <img src={Medium} alt="Medium" style={imgStyle} />
        </Button>
      </Flex.Item>
    </Flex>
  );
};
