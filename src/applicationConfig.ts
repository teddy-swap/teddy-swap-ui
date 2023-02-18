import { mkSubject } from '@teddyswap/cardano-dex-sdk/build/main/cardano/entities/assetClass';
import { DateTime } from 'luxon';

import { Dictionary } from './common/utils/Dictionary';

interface OperationRestriction {
  readonly asset: string;
  readonly restrictionEnd: DateTime;
  readonly operation: 'swap' | 'liquidity';
}

interface NetworkConfig {
  readonly explorerUrl: string;
  readonly networkUrl: string;
  readonly analyticUrl?: string;
  readonly metadataUrl: string;
  readonly ergopayUrl?: string;
  readonly faucet?: string;
  readonly lowBalanceGuide?: string;
}

interface CardanoUpdate {
  readonly title: string;
  readonly content: string;
}

interface ApplicationConfig {
  readonly cookieDomain: string | undefined;
  readonly cardanoMaintenance: boolean;
  readonly cardanoUpdate?: CardanoUpdate;
  readonly defaultTokenListUrl: string;
  readonly operationTimeoutTime: number;
  readonly reCaptchaKey: string;
  readonly networksSettings: Dictionary<NetworkConfig>;
  readonly social: {
    readonly twitter: string;
    readonly telegram: string;
    readonly discord: string;
    readonly medium: string;
    readonly reddit: string;
  };
  readonly support: {
    readonly discord: string;
    readonly telegram: string;
  };
  readonly applicationTick: number;
  readonly hiddenAssets: string[];
  readonly blacklistedPools: string[];
  readonly blacklistedHistoryAssets: string[];
  readonly operationsRestrictions: OperationRestriction[];
  readonly requestRetryCount: number;
}

export const applicationConfig: ApplicationConfig = {
  operationTimeoutTime: 60_000,
  cookieDomain:
    process.env.NODE_ENV === 'production' ? 'spectrum.fi' : undefined,
  cardanoMaintenance: false,
  defaultTokenListUrl:
    'https://raw.githubusercontent.com/ergolabs/default-token-list/master/src/tokens',
  // cardanoUpdate: {
  //   title: 'Under Maintenance',
  //   content: 'We are migrating the protocol to Vasil Hard Fork testnet.',
  // },
  reCaptchaKey: '',
  requestRetryCount: 3,
  networksSettings: {
    cardano: {
      metadataUrl:
        'https://3337-teddy-token-registry--zls06h.us1.demeter.run/metadata',
      networkUrl:
        'https://8081-parallel-guidance-uagipf.us1.demeter.run/cardano/v1/',
      explorerUrl: 'https://preview.cardanoscan.io',
      faucet: '',
      lowBalanceGuide: '',
    },
    ergo: {
      metadataUrl:
        'https://raw.githubusercontent.com/teddy-swap/token-logos/master',
      networkUrl: '',
      explorerUrl: '',
      analyticUrl: '',
      lowBalanceGuide: '',
      ergopayUrl: '',
    },
  },
  social: {
    twitter: 'https://twitter.com/spectrumlabs_',
    telegram: 'https://t.me/spectrum_labs_community',
    discord: 'https://discord.com/invite/zY2gmTYQVD',
    medium: 'https://spectrumlabs.medium.com',
    reddit: 'https://www.reddit.com/r/SpectrumLabs/',
  },
  support: {
    discord: 'https://discord.com/invite/zY2gmTYQVD',
    telegram: 'https://t.me/spectrum_labs_community',
  },
  applicationTick: 5 * 1000,
  hiddenAssets: [
    'ef802b475c06189fdbf844153cdc1d449a5ba87cce13d11bb47b5a539f27f12b',
    '30974274078845f263b4f21787e33cc99e9ec19a17ad85a5bc6da2cca91c5a2e',
    mkSubject({
      name: 'new_spectrum_token_b',
      policyId: '065270479316f1d92e00f7f9f095ebeaac9d009c878dc35ce36d3404',
    }),
    mkSubject({
      name: 'new_spectrum_token_a',
      policyId: '065270479316f1d92e00f7f9f095ebeaac9d009c878dc35ce36d3404',
    }),
  ],
  blacklistedHistoryAssets: [
    mkSubject({
      name: 'new_spectrum_token_b',
      policyId: '065270479316f1d92e00f7f9f095ebeaac9d009c878dc35ce36d3404',
    }),
    mkSubject({
      name: 'new_spectrum_token_a',
      policyId: '065270479316f1d92e00f7f9f095ebeaac9d009c878dc35ce36d3404',
    }),
  ],
  blacklistedPools: [
    'bee300e9c81e48d7ab5fc29294c7bbb536cf9dcd9c91ee3be9898faec91b11b6',
    '4e497db00769f6402580c351c092ec6ae0306f08575c7a9c719267c84049c840',
    '61a579c46d92f2718576fc9839a2a1983f172e889ec234af8504b5bbf10edd89',
    'e24d17f85ac406827b0436a648f3960d8965e677700949ff28ab0ca9a37dd50e',
    '805fe1efcdea11f1e959eff4f422f118aa76dca2d0d797d184e487da',
    mkSubject({
      policyId: '805fe1efcdea11f1e959eff4f422f118aa76dca2d0d797d184e487da',
      name: '321ergoTestNFT321',
    }),
    mkSubject({
      name: 'MINt_Teddy_Nft',
      policyId: '2a44bc0bc17069c66abbd4aa99903252fb19a7ceeaf1b93b2f5a6bd1',
    }),
    mkSubject({
      name: 'WMTt_Teddy_Nft',
      policyId: '778ec702e97a472d3989421a38a364d6ac15005f73455504a201ba51',
    }),
    mkSubject({
      name: 'LQt_iUSDt_Teddy_Nft',
      policyId: 'ba9a6218dd9ace0eef478e8f337412880be28376384ab58b89d6b9d3',
    }),
  ],
  operationsRestrictions: [
    {
      asset: 'd71693c49a84fbbecd4908c94813b46514b18b67a99952dc1e6e4791556de413',
      restrictionEnd: DateTime.utc(2022, 2, 2, 19, 0, 0),
      operation: 'swap',
    },
  ],
};
