import { useDevice } from '@ergolabs/ui-kit';

import { OperationsHistory } from '../OperationsHistory/OperationsHistory';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import styles from './Header.module.less';
import Navigation from './Navigation/Navigation';

export default function Header() {
  const { s, moreThan, lessThan } = useDevice();

  return (
    <header className={styles.header}>
      <section className={styles.navigationSection}>
        {moreThan('l') ? (
          <img src="/img/logo/teddy-logo.png" height={26} />
        ) : lessThan('m') ? (
          <img src="/img/logo/teddy-logo.png" height={26} />
        ) : (
          <img src="/img/logo/teddy-logo-mob.png" height={26} />
        )}
        {!s && <Navigation />}
      </section>
      <section className={styles.walletSection}>
        <ConnectWallet />
        {!s && <OperationsHistory />}
      </section>
    </header>
  );
}
