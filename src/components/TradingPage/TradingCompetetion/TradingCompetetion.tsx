import './styles.less';

import { Button, Flex, Typography } from '@ergolabs/ui-kit';
import { FC } from 'react';

import SharkImage from '../../../assets/images/1255.png';
import TradingTimer from '../TradingTimer/TradingTimer';

export const TradingCompetetion: FC = () => {
  return (
    <Flex
      align="flex-start"
      justify="space-between"
      className="trading-competetion-container"
    >
      <div className="radial-background" />
      <Flex col className="heading-container">
        <Typography.Title className="trading-title">
          Trading Competition
        </Typography.Title>
        <p className="trading-para">
          Activity Period 2022/04/01 00:00:00 - 2022/05/01 00:00:00 (UTC)
          Activity Ends
        </p>
        <TradingTimer />
        <Button size="large" className="trade-btn">
          Trade
        </Button>
      </Flex>

      <img className="shark-image" src={SharkImage} alt="Shark" />
    </Flex>
  );
};

// import { FunctionComponent } from 'react';

// import styles from './styles.module.css';

// export const TradingCompetetion: FunctionComponent = () => {
//   return (
//     <div className={styles.winLeaderboard}>
//       <div className={styles.header}>
//         <div className={styles.logoV12Wrapper}>
//           <div className={styles.logoV12} />
//         </div>
//         <div className={styles.groupHeader}>
//           <img
//             className={styles.groupHeaderChild}
//             alt=""
//             src="/group-2753.svg"
//           />
//           <div className={styles.trade}>Trade</div>
//           <div className={styles.liquidity}>Liquidity</div>
//           <div className={styles.farm}>Farm</div>
//           <div className={styles.dashboard}>Dashboard</div>
//           <div className={styles.tradingCompetition}>Trading Competition</div>
//           <div className={styles.groupHeaderItem} />
//           <div className={styles.groupHeaderInner} />
//           <div className={styles.rectangleDiv} />
//           <div className={styles.div}>9,386.5863 ₳</div>
//           <div className={styles.groupHeaderChild1} />
//           <div className={styles.addr1qx6lyz1h}>addr1...qx6lyz1h</div>
//           <img className={styles.img1Icon} alt="" src="/img1@2x.png" />
//           <div className={styles.rectangleParent}>
//             <div className={styles.groupChild} />
//             <div className={styles.groupItem} />
//             <div className={styles.ada}>ADA</div>
//             <div className={styles.usd}>USD</div>
//           </div>
//         </div>
//         <div className={styles.rectangleGroup}>
//           <div className={styles.groupInner} />
//           <img className={styles.arrowBackIcon} alt="" src="/arrow-back.svg" />
//         </div>
//         <img className={styles.historyIcon} alt="" src="/history.svg" />
//         <img className={styles.settingsIcon} alt="" src="/settings.svg" />
//       </div>
//       <div className={styles.myInformation}>My Information</div>
//       <div className={styles.winLeaderboardChild} />
//       <div className={styles.winLeaderboardItem} />
//       <div className={styles.tradingVolume}>Trading Volume</div>
//       <div className={styles.points}>Points</div>
//       <div className={styles.bonus}>Bonus</div>
//       <div className={styles.totalRewards}>Total Rewards</div>
//       <div className={styles.rectangleContainer}>
//         <div className={styles.groupChild1} />
//         <div className={styles.trade1}>Trade</div>
//       </div>
//       <div className={styles.div1}>--</div>
//       <div className={styles.div2}>--</div>
//       <div className={styles.div3}>--</div>
//       <div className={styles.div4}>--</div>
//       <div className={styles.winLeaderboardInner} />
//       <div className={styles.vectorParent}>
//         <img className={styles.vectorIcon} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon1} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon2} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon3} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon4} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon5} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon6} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon7} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon8} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon9} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon10} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon11} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon12} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon13} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon14} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon15} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon16} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon17} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon18} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon19} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon20} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon21} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon22} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon23} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon24} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon25} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon26} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon27} alt="" src="/vector.svg" />
//         <div className={styles.p}>
//           <div className={styles.teddyswapIsAContainer}>
//             <span className={styles.teddyswapIsAContainer1}>
//               <p className={styles.teddyswapIsA}>
//                 TeddySwap is a decentralized
//               </p>
//               <p className={styles.teddyswapIsA}>
//                 exchange and automated liquidity
//               </p>
//               <p className={styles.teddyswapIsA}>protocol for stablecoins.</p>
//             </span>
//           </div>
//         </div>
//         <div className={styles.teddyswap}>TeddySwap</div>
//         <div className={styles.ul}>
//           <div className={styles.docs}>Docs</div>
//           <div className={styles.newsAndUpdates}>News and Updates</div>
//           <div className={styles.tokenomics}>Tokenomics</div>
//         </div>
//         <div className={styles.resources}>Resources</div>
//         <div className={styles.litepaper}>Litepaper</div>
//         <div className={styles.foundation}>Foundation</div>
//         <div className={styles.infoteddyswaporg}>info@teddyswap.org</div>
//         <img className={styles.vectorIcon28} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon29} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon30} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon31} alt="" src="/vector.svg" />
//         <img className={styles.vectorIcon32} alt="" src="/vector.svg" />
//         <div className={styles.p1}>
//           <div className={styles.teddyswapIsAContainer2}>
//             <span className={styles.teddyswapIsAContainer1}>
//               <p className={styles.teddyswapIsA}>TeddySwap is a Malaysia</p>
//               <p className={styles.teddyswapIsA}>based DAO.</p>
//             </span>
//           </div>
//         </div>
//       </div>
//       <div className={styles.div5}>
//         <div className={styles.div6}>
//           <div className={styles.togetherWeDrive}>
//             Together, we drive financial freedom and opportunity to all
//           </div>
//           <div className={styles.joinADedicated}>
//             Join a dedicated community and shape the future of finance -
//             decentralized, non-custodial and efficient.
//           </div>
//         </div>
//         <div className={styles.div7}>
//           <img className={styles.svgIcon} alt="" src="/svg.svg" />
//           <img className={styles.svgIcon1} alt="" src="/svg.svg" />
//           <img className={styles.svgIcon2} alt="" src="/svg.svg" />
//           <img className={styles.svgIcon3} alt="" src="/svg.svg" />
//         </div>
//       </div>
//       <div className={styles.pseudo} />
//       <img className={styles.icon} alt="" src="/1255@2x.png" />
//       <div className={styles.pseudo1} />
//       <div className={styles.pseudo2} />
//       <div className={styles.groupDiv}>
//         <div className={styles.groupChild2} />
//         <div className={styles.enterCompetition}>Enter Competition!</div>
//       </div>
//       <div className={styles.theCurrentRanking}>
//         The current ranking is for reference only. Data updated every 10
//         minutes.The final ranking will be updated within 15 minutes after event
//         ends.
//       </div>
//       <div className={styles.rankings}>Rankings</div>
//       <div className={styles.live}>Live</div>
//       <div className={styles.groupParent}>
//         <img className={styles.groupIcon} alt="" src="/group-2860.svg" />
//         <div className={styles.groupChild3} />
//         <div className={styles.div8}>1</div>
//         <div className={styles.groupChild4} />
//         <div className={styles.div9}>2</div>
//         <div className={styles.groupChild5} />
//         <div className={styles.div10}>3</div>
//         <div className={styles.groupChild6} />
//         <div className={styles.div11}>4</div>
//         <div className={styles.groupChild7} />
//         <div className={styles.div12}>5</div>
//         <img
//           className={styles.rectangleIcon}
//           alt=""
//           src="/rectangle-2731.svg"
//         />
//         <div className={styles.div13}>28</div>
//         <img className={styles.moreHorizIcon} alt="" src="/more-horiz.svg" />
//         <img
//           className={styles.arrowBackIosIcon}
//           alt=""
//           src="/arrow-back-ios.svg"
//         />
//         <div className={styles.groupChild8} />
//         <div className={styles.groupChild9} />
//         <div className={styles.pointsParent}>
//           <div className={styles.points1}>Points</div>
//           <div className={styles.testnetAddress}>Testnet Address</div>
//           <div className={styles.rank}>Rank</div>
//           <div className={styles.bonus1}>Bonus</div>
//           <div className={styles.totalRewards1}>Total Rewards</div>
//           <div className={styles.mainnetAddress}>Mainnet Address</div>
//         </div>
//         <div className={styles.addr1qyxe7da0jssah}>addr1qyxe...7da0jssah</div>
//         <div className={styles.div14}>1254</div>
//         <div className={styles.div15}>#2</div>
//         <div className={styles.div16}>1254</div>
//         <div className={styles.tedy}>3000 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssah1}>addr1qyxe...7da0jssah</div>
//         <img
//           className={styles.groupChild10}
//           alt=""
//           src="/group-1000004882@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div17}>1254</div>
//         <div className={styles.div18}>#3</div>
//         <div className={styles.div19}>1254</div>
//         <div className={styles.tedy1}>2700 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae1}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild11}
//           alt=""
//           src="/group-1000004881@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae2}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div20}>1254</div>
//         <div className={styles.div21}>#4</div>
//         <div className={styles.div22}>1254</div>
//         <div className={styles.tedy2}>2400 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae3}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild12}
//           alt=""
//           src="/group-1000004880@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae4}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div23}>1254</div>
//         <div className={styles.div24}>#5</div>
//         <div className={styles.div25}>1254</div>
//         <div className={styles.tedy3}>2100 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae5}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild13}
//           alt=""
//           src="/group-1000004879@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae6}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div26}>1254</div>
//         <div className={styles.div27}>#6</div>
//         <div className={styles.div28}>1254</div>
//         <div className={styles.tedy4}>1800 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae7}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild14}
//           alt=""
//           src="/group-1000004878@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae8}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div29}>1254</div>
//         <div className={styles.div30}>#7</div>
//         <div className={styles.div31}>1254</div>
//         <div className={styles.tedy5}>1500 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae9}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild15}
//           alt=""
//           src="/group-1000004877@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae10}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div32}>1254</div>
//         <div className={styles.div33}>#8</div>
//         <div className={styles.div34}>1254</div>
//         <div className={styles.tedy6}>1,200 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae11}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild16}
//           alt=""
//           src="/group-1000004876@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae12}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div35}>1254</div>
//         <div className={styles.div36}>#9</div>
//         <div className={styles.div37}>1254</div>
//         <div className={styles.tedy7}>900 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae13}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild17}
//           alt=""
//           src="/group-1000004875@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssae14}>addr1qyxe...7da0jssae</div>
//         <div className={styles.div38}>1254</div>
//         <div className={styles.div39}>#10</div>
//         <div className={styles.div40}>1254</div>
//         <div className={styles.tedy8}>600 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssae15}>addr1qyxe...7da0jssae</div>
//         <img
//           className={styles.groupChild18}
//           alt=""
//           src="/group-1000004874@2x.png"
//         />
//         <div className={styles.addr1qyxe7da0jssah2}>addr1qyxe...7da0jssah</div>
//         <div className={styles.div41}>1254</div>
//         <div className={styles.div42}>#1</div>
//         <div className={styles.div43}>1254</div>
//         <div className={styles.tedy9}>6000 $TEDY</div>
//         <div className={styles.addr1qyxe7da0jssah3}>addr1qyxe...7da0jssah</div>
//         <img
//           className={styles.groupChild19}
//           alt=""
//           src="/group-1000004883@2x.png"
//         />
//       </div>
//       <div className={styles.howToParticipate}>How to participate</div>
//       <div className={styles.startTradingOn}>Start trading on TeddySwap</div>
//       <div className={styles.registerWithYour}>
//         Register with your Cardano Wallet
//       </div>
//       <div className={styles.shareOnOn}>Share on on X to get more points</div>
//       <img
//         className={styles.winLeaderboardChild1}
//         alt=""
//         src="/group-1000004900.svg"
//       />
//       <img
//         className={styles.winLeaderboardChild2}
//         alt=""
//         src="/group-1000004901.svg"
//       />
//       <img
//         className={styles.winLeaderboardChild3}
//         alt=""
//         src="/group-1000004899.svg"
//       />
//       <b className={styles.heading1}>TeddySwap Trading Competition</b>
//       <div className={styles.asTheChillContainer}>
//         <span className={styles.teddyswapIsAContainer1}>
//           <p className={styles.teddyswapIsA}>
//             {`As the chill of winter fades, giving way to the vibrant bloom of
//             spring, we at TeddySwap are excited to share a warm update that has
//             significantly heated up our product ecosystem. We're thrilled to
//             announce the launch of our very first TeddySwap Trading Competition!`}
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             <b>Competition Dates: April 1 to May 1, 2024</b>
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             <b>How to Participate:</b>
//           </p>
//           <ul className={styles.registerWithYourWalletSta}>
//             <li className={styles.registerWithYourWallet}>
//               <span>Register with your wallet.</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 Start trading on TeddySwap DEX between April 1 and May 1 to
//                 accumulate points.
//               </span>
//             </li>
//           </ul>
//           <p className={styles.teddyswapIsA}>
//             All participants who opt in and execute at least one trade on
//             TeddySwap during the promotional period stand a chance to win
//             enticing prizes.
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             <b>Prizes:</b>
//           </p>
//           <p className={styles.teddyswapIsA}>
//             {`To elevate the excitement, we've allocated a total prize pool of
//             30,000 TEDY tokens! The top 10 scorers will earn their share from
//             this hefty prize pool as follows:`}
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <ul className={styles.registerWithYourWalletSta}>
//             <li className={styles.registerWithYourWallet}>
//               <span>1: 6,000 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>2: 3000 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>3: 2700 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>4: 2400 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>5: 2100 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>6: 1800 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>7: 1500 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>8: 1200 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>9:   900 TEDY tokens</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>10: 600 TEDY tokens</span>
//             </li>
//           </ul>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             Furthermore, to add a twist of fortune to the competition, 13 lucky
//             participants will be randomly selected to receive a delightful
//             amount of TEDY tokens each, ensuring that everyone has a shot at
//             winning something extra.
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             <b>Accumulating Points:</b>
//           </p>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             Your daily trading activities on TeddySwap DEX will be evaluated
//             based on three criteria:
//           </p>
//           <ul className={styles.registerWithYourWalletSta}>
//             <li className={styles.registerWithYourWallet}>
//               <span>Trading Turnover: Total funds used for trading.</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>Number of Transactions: Total trades executed.</span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 Number of Markets: Diversity of trading pairs engaged.
//               </span>
//             </li>
//           </ul>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             {`Each day, you'll be ranked against other participants in these
//             categories, with points ranging from 0 to 40 awarded based on your
//             performance. Your daily points across all criteria will sum up to
//             define your daily score, contributing to your total cumulative
//             points and ranking on the leaderboard.`}
//           </p>
//           <p className={styles.teddyswapIsA}>
//             <b>&nbsp;</b>
//           </p>
//           <p className={styles.teddyswapIsA}>
//             <b>Rules:</b>
//           </p>
//           <ul className={styles.registerWithYourWalletSta}>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 Your score resets to zero each trading day; no trades mean no
//                 points, potentially affecting your cumulative ranking.
//                 Consistency and endurance are key.
//               </span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 Only trades executed and filled during the competition will
//                 count towards your score.
//               </span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 All pairs available on TeddySwap DEX are eligible for trading in
//                 this competition.
//               </span>
//             </li>
//             <li className={styles.registerWithYourWallet}>
//               <span>
//                 Winners will be announced on our social media and Telegram by
//                 May 1, 2024, and prizes credited within 14 business days
//                 thereafter.
//               </span>
//             </li>
//           </ul>
//           <p className={styles.teddyswapIsA}>&nbsp;</p>
//           <p className={styles.teddyswapIsA}>
//             {`TeddySwap reserves the right to modify the competition's terms or
//             dates without prior notice.`}
//           </p>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default WinLeaderboard;
