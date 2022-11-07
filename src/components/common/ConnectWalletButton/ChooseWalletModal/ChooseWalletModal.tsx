import {
  Button,
  Flex,
  Modal,
  ModalRef,
  Tabs,
  useDevice,
} from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import React, { ReactNode, useState } from 'react';
import { noop } from 'rxjs';
import styled from 'styled-components';

import { panalytics } from '../../../../common/analytics';
import { useObservable } from '../../../../common/hooks/useObservable';
import {
  connectWallet,
  selectedWallet$,
  wallets$,
} from '../../../../gateway/api/wallets';
import { useSelectedNetwork } from '../../../../gateway/common/network';
import { Wallet } from '../../../../network/common/Wallet';
import { ErgoPayTabPaneContent } from '../../../../network/ergo/widgets/ErgoPayModal/ErgoPayTabPaneContent/ErgoPayTabPaneContent';
import { ProtocolDisclaimerAlert } from './ProtocolDisclaimerAlert/ProtocolDisclaimerAlert';

interface WalletItemProps {
  wallet: Wallet;
  close: (result?: boolean) => void;
  isChangeWallet?: boolean;
}

const WalletButton = styled(Button)`
  align-items: center;
  display: flex;
  height: 4rem;
  width: 100%;

  &:disabled,
  &:disabled:hover {
    border-color: var(--spectrum-default-border-color) !important;
    filter: grayscale(1);

    span {
      color: var(--spectrum-default-border-color) !important;
    }
  }
`;

const WalletView: React.FC<WalletItemProps> = ({ wallet, close }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [, setWarning] = useState<ReactNode | undefined>(undefined);

  const handleClick = () => {
    setLoading(true);
    connectWallet(wallet).subscribe(
      (isConnected) => {
        setLoading(false);
        if (typeof isConnected === 'boolean' && isConnected) {
          panalytics.connectWallet(wallet.name, {
            set: { active_wallet: wallet.name },
            setOnce: { first_wallet: wallet.name },
          });

          close(true);
        } else if (isConnected) {
          panalytics.connectWalletError(wallet.name);
          setWarning(isConnected);
        }
      },
      () => {
        setLoading(false);
        panalytics.connectWalletInstallExtension(wallet.name);
        window.open(wallet.extensionLink);
      },
    );
  };

  return (
    <>
      <WalletButton size="large" onClick={handleClick} loading={loading}>
        <Flex.Item flex={1} display="flex" align="center">
          {wallet.name}
        </Flex.Item>
        {wallet.icon}
      </WalletButton>
    </>
  );
};

type ChooseWalletModalProps = ModalRef<boolean>;

const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
  close,
}): JSX.Element => {
  const [wallets] = useObservable(wallets$, [], []);

  const [selectedWallet] = useObservable(selectedWallet$);
  const [selectedNetwork] = useSelectedNetwork();

  const { s } = useDevice();
  return (
    <>
      <Modal.Title>
        <Trans>Select a wallet</Trans>
      </Modal.Title>
      <Modal.Content maxWidth={480} width="100%">
        <Tabs fullWidth>
          {selectedNetwork.name === 'ergo' && s ? (
            <Tabs.TabPane tab={<Trans>ErgoPay</Trans>} key="ergopayMobile">
              <ErgoPayTabPaneContent close={close} />
            </Tabs.TabPane>
          ) : null}
          <Tabs.TabPane
            tab={<Trans>Browser wallet</Trans>}
            key="browse_wallets"
          >
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
          </Tabs.TabPane>
          {selectedNetwork.name === 'ergo' && !s ? (
            <Tabs.TabPane tab={<Trans>ErgoPay</Trans>} key="ergopayDesktop">
              <ErgoPayTabPaneContent close={close} />
            </Tabs.TabPane>
          ) : null}
        </Tabs>
      </Modal.Content>
    </>
  );
};

export { ChooseWalletModal };
