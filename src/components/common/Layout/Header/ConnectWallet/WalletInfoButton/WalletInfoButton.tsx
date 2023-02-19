import { Button, Flex, Modal, useDevice } from '@ergolabs/ui-kit';
import { Dialog, DialogContent, DialogTitle, useTheme } from '@mui/material';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { panalytics } from '../../../../../../common/analytics';
import { useObservable } from '../../../../../../common/hooks/useObservable';
import { networkAssetBalance$ } from '../../../../../../gateway/api/networkAssetBalance';
import { selectedWallet$ } from '../../../../../../gateway/api/wallets';
import { settings$ } from '../../../../../../gateway/settings/settings';
import { WalletModal } from '../../../../../WalletModal/WalletModal';
import { AddressTag } from './AddressTag/AddressTag';
import { BalanceView } from './BalanceView/BalanceView';

export interface WalletInfoButtonProps {
  className?: string;
}

const _WalletInfoButton: FC<WalletInfoButtonProps> = ({ className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const theme = useTheme();
  const [networkAssetBalance] = useObservable(networkAssetBalance$);
  const [settings] = useObservable(settings$);
  const [selectedWallet] = useObservable(selectedWallet$);
  const openWalletModal = () =>
    Modal.open(({ close }) => <WalletModal close={close} />);
  const { s } = useDevice();

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth={true}
      >
        <DialogTitle
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            fontWeight: 'bold',
          }}
        >
          <div className="flex">
            {selectedWallet?.icon}
            <span className="ml-4">{selectedWallet?.name}</span>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            color: theme.palette.text.primary,
            background: theme.palette.secondary.dark,
            padding: 0,
          }}
        >
          <WalletModal
            close={() => {
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Button
        className={className}
        onClick={() => {
          setIsDialogOpen(true);
          panalytics.openWalletModal();
        }}
        size="large"
      >
        <Flex align="center" stretch>
          {!s &&
            networkAssetBalance !== undefined &&
            networkAssetBalance.amount > 0n && (
              <>
                <Flex.Item marginLeft={1} marginRight={2}>
                  <BalanceView
                    balance={networkAssetBalance}
                    className="!font-bold"
                  />
                </Flex.Item>
              </>
            )}
          <AddressTag
            loading={networkAssetBalance === undefined}
            address={settings?.address}
          />
        </Flex>
      </Button>
    </>
  );
};

export const WalletInfoButton = styled(_WalletInfoButton)`
  height: 36px;
  padding: 4px;
  border: none;
  background: transparent;

  &:hover {
    border: none;
    background: transparent;
  }

  &:active,
  &:focus {
    border: none;
    background: transparent;
  }

  &.ant-btn-loading {
    border: none;
  }
`;
