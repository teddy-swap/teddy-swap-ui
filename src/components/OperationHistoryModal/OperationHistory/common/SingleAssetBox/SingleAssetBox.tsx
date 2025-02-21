import { FC, ReactNode } from 'react';

import { Currency } from '../../../../../common/models/Currency';
import { AssetTitle } from '../../../../AssetTitle/AssetTitle';
import { SensitiveContent } from '../../../../SensitiveContent/SensitiveContent.tsx';
import { AssetBox } from '../AssetBox/AssetBox';
import styles from './SigleAssetBox.module.less';

export interface SingleAssetBoxProps {
  readonly currency: Currency;
  readonly icon?: ReactNode | ReactNode[] | string;
}

export const SingleAssetBox: FC<SingleAssetBoxProps> = ({ currency, icon }) => (
  <AssetBox
    icon={icon}
    title={<AssetTitle level={5} asset={currency.asset} gap={1} />}
    value={
      <SensitiveContent>
        {currency.toString(Math.max(currency.asset.decimals || 0, 2), 2)}
      </SensitiveContent>
    }
    className={styles.singleAssetBox}
  />
);
