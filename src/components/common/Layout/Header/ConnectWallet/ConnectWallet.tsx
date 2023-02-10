import React, { FC } from 'react';

import { HeaderConnectWalletButton } from './HeaderConnectWalletButton/HeaderConnectWalletButton';
import { WalletInfoButton } from './WalletInfoButton/WalletInfoButton';

export const ConnectWallet: FC = () => {
  return (
    <div className="text-black text-white border border-gray-300 border-slate-600 rounded-md min-h-[2.5rem] flex items-center p-0.5 gap-2 MuiBox-root css-0">
      <HeaderConnectWalletButton
        className="!rounded-md !h-[36px] !normal-case !text-base !w-[208px]"
        size="large"
        analytics={{ location: 'header' }}
      >
        <WalletInfoButton />
      </HeaderConnectWalletButton>
    </div>
  );
};
