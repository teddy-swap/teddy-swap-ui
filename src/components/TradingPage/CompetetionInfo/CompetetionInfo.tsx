import './styles.less';

import { Flex, Typography } from '@ergolabs/ui-kit';
import { FC } from 'react';

export const CompetetionInfo: FC = () => {
  return (
    <Flex col className="comp-info-container">
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        TeddySwap Trading Competition
      </Typography.Title>
      <Flex col style={{ marginTop: '50px' }}>
        <Typography.Body className="info-para">
          {` As the chill of winter fades, giving way to the vibrant bloom of spring,
        we at TeddySwap are excited to share a warm update that has
        significantly heated up our product ecosystem. We're thrilled to
        announce the launch of our very first TeddySwap Trading Competition!`}
        </Typography.Body>
        <Typography.Body
          className="info-para"
          strong
          style={{ margin: '25px 0px' }}
        >
          Competition Dates: April 1 to May 1, 2024
        </Typography.Body>
        <Typography.Body className="info-para" strong>
          How to Participate:
        </Typography.Body>
        <ul className="info-list">
          <li className="info-para">Register with your wallet.</li>
          <li className="info-para">
            Start trading on TeddySwap DEX between April 1 and May 1 to
            accumulate points. All participants who opt in and execute at least
            one trade on TeddySwap during the promotional period stand a chance
            to win enticing prizes.
          </li>
        </ul>
        <Typography.Body
          className="info-para"
          strong
          style={{ marginTop: '35px' }}
        >
          Prizes:
        </Typography.Body>
        <Typography.Body className="info-para" style={{ marginBottom: '15px' }}>
          {` To elevate the excitement, we've allocated a total prize pool of 30,000 TEDY tokens! The top 10 scorers will earn their share from this hefty prize pool as follows:`}
        </Typography.Body>
        <ul className="info-list">
          <li className="info-para">1: 6,000 TEDY tokens</li>
          <li className="info-para">2: 3000 TEDY tokens</li>
          <li className="info-para">3: 2700 TEDY tokens</li>
          <li className="info-para">4: 2400 TEDY tokens</li>
          <li className="info-para">5: 2100 TEDY tokens</li>
          <li className="info-para">6: 1800 TEDY tokens</li>
          <li className="info-para">7: 1500 TEDY tokens</li>
          <li className="info-para">8: 1200 TEDY tokens</li>
          <li className="info-para">9: 900 TEDY tokens</li>
          <li className="info-para">10: 600 TEDY tokens</li>
        </ul>
        <Typography.Body className="info-para" style={{ marginTop: '15px' }}>
          {` Furthermore, to add a twist of fortune to the competition, 13 lucky participants will be randomly selected to receive a delightful amount of TEDY tokens each, ensuring that everyone has a shot at winning something extra.`}
        </Typography.Body>
        <Typography.Body
          className="info-para"
          strong
          style={{ marginTop: '50px', marginBottom: '15px' }}
        >
          Accumulating Points:
        </Typography.Body>
        <Typography.Body className="info-para">
          {`Your daily trading activities on TeddySwap DEX will be evaluated based on three criteria:`}
        </Typography.Body>
        <ul className="info-list">
          <li className="info-para">
            Trading Turnover: Total funds used for trading.
          </li>
          <li className="info-para">
            Number of Transactions: Total trades executed.
          </li>
          <li className="info-para">
            Number of Markets: Diversity of trading pairs engaged.
          </li>
        </ul>
        <Typography.Body className="info-para" style={{ margin: '25px 0' }}>
          {` Each day, you'll be ranked against other participants in these categories, with points ranging from 0 to 40 awarded based on your performance. Your daily points across all criteria will sum up to define your daily score, contributing to your total cumulative points and ranking on the leaderboard.`}
        </Typography.Body>
        <Typography.Body className="info-para" strong>
          Rules:
        </Typography.Body>
        <ul className="info-list">
          <li className="info-para">
            Your score resets to zero each trading day; no trades mean no
            points, potentially affecting your cumulative ranking. Consistency
            and endurance are key.
          </li>
          <li className="info-para">
            Only trades executed and filled during the competition will count
            towards your score.
          </li>
          <li className="info-para">
            All pairs available on TeddySwap DEX are eligible for trading in
            this competition.
          </li>
          <li className="info-para">
            Winners will be announced on our social media and Telegram by May 1,
            2024, and prizes credited within 14 business days thereafter.
          </li>
        </ul>
        <Typography.Body className="info-para" style={{ margin: '20px 0' }}>
          {`TeddySwap reserves the right to modify the competition's terms or dates without prior notice.`}
        </Typography.Body>
      </Flex>
    </Flex>
  );
};
