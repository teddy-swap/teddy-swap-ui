import { Flex, Typography } from '@ergolabs/ui-kit';

import Discord from '../../../../assets/icons/social/Discord.svg';
import Medium from '../../../../assets/icons/social/Medium.svg';
import Telegram from '../../../../assets/icons/social/Telegram.svg';
import Twitter from '../../../../assets/icons/social/Twitter.svg';
import styles from './TradingFooter.module.less';
import { TradingFooterIcon } from './TradingFooterIcon';

export const TradingFooter = () => {
  return (
    <footer className={styles.tradingFooter}>
      <Flex col className={styles.logoContainer}>
        <Flex.Item>
          <img src="/img/logo/teddy-logo.png" alt="Teddy Logo" />
        </Flex.Item>
        <Flex.Item>
          <Typography.Body className={styles.logoText}>
            TeddySwap is a decentralized exchange and automated liquidity
            protocol for stablecoins.
          </Typography.Body>
        </Flex.Item>
      </Flex>

      <Flex col className={styles.footerNavigationContainer}>
        <Flex.Item>
          <Typography.Body className={styles.navHeading}>
            Teddy Swap
          </Typography.Body>
        </Flex.Item>
        <Flex col className={styles.linksContainer}>
          <Flex.Item>
            <Typography.Link className={styles.navLinks}>Docs</Typography.Link>
          </Flex.Item>
          <Flex.Item>
            <Typography.Link className={styles.navLinks}>
              News and Updates
            </Typography.Link>
          </Flex.Item>
          <Flex.Item>
            <Typography.Link className={styles.navLinks}>
              Tokenomics
            </Typography.Link>
          </Flex.Item>
        </Flex>
      </Flex>
      <Flex col className={styles.footerNavigationContainer}>
        <Flex.Item>
          <Typography.Body className={styles.navHeading}>
            Resources
          </Typography.Body>
        </Flex.Item>
        <Flex col className={styles.linksContainer}>
          <Flex.Item>
            <Typography.Link className={styles.navLinks}>
              Litepaper
            </Typography.Link>
          </Flex.Item>
        </Flex>
      </Flex>
      <Flex col className={styles.footerNavigationContainer}>
        <Flex.Item>
          <Typography.Body className={styles.navHeading}>
            Foundation
          </Typography.Body>
        </Flex.Item>
        <Flex col className={styles.linksContainer}>
          <Flex.Item>
            <Typography.Link className={styles.navLinks}>
              info@teddyswap.org
            </Typography.Link>
          </Flex.Item>
        </Flex>
      </Flex>
      <Flex col className={styles.footerNavigationContainer}>
        <div className={styles.iconsContainer}>
          <TradingFooterIcon icon={Twitter} />
          <TradingFooterIcon icon={Telegram} />
          <TradingFooterIcon icon={Discord} />
          <TradingFooterIcon icon={Medium} />
        </div>
        <Typography.Body className={styles.iconsText}>
          TeddySwap is a Malaysia based DAO.
        </Typography.Body>
      </Flex>
    </footer>
  );
};
