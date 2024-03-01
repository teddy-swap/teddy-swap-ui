import { TradingFooter } from '../../components/common/Layout/TradingFooter/TradingFooter';
import { CompetetionInfo } from '../../components/TradingPage/CompetetionInfo/CompetetionInfo';
import { HowToParticipate } from '../../components/TradingPage/HowToParticipate/HowToParticipate';
import { MyInformation } from '../../components/TradingPage/MyInformation/MyInformation';
import { QuoteBox } from '../../components/TradingPage/QuoteBox/QuoteBox';
import { Rankings } from '../../components/TradingPage/Rankings/Rankings';
import { TradingCompetetion } from '../../components/TradingPage/TradingCompetetion/TradingCompetetion';

export const Trading = (): JSX.Element => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <TradingCompetetion />
      <HowToParticipate />
      <MyInformation />
      <Rankings />
      <CompetetionInfo />
      <QuoteBox />
      <TradingFooter />
    </div>
  );
};
