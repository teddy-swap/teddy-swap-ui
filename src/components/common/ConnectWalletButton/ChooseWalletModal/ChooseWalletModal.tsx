import { Flex, Modal, ModalRef, Tabs, useDevice } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Alert, Button, Snackbar, useTheme } from '@mui/material';
import React, { useState } from 'react';

import { panalytics } from '../../../../common/analytics';
import { useObservable } from '../../../../common/hooks/useObservable';
import {
  connectWallet,
  selectedWallet$,
  wallets$,
} from '../../../../gateway/api/wallets';
import { Wallet } from '../../../../network/common/Wallet';
import { ErgoPayTabPaneContent } from '../../../../network/ergo/widgets/ErgoPayModal/ErgoPayTabPaneContent/ErgoPayTabPaneContent';
import { IsCardano } from '../../../IsCardano/IsCardano';
import { IsErgo } from '../../../IsErgo/IsErgo';
import { ProtocolDisclaimerAlert } from './ProtocolDisclaimerAlert/ProtocolDisclaimerAlert';

interface WalletItemProps {
  wallet: Wallet;
  close: (result?: boolean) => void;
}

const WalletView: React.FC<WalletItemProps> = ({ wallet, close }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const q = () => {
    setLoading(true);
    connectWallet(wallet).subscribe(
      (isConnected) => {
        setLoading(false);
        if (typeof isConnected === 'boolean' && isConnected) {
          panalytics.connectWallet(wallet.name);
          close(true);
        } else if (typeof isConnected === 'boolean' && !isConnected) {
          setIsSnackbarOpen(true);
        }
      },
      () => {
        setLoading(false);
        panalytics.connectWalletInstallExtension(wallet.name);
        window.open(wallet.extensionLink);
      },
    );
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          Make sure you are connected to the correct Cardano Network!
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        endIcon={wallet.icon}
        sx={{
          background: theme.palette.background.default,
          '& span': {
            position: 'absolute',
            right: '20px',
          },
        }}
        className="w-full !normal-case !justify-start !text-[16px] relative"
        size="large"
        onClick={q}
        disabled={loading}
      >
        {!loading ? wallet.name : 'Connecting, please wait...'}
      </Button>
    </>
  );
};

type ChooseWalletModalProps = ModalRef<boolean>;

const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
  close,
}): JSX.Element => {
  const [wallets] = useObservable(wallets$, [], []);

  const [selectedWallet] = useObservable(selectedWallet$);

  const walletTab = (
    <Flex.Item marginTop={5} display="flex" col>
      <Flex.Item marginBottom={4}>
        <ProtocolDisclaimerAlert />
      </Flex.Item>
      {wallets
        .filter((w) => !w.hidden)
        .map((wallet, index) => (
          <Flex.Item
            marginBottom={
              index === wallets.length - 1 && !selectedWallet ? 0 : 4
            }
            key={index}
          >
            <WalletView close={close} wallet={wallet} />
          </Flex.Item>
        ))}
    </Flex.Item>
  );

  const { s } = useDevice();
  return (
    <>
      <Modal.Title>
        <Trans>Select a wallet</Trans>
      </Modal.Title>
      <Modal.Content maxWidth={480} width="100%">
        <IsErgo>
          <Tabs fullWidth>
            {s ? (
              <Tabs.TabPane tab={<Trans>ErgoPay</Trans>} key="ergopayMobile">
                <ErgoPayTabPaneContent close={close} />
              </Tabs.TabPane>
            ) : null}
            <Tabs.TabPane
              tab={<Trans>Browser wallet</Trans>}
              key="browse_wallets"
            >
              {walletTab}
            </Tabs.TabPane>
            {!s ? (
              <Tabs.TabPane tab={<Trans>ErgoPay</Trans>} key="ergopayDesktop">
                <ErgoPayTabPaneContent close={close} />
              </Tabs.TabPane>
            ) : null}
          </Tabs>
        </IsErgo>
        <IsCardano>{walletTab}</IsCardano>
      </Modal.Content>
    </>
  );
};

export { ChooseWalletModal };
