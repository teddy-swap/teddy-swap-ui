import { Flex } from '@ergolabs/ui-kit';

import WhiteSun from '../../../assets/icons/icon-white-sun.svg';
import { TOKEN_TEDY } from '../../../utils/images';
import styles from './CoinDetailsCard.module.less';

export const CoinDetailsCard = () => {
  return (
    <div className={styles.coinDetailsCard}>
      <div className={styles.left}>
        <div className={styles.coinWithTitle}>
          <img
            width={36}
            height={36}
            className={styles.coinImage}
            src={TOKEN_TEDY}
            alt={'coin'}
          />
          <div className={styles.title}>TEDY Token</div>
        </div>
        <div className={styles.leftBottom}>
          <div className={styles.subTitle}>1 week EPS:</div>

          {/* Progressbar */}
          <div className={styles.progressbarContainer}>
            {/* progressbar top text */}
            <div className={styles.progressbarTopText}>
              <Flex align="center" gap={1}>
                <img
                  className={styles.sunImage}
                  src={WhiteSun}
                  alt="shite sun"
                  width={15}
                  height={15}
                />
                <div className={styles.title}>₳0.003412</div>
              </Flex>
              <div className={styles.subTitle}>ATH</div>
            </div>
            {/* actual progress bar */}
            <div className={styles.progressBarBG}>
              <div className={styles.progressBarProgress} />
            </div>
          </div>
        </div>
      </div>
      <Flex gap={4} direction="col" className={styles.right}>
        <div>
          <div className={styles.subTitle}>Max Supply:</div>
          <div className={styles.title}>5,000,000,000 TEDY</div>
        </div>

        <div>
          <div className={styles.subTitle}>Public Allocation:</div>
          <div className={styles.title}>85%</div>
        </div>

        <div>
          <div className={styles.subTitle}>Earnings Per Share All Time:</div>
          <div className={styles.title}>0.034 ADA / 1 TEDY</div>
        </div>
      </Flex>
    </div>
  );
};
