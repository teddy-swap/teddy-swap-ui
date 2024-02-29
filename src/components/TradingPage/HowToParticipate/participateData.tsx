import Dolphin from '../../../assets/images/dolphin.png';
import Elephant from '../../../assets/images/elepahant.png';
import Jaguar from '../../../assets/images/jaguar.png';
import { SingleParticipateBoxProps } from './SingleParticipateBox';

export const participateData: SingleParticipateBoxProps[] = [
  {
    description: 'Register with your Cardano Wallet',
    image: Elephant,
    scaled: false,
  },
  {
    description: 'Start trading on TeddySwap',
    image: Jaguar,
    scaled: true,
  },
  {
    description: 'Share on on X to get more points',
    image: Dolphin,
    scaled: false,
  },
];
