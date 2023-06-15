import { Flex, useDevice } from '@ergolabs/ui-kit';
import { AppBar, Box, Toolbar } from '@mui/material';
import cn from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../../../common/constants/size';
import { useObservable } from '../../../../common/hooks/useObservable';
import { selectedWalletState$ } from '../../../../gateway/api/wallets';
import { WalletState } from '../../../../network/common/Wallet';
import { IsCardano } from '../../../IsCardano/IsCardano';
import { IsErgo } from '../../../IsErgo/IsErgo';
import { AppLogo } from '../../AppLogo/AppLogo';
import TeddyLogo from '../../AppLogo/TeddyLogo';
import LogoText from '../../LogoText/LogoText';
import { CardanoMaintenance } from '../CardanoMaintenance/CardanoMaintenance';
import { OperationsHistory } from '../OperationsHistory/OperationsHistory';
import { Analytics } from './Analytics/Analytics';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { ConnectWallet } from './ConnectWallet/ConnectWallet';
import { GetTestTokensButton } from './GetTestTokensButton/GetTestTokensButton';
import { Navigation } from './Navigation/Navigation';
import { NetworkDropdown } from './NetworkDropdown/NetworkDropdown';
import UserDetails from './UserDetails/UserDetails';
import TimeIcon from './TimeIcon/TimeIcon';
import SettingIcon from './SettingIcon/SettingIcon';
export interface HeaderProps {
  className?: string;
  scrolled?: boolean;
  scrolledTop?: boolean;
}

const HeaderWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  padding: 4px;
  grid-template-columns: 1fr 1fr;

  ${device.m} {
    padding: 1rem;
  }

  @media (max-width: 720px) {
    grid-template-columns: 36px 1fr;
    padding: 1.25rem 1rem 0.25rem;
  }
`;

const pages = ['swap', 'farm', 'liquidity', 'orders'];

export const _Header: React.FC<HeaderProps> = ({
  className,
  scrolled,
  scrolledTop,
}) => {
  const { s } = useDevice();
  const [walletState] = useObservable(selectedWalletState$);

  return (
    <>
      <AppBar
        className="fixed px-10 py-0 shadow-sm bg-slate-900/70 h-[64px]"
        style={{ backgroundImage: 'none', zIndex: 11 }}
      >
        <Toolbar disableGutters>
          <div className="flex gap-x-2 items-center mr-6">
            <TeddyLogo className="flex" />
            <LogoText />
          </div>
          <Box className="flex-grow hidden gap-6 md:flex">
            {pages.map((page) => (
              <NavLink
                to={page}
                key={page}
                className={({ isActive }) =>
                  `my-2 block text-base font-bold capitalize hover:text-white transition ${isActive ? 'text-white' : 'text-zinc-400'
                  }`
                }
              >
                {page}
              </NavLink>
            ))}
            <a
              href="https://docs.cardano.org/cardano-testnet/tools/faucet"
              target="_blank"
              key={'faucet'}
              className="my-2 block text-base font-bold capitalize hover:text-white transition text-zinc-400"
              rel="noreferrer"
            >
              Faucet
            </a>
            <a
              href="https://leaderboard.teddyswap.org"
              target="_blank"
              key={'leaderboard'}
              className="my-2 block text-base font-bold capitalize hover:text-white transition text-zinc-400"
              rel="noreferrer"
            >
              Leaderboard
            </a>
          </Box>
          <Flex align="center" style={{ gap: '8px', marginLeft: 'auto' }}>
            {/* <ConnectWallet /> */}
            {/* <BurgerMenu /> */}
            <UserDetails />
            <TimeIcon />
            <SettingIcon />
          </Flex>
        </Toolbar>
      </AppBar>
    </>
  );
};

export const Header = styled(_Header)`
  position: fixed;
  z-index: 3;
  top: 0;
  width: 100%;
  transition: transform 0.3s;

  &.scrolledFromTop {
    border-bottom: 1px solid var(--spectrum-box-border-color);
    background: var(--spectrum-box-bg-secondary-glass);
    backdrop-filter: var(--spectrum-box-bg-filter);
  }

  ${device.m} {
    background: none !important;
    border-bottom: 0 !important;
    &.scrolled {
      transform: translateY(-100%);
    }
  }
`;
