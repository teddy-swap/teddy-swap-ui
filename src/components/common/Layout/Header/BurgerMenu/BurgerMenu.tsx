import {
  Button,
  Dropdown,
  FileTextOutlined,
  GithubOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  Menu,
  Modal,
  QuestionCircleOutlined,
  ReloadOutlined,
  RightOutlined,
} from '@ergolabs/ui-kit';
import { t, Trans } from '@lingui/macro';
import { Button as MatButton } from '@mui/material';
import { stringify } from 'qs';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { panalytics } from '../../../../../common/analytics';
import {
  LOCALE_LABEL,
  SUPPORTED_LOCALES,
} from '../../../../../common/constants/locales';
import { useApplicationSettings } from '../../../../../context';
import { useSelectedNetwork } from '../../../../../gateway/common/network';
import { useQuery } from '../../../../../hooks/useQuery';
import SettingsIcon from '../../../../SettingsIcon/SettingsIcon';
import { ThemeSwitch } from '../../../../ThemeSwitch/ThemeSwitch';
import { ManualRefundModal } from './ManualRefundModal/ManualRefundModal';

const StyledMenu = styled(Menu)`
  padding: calc(var(--spectrum-base-gutter) * 2);
  min-width: 233px;
`;

const ThemeSwitchContainer = styled.div`
  border-bottom: 1px solid var(--spectrum-box-border-color);
  padding: 0 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const OtherMenuItem = styled(Menu.Item)`
  .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  padding: 0 calc(var(--spectrum-base-gutter) * 2);
  height: 36px;
`;

const ContributeLanguageButton = styled(Button)`
  margin-top: 8px;
  width: 100%;
`;

const BurgerMenu = (): JSX.Element => {
  const [selectedNetwork] = useSelectedNetwork();
  const [isMainMenu, setIsMainMenu] = useState<boolean>(true);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [settings, setSettings] = useApplicationSettings();
  const location = useLocation();
  const qs = useQuery();

  const menu = [
    {
      title: t`About`,
      icon: <InfoCircleOutlined />,
      link: 'https://docs.spectrum.fi/docs/about-spectrumdex/intro',
      onClick: () => panalytics.clickBurgerMenu('About'),
    },
    {
      title: t`How to use`,
      icon: <QuestionCircleOutlined />,
      link: 'https://docs.spectrum.fi/docs/user-guides/quick-start',
      onClick: () => panalytics.clickBurgerMenu('How to use'),
    },
    {
      title: t`Docs`,
      icon: <FileTextOutlined />,
      link: 'https://docs.spectrum.fi',
      onClick: () => panalytics.clickBurgerMenu('Docs'),
    },
    {
      title: 'GitHub',
      icon: <GithubOutlined />,
      link: 'https://github.com/spectrum-finance',
      onClick: () => panalytics.clickBurgerMenu('GitHub'),
    },
    selectedNetwork.name === 'ergo'
      ? {
          title: t`Manual Refund`,
          icon: <ReloadOutlined />,
          onClick: () => {
            setMenuVisible(false);
            panalytics.clickBurgerMenu('Manual Refund');
            Modal.open(({ close }) => <ManualRefundModal close={close} />);
          },
        }
      : undefined,
    {
      title: t`Language`,
      icon: <GlobalOutlined />,
      additional: <RightOutlined style={{ marginLeft: 36 }} />,
      onClick: () => {
        setIsMainMenu(false);
      },
    },
  ];

  const changeLanguage = (locale: string) => {
    setSettings({
      ...settings,
      lang: locale,
    });
  };

  const menuOthers = (
    <StyledMenu>
      {/* <ThemeSwitchContainer>
        <ThemeSwitch />
      </ThemeSwitchContainer> */}
      {menu.map(
        (item, index) =>
          item && (
            <OtherMenuItem key={index + 1} icon={item.icon}>
              <a
                href={item.link}
                rel="noreferrer"
                target={item.link ? '_blank' : ''}
                onClick={item.onClick}
              >
                {item.title}
              </a>
              {item.additional && item.additional}
            </OtherMenuItem>
          ),
      )}
    </StyledMenu>
  );

  const menuLanguages = (
    <StyledMenu>
      <OtherMenuItem key="langs-back" icon={<LeftOutlined />}>
        <a onClick={() => setIsMainMenu(true)} rel="noopener noreferrer" />
      </OtherMenuItem>
      {SUPPORTED_LOCALES.map((locale) => {
        return (
          <OtherMenuItem key={locale}>
            <Link
              replace={true}
              to={{
                ...location,
                search: stringify({ ...qs, lng: locale }),
              }}
              rel="noopener noreferrer"
              onClick={() => {
                changeLanguage(locale);
                panalytics.changeLocale(locale);
              }}
            >
              {LOCALE_LABEL[locale]}
            </Link>
          </OtherMenuItem>
        );
      })}
      <ContributeLanguageButton
        href="https://crowdin.com/project/ergodex-frontend"
        target="_blank"
        type="primary"
        block
      >
        <Trans>Contribute</Trans>
      </ContributeLanguageButton>
    </StyledMenu>
  );

  const onMenuVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
    if (flag) {
      setIsMainMenu(true);
    }
  };

  return (
    <Dropdown
      overlay={isMainMenu ? menuOthers : menuLanguages}
      trigger={['click']}
      visible={isMenuVisible}
      onVisibleChange={onMenuVisibleChange}
    >
      <MatButton
        variant="outlined"
        className="!text-white !px-0 !border !border-gray-300 !border-slate-600 hover:!bg-white/10 !rounded-md !min-w-[42px] !min-h-[42px]"
        classes={{ startIcon: '!m-0' }}
        sx={{ border: '1px solid' }}
        startIcon={<SettingsIcon className="!w-5 h-5" />}
      />
    </Dropdown>
  );
};

export { BurgerMenu };
