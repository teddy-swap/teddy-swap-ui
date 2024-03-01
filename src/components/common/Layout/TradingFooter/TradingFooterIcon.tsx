import { FC } from 'react';

import styles from './TradingFooter.module.less';

interface TradingFooterIconProps {
  icon: string;
  href?: string;
}

export const TradingFooterIcon: FC<TradingFooterIconProps> = ({ icon }) => {
  return (
    <button className={styles.footerIconButton}>
      <a href="/">
        <img src={icon} alt="icon" />
      </a>
    </button>
  );
};
