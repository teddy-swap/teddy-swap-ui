import { ButtonProps, Modal } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
} from '@mui/material';
import cn from 'classnames';
import React, { FC, ReactNode, useState } from 'react';

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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const theme = useTheme();
  const [isWalletConnected] = useObservable(isWalletSetuped$);
  const openChooseWalletModal = (): void => {
    Modal.open(({ close }) => <ChooseWalletModal close={close} />);

    if (analytics && analytics.location) {
      panalytics.openConnectWalletModal(analytics.location);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            fontWeight: 'bold',
          }}
        >
          <div className="flex">Select a wallet</div>
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            padding: 0,
          }}
        >
          <ChooseWalletModal
            close={() => {
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      {!isWalletConnected && (
        <Button
          variant="contained"
          onClick={() => setIsDialogOpen(true)}
          className={cn(className, '!font-bold')}
        >
          <Trans>Swap</Trans>
        </Button>
      )}
      {isWalletConnected && <>{children}</>}
    </>
  );
};
