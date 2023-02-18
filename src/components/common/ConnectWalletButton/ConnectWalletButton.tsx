import { ButtonProps, Modal } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactNode } from 'react';

import { panalytics } from '../../../common/analytics';
import { PAnalytics } from '../../../common/analytics/@types/types';
import { useObservable } from '../../../common/hooks/useObservable';
import { isWalletSetuped$ } from '../../../gateway/api/wallets';
import { ChooseWalletModal } from './ChooseWalletModal/ChooseWalletModal';

export interface ConnectWalletButtonProps {
  readonly size?: ButtonProps['size'];
  readonly className?: string;
  readonly children?: ReactNode | ReactNode[] | string;
  readonly analytics?: PAnalytics;
}

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  size,
  className,
  children,
  analytics,
}) => {
  const [isWalletConnected] = useObservable(isWalletSetuped$);
  const openChooseWalletModal = (): void => {
    Modal.open(({ close }) => <ChooseWalletModal close={close} />);

    if (analytics && analytics.location) {
      panalytics.openConnectWalletModal(analytics.location);
    }
  };

  return (
    <>
      {!isWalletConnected && (
        <Button
          variant="contained"
          onClick={openChooseWalletModal}
          className={cn(className, '!font-bold')}
        >
          <Trans>Connect wallet</Trans>
        </Button>
      )}
      {isWalletConnected && <>{children}</>}
      {/* <SpectrumConnectWalletButton
        size={size}
        onClick={openChooseWalletModal}
        className={cn(className, 'connect-wallet-btn')}
        isWalletConnected={isWalletConnected}
        caption={<Trans>Connect wallet</Trans>}
      >
        {children}
      </SpectrumConnectWalletButton> */}
    </>
  );
};
